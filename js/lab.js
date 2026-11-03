/* Code Through Time — lab.js
 * Runnable coding challenges. JavaScript runs in a sandboxed Web Worker; Python runs in
 * Pyodide (CPython compiled to WebAssembly), downloaded the first time you press Run.
 * Exposes window.Lab = { mount(root, lang, challenges), stop() }.
 */
(() => {
  "use strict";

  const PYODIDE = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/";
  const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const KEY = "ctt.lab.v1";
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
  const save = (s) => { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* ignore */ } };

  // Deep equality that treats 4 and 4.0 the same and ignores key order.
  function same(a, b) {
    if (typeof a === "number" && typeof b === "number") return Math.abs(a - b) < 1e-9;
    if (Array.isArray(a) && Array.isArray(b)) return a.length === b.length && a.every((x, i) => same(x, b[i]));
    if (a && b && typeof a === "object" && typeof b === "object") {
      const ka = Object.keys(a), kb = Object.keys(b);
      return ka.length === kb.length && ka.every((k) => same(a[k], b[k]));
    }
    return a === b;
  }
  const show = (v) => JSON.stringify(v);

  /* ───────── JavaScript runner: a throwaway worker per run ───────── */
  const JS_WORKER = `
    self.onmessage = (e) => {
      const { code, fn, tests } = e.data;
      const logs = [];
      const fmt = (a) => typeof a === "string" ? a : JSON.stringify(a);
      self.console = { log: (...a) => logs.push(a.map(fmt).join(" ")), error: (...a) => logs.push(a.map(fmt).join(" ")) };
      try {
        const f = new Function(code + "\\n;return typeof " + fn + " === 'function' ? " + fn + " : undefined;")();
        if (!f) throw new Error("Couldn't find a function called " + fn);
        const results = tests.map(([args]) => {
          try { return { ok: true, got: JSON.parse(JSON.stringify(f(...JSON.parse(JSON.stringify(args))) ?? null)) }; }
          catch (err) { return { ok: false, error: String(err && err.message || err) }; }
        });
        self.postMessage({ results, logs });
      } catch (err) {
        self.postMessage({ error: String(err && err.message || err), logs });
      }
    };`;
  function runJS(code, fn, tests) {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(new Blob([JS_WORKER], { type: "text/javascript" }));
      const w = new Worker(url);
      const timer = setTimeout(() => { w.terminate(); resolve({ error: "Timed out after 3 seconds — is there an infinite loop?" }); }, 3000);
      w.onmessage = (e) => { clearTimeout(timer); w.terminate(); URL.revokeObjectURL(url); resolve(e.data); };
      w.onerror = (e) => { clearTimeout(timer); w.terminate(); resolve({ error: e.message }); };
      w.postMessage({ code, fn, tests });
    });
  }

  /* ───────── Python runner: one Pyodide worker, reused ───────── */
  const PY_WORKER = `
    importScripts("${PYODIDE}pyodide.js");
    const ready = loadPyodide({ indexURL: "${PYODIDE}" });
    self.postMessage({ status: "loading" });
    ready.then(() => self.postMessage({ status: "ready" }));
    self.onmessage = async (e) => {
      const py = await ready;
      const { id, code, fn, tests } = e.data;
      const logs = [];
      py.setStdout({ batched: (s) => logs.push(s) });
      py.setStderr({ batched: (s) => logs.push(s) });
      try {
        py.runPython(code, { globals: py.globals });
        const results = [];
        for (const [args] of tests) {
          py.globals.set("__ctt_args", JSON.stringify(args));
          try {
            py.runPython("import json as __j\\n__ctt_out = __j.dumps(" + fn + "(*__j.loads(__ctt_args)))");
            results.push({ ok: true, got: JSON.parse(py.globals.get("__ctt_out")) });
          } catch (err) {
            results.push({ ok: false, error: String(err.message).trim().split("\\n").slice(-1)[0] });
          }
        }
        self.postMessage({ id, results, logs });
      } catch (err) {
        self.postMessage({ id, error: String(err.message).trim().split("\\n").slice(-3).join("\\n"), logs });
      }
    };`;
  let pyWorker = null, pyReady = false, runId = 0;
  function getPy(onStatus) {
    if (!pyWorker) {
      const url = URL.createObjectURL(new Blob([PY_WORKER], { type: "text/javascript" }));
      pyWorker = new Worker(url);
      pyWorker.addEventListener("message", (e) => {
        if (e.data.status === "ready") pyReady = true;
        if (e.data.status) onStatus(e.data.status);
      });
    }
    return pyWorker;
  }
  function runPy(code, fn, tests, onStatus) {
    return new Promise((resolve) => {
      const w = getPy(onStatus);
      const id = ++runId;
      const limit = pyReady ? 5000 : 60000;      // first run downloads Python (~10 MB)
      const timer = setTimeout(() => {
        w.terminate(); pyWorker = null; pyReady = false;
        resolve({ error: pyReady ? "Timed out after 5 seconds — is there an infinite loop?" : "Python took too long to load. Check your connection and try again." });
      }, limit);
      const onMsg = (e) => {
        if (e.data.id !== id) return;
        clearTimeout(timer); w.removeEventListener("message", onMsg); resolve(e.data);
      };
      w.addEventListener("message", onMsg);
      w.onerror = (e) => { clearTimeout(timer); resolve({ error: e.message || "Python failed to load." }); };
      w.postMessage({ id, code, fn, tests });
    });
  }

  /* ───────── UI ───────── */
  function mount(root, lang, challenges, highlight) {
    const state = load();
    root.innerHTML = `
      <div class="lab">
        <div class="lab-tabs" role="tablist" aria-label="Challenges">
          ${challenges.map((c, i) => `<button type="button" role="tab" class="lab-tab" data-i="${i}" aria-selected="${i === 0}">
            ${state[c.id]?.passed ? "✓ " : ""}${esc(c.title)}</button>`).join("")}
        </div>
        <div class="lab-body"></div>
      </div>`;
    const body = root.querySelector(".lab-body");

    const open = (i) => {
      const c = challenges[i];
      root.querySelectorAll(".lab-tab").forEach((t, j) => t.setAttribute("aria-selected", String(j === i)));
      const saved = state[c.id]?.code;
      body.innerHTML = `
        <p class="lab-prompt">${esc(c.prompt)}</p>
        <label class="sr" for="lab-${c.id}">Your code</label>
        <textarea id="lab-${c.id}" class="lab-editor" spellcheck="false" autocapitalize="off" autocomplete="off">${esc(saved || c.starter)}</textarea>
        <div class="lab-actions">
          <button type="button" class="btn" data-run>Run tests</button>
          <button type="button" class="btn btn-ghost" data-hint>Hint</button>
          <button type="button" class="btn btn-ghost" data-solution>Show solution</button>
          <button type="button" class="btn btn-ghost" data-reset>Reset</button>
          <span class="lab-status" aria-live="polite"></span>
        </div>
        <div class="lab-out" aria-live="polite"></div>`;
      const ed = body.querySelector(".lab-editor");
      const out = body.querySelector(".lab-out");
      const status = body.querySelector(".lab-status");
      const rows = () => Math.max(8, ed.value.split("\n").length + 1);
      ed.rows = rows();
      ed.addEventListener("input", () => { ed.rows = rows(); state[c.id] = { ...state[c.id], code: ed.value }; save(state); });
      ed.addEventListener("keydown", (e) => {
        if (e.key === "Tab" && !e.shiftKey) {
          e.preventDefault();
          const s = ed.selectionStart;
          ed.setRangeText("    ", s, ed.selectionEnd, "end");
          ed.dispatchEvent(new Event("input"));
        }
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") body.querySelector("[data-run]").click();
      });
      body.querySelector("[data-hint]").addEventListener("click", () => { out.innerHTML = `<p class="lab-hint">💡 ${esc(c.hint)}</p>`; });
      body.querySelector("[data-solution]").addEventListener("click", () => {
        out.innerHTML = `<figure class="code"><figcaption><span class="code-title">One possible solution</span></figcaption><pre><code class="language-${lang === "python" ? "python" : "javascript"}">${esc(c.solution)}</code></pre></figure>`;
        if (highlight) highlight(out);
      });
      body.querySelector("[data-reset]").addEventListener("click", () => { ed.value = c.starter; ed.dispatchEvent(new Event("input")); out.innerHTML = ""; });
      body.querySelector("[data-run]").addEventListener("click", async (e) => {
        const btn = e.currentTarget;
        btn.disabled = true; status.textContent = "Running…"; out.innerHTML = "";
        const res = lang === "python"
          ? await runPy(ed.value, c.fn, c.tests, (s) => { status.textContent = s === "loading" ? "Downloading Python (first run only)…" : "Running…"; })
          : await runJS(ed.value, c.fn, c.tests);
        btn.disabled = false; status.textContent = "";
        const logs = (res.logs || []).length ? `<pre class="lab-logs">${esc(res.logs.join("\n"))}</pre>` : "";
        if (res.error) { out.innerHTML = `<p class="lab-fail">Error: ${esc(res.error)}</p>${logs}`; return; }
        let passed = 0;
        const items = c.tests.map(([args, expected], k) => {
          const r = res.results[k];
          const ok = r.ok && same(r.got, expected);
          if (ok) passed++;
          const call = `${c.fn}(${args.map(show).join(", ")})`;
          return `<li class="${ok ? "pass" : "fail"}"><span>${ok ? "✓" : "✗"}</span><code>${esc(call)}</code>
            ${ok ? "" : `<small>expected <code>${esc(show(expected))}</code>, got <code>${esc(r.ok ? show(r.got) : r.error)}</code></small>`}</li>`;
        }).join("");
        const all = passed === c.tests.length;
        out.innerHTML = `<p class="${all ? "lab-pass" : "lab-fail"}">${all ? "All tests passed!" : `${passed} of ${c.tests.length} tests passed.`}</p><ul class="lab-results">${items}</ul>${logs}`;
        if (all) {
          state[c.id] = { ...state[c.id], passed: true }; save(state);
          root.querySelector(`.lab-tab[data-i="${i}"]`).textContent = "✓ " + c.title;
          if (window.Fun) { window.Fun.award("coder"); window.Fun.confetti(); }
        }
      });
    };
    root.querySelectorAll(".lab-tab").forEach((t) => t.addEventListener("click", () => open(Number(t.dataset.i))));
    open(0);
  }

  window.Lab = { mount, runJS, same };
})();
