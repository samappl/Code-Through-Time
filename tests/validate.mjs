// Validates all site content and checks every coding-challenge solution passes its own tests.
// Run with: node tests/validate.mjs   (no dependencies needed)
import fs from "node:fs";
import vm from "node:vm";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const ctx = { console };
ctx.window = ctx;
vm.createContext(ctx);
const dataDir = path.join(root, "js", "data");
for (const f of fs.readdirSync(dataDir).sort()) {
  vm.runInContext(fs.readFileSync(path.join(dataDir, f), "utf8"), ctx, { filename: f });
}
const CT = ctx.CT;
const errors = [];
const fail = (msg) => errors.push(msg);
const isUrl = (u) => /^https?:\/\/[^\s]+$/.test(u);

// Every page script referenced by index.html must exist.
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
for (const m of html.matchAll(/src="(js\/[^"]+)"/g)) {
  if (!fs.existsSync(path.join(root, m[1]))) fail(`index.html references missing ${m[1]}`);
}
for (const f of fs.readdirSync(dataDir)) {
  if (!html.includes(`js/data/${f}`)) fail(`index.html does not load js/data/${f}`);
}

// Eras
const ids = new Set(Object.keys(CT.langs));
const inEras = CT.eras.flatMap((e) => e.langs);
for (const id of inEras) if (!ids.has(id)) fail(`era lists unknown language "${id}"`);
for (const id of ids) if (!inEras.includes(id)) fail(`language "${id}" is not in any era`);
if (new Set(inEras).size !== inEras.length) fail("a language appears in more than one era");
for (const e of CT.eras) {
  for (const k of ["id", "title", "years", "intro", "short", "shortYears"]) if (!e[k]) fail(`era ${e.id} missing ${k}`);
  (e.sources || []).forEach((s) => { if (!isUrl(s.u)) fail(`era ${e.id} bad source URL ${s.u}`); });
  const years = e.langs.map((id) => CT.langs[id].year);
  if (years.some((y, i) => i && y < years[i - 1])) fail(`era ${e.id} languages are not in year order`);
}

// Quizzes
function checkQuiz(where, quiz) {
  if (!quiz.length) fail(`${where} has no quiz`);
  quiz.forEach((q, i) => {
    const at = `${where} question ${i + 1}`;
    if (!q.q || !q.explain) fail(`${at} missing text or explanation`);
    if (q.type === "mc") {
      if (!(q.options.length >= 2 && q.options.length <= 4)) fail(`${at} needs 2–4 options`);
      if (!(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length)) fail(`${at} answer index out of range`);
      if (new Set(q.options).size !== q.options.length) fail(`${at} has duplicate options`);
    } else if (q.type === "fill") {
      if (!q.code || !q.code.includes("____")) fail(`${at} fill-in code has no ____ blank`);
      if (!q.answers || !q.answers.length) fail(`${at} has no accepted answers`);
    } else fail(`${at} has unknown type ${q.type}`);
  });
}

// Languages
for (const [id, L] of Object.entries(CT.langs)) {
  for (const k of ["name", "year", "era", "creator", "org", "paradigm", "typing", "prism", "tagline"]) if (!L[k]) fail(`${id} missing ${k}`);
  if (L.id !== id) fail(`${id} has mismatched id ${L.id}`);
  if (!CT.eras.find((e) => e.id === L.era)) fail(`${id} has unknown era ${L.era}`);
  if (!L.story?.length || !L.know?.length || !L.examples?.length) fail(`${id} missing story, know or examples`);
  if (!L.sources?.length) fail(`${id} has no sources`);
  L.sources.forEach((s) => { if (!isUrl(s.u) || !s.t) fail(`${id} bad source ${JSON.stringify(s)}`); });
  if ((L.facts || []).length < 3) fail(`${id} needs at least 3 fun facts`);
  (L.facts || []).forEach((f, i) => { if (!f.text || !f.src || !isUrl(f.src.u)) fail(`${id} fact ${i + 1} has no valid source`); });
  if (!L.today?.status) fail(`${id} missing “today” status`);
  checkQuiz(id, L.quiz);
}
checkQuiz("AI", CT.ai.quiz);
CT.ai.sources.forEach((s) => { if (!isUrl(s.u)) fail(`AI bad source ${s.u}`); });

// Answer positions should not all cluster (the app also shuffles at runtime).
const pos = [0, 0, 0, 0];
[...Object.values(CT.langs).flatMap((l) => l.quiz), ...CT.ai.quiz].forEach((q) => { if (q.type === "mc") pos[q.answer]++; });

// People and glossary
CT.people.forEach((p) => {
  if (!CT.eras.find((e) => e.id === p.era)) fail(`person ${p.id} has unknown era`);
  p.langs.forEach((l) => { if (!ids.has(l)) fail(`person ${p.id} links unknown language ${l}`); });
  if (!isUrl(p.src.u)) fail(`person ${p.id} bad source`);
});
CT.glossary.forEach((g) => { if (g.see && !ids.has(g.see)) fail(`glossary ${g.term} links unknown language ${g.see}`); });

// Coding challenges: JavaScript solutions must pass their own tests.
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b) || (typeof a === "number" && typeof b === "number" && Math.abs(a - b) < 1e-9);
for (const ch of CT.challenges.javascript || []) {
  const f = new Function(ch.solution + `;return ${ch.fn};`)();
  ch.tests.forEach(([args, expected]) => {
    const got = f(...args);
    if (!same(got, expected)) fail(`challenge ${ch.id}: ${ch.fn}(${JSON.stringify(args)}) gave ${JSON.stringify(got)}`);
  });
  if (!ch.starter.includes(ch.fn)) fail(`challenge ${ch.id} starter doesn't define ${ch.fn}`);
}
for (const ch of CT.challenges.python || []) {
  if (!ch.solution.includes(`def ${ch.fn}(`)) fail(`challenge ${ch.id} solution doesn't define ${ch.fn}`);
}
// Python solutions are run too, if python3 is installed.
const py = spawnSync("python3", ["-c", `
import json, sys
bad = []
for ch in json.load(sys.stdin):
    g = {}
    exec(ch["solution"], g)
    for args, expected in ch["tests"]:
        got = g[ch["fn"]](*args)
        if json.loads(json.dumps(got)) != expected and not (isinstance(got, (int, float)) and abs(got - expected) < 1e-9):
            bad.append(f'{ch["id"]}: {ch["fn"]}{tuple(args)} gave {got!r}')
print("\\n".join(bad))
`], { input: JSON.stringify(CT.challenges.python || []), encoding: "utf8" });
if (py.error) console.log("python3 not found — skipped running Python challenge solutions");
else {
  if (py.status !== 0) fail(`Python challenge check crashed: ${py.stderr}`);
  py.stdout.trim().split("\n").filter(Boolean).forEach((l) => fail(`Python challenge ${l}`));
}

const nq = Object.values(CT.langs).reduce((n, l) => n + l.quiz.length, 0) + CT.ai.quiz.length;
console.log(`${ids.size} languages · ${CT.eras.length} eras · ${nq} questions · ${CT.people.length} people · ${CT.glossary.length} glossary terms`);
console.log(`stored answer positions A/B/C/D: ${pos.join(" / ")} (shuffled when shown)`);
if (errors.length) {
  console.error(`\n${errors.length} problem(s):\n- ` + errors.join("\n- "));
  process.exit(1);
}
console.log("All content checks passed.");
