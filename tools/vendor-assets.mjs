#!/usr/bin/env node
// Self-host the fonts and syntax highlighting so the site works offline and loads faster.
//
//   node tools/vendor-assets.mjs           download into vendor/ and switch index.html to local files
//   node tools/vendor-assets.mjs --revert  switch index.html back to the CDNs
//
// Needs Node 18+ (built-in fetch). Pyodide (in-browser Python, ~10 MB) intentionally stays on its CDN.
import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const PRISM = "https://cdn.jsdelivr.net/npm/prismjs@1.29.0";
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";
const fetchImpl = globalThis.__mockFetch || fetch;

async function get(url, as = "text") {
  const res = await fetchImpl(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return as === "buffer" ? Buffer.from(await res.arrayBuffer()) : res.text();
}
async function write(rel, data) {
  const file = path.join(ROOT, rel);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, data);
}

function swapBlock(html, name, replacement) {
  const re = new RegExp(`(<!-- vendor:${name}:start[^>]*-->)[\\s\\S]*?(\\s*<!-- vendor:${name}:end -->)`);
  if (!re.test(html)) throw new Error(`index.html is missing the vendor:${name} markers`);
  return html.replace(re, `$1\n${replacement}$2`);
}

const CDN_FONTS = (href) => `  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="${href}" rel="stylesheet">`;
const CDN_PRISM = `  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>`;

async function main() {
  const indexPath = path.join(ROOT, "index.html");
  let html = await fs.readFile(indexPath, "utf8");
  const fontHref = (html.match(/href="(https:\/\/fonts\.googleapis\.com\/css2[^"]+)"/) || [])[1];

  if (process.argv.includes("--revert")) {
    const saved = await fs.readFile(path.join(ROOT, "vendor", "fonts", "SOURCE_URL.txt"), "utf8").catch(() => fontHref);
    if (!saved) throw new Error("Can't find the original Google Fonts URL to restore.");
    html = swapBlock(html, "fonts", CDN_FONTS(saved.trim()));
    html = swapBlock(html, "prism", CDN_PRISM);
    await fs.writeFile(indexPath, html);
    console.log("index.html now uses the CDNs again.");
    return;
  }
  if (!fontHref) throw new Error("No Google Fonts link found in index.html (already vendored?). Use --revert first.");

  // 1. Fonts: fetch the CSS as a modern browser (gets woff2), download every file, rewrite URLs.
  console.log("Downloading fonts…");
  let css = await get(fontHref);
  const urls = [...new Set([...css.matchAll(/url\((https:[^)]+)\)/g)].map((m) => m[1]))];
  let n = 0;
  for (const u of urls) {
    const name = `font-${String(++n).padStart(3, "0")}${path.extname(new URL(u).pathname) || ".woff2"}`;
    await write(`vendor/fonts/${name}`, await get(u, "buffer"));
    css = css.split(u).join(name);
  }
  await write("vendor/fonts/fonts.css", css);
  await write("vendor/fonts/SOURCE_URL.txt", fontHref);
  console.log(`  ${urls.length} font files`);

  // 2. Prism: core, autoloader, and every language component the site uses (plus dependencies).
  console.log("Downloading Prism…");
  const ctx = {}; ctx.window = ctx; vm.createContext(ctx);
  for (const f of (await fs.readdir(path.join(ROOT, "js", "data"))).sort()) {
    vm.runInContext(await fs.readFile(path.join(ROOT, "js", "data", f), "utf8"), ctx);
  }
  const wanted = new Set(["markup", "css", "clike", "javascript", "python", "bash"]);
  Object.values(ctx.CT.langs).forEach((L) => { wanted.add(L.prism); (L.examples || []).forEach((e) => e.prism && wanted.add(e.prism)); });
  (ctx.CT.ai.examples || []).forEach((e) => wanted.add(e.prism));
  wanted.delete("none");

  const components = JSON.parse(await get(`${PRISM}/components.json`)).languages;
  const alias = {};
  for (const [id, def] of Object.entries(components)) {
    if (id === "meta") continue;
    [].concat(def.alias || []).forEach((a) => { alias[a] = id; });
  }
  const need = new Set();
  const add = (id) => {
    id = alias[id] || id;
    if (need.has(id) || !components[id]) return;
    need.add(id);
    const d = components[id];
    [].concat(d.require || [], d.optional || [], d.modify || []).forEach(add);
  };
  [...wanted].forEach(add);
  await write("vendor/prism/prism-core.min.js", await get(`${PRISM}/components/prism-core.min.js`));
  await write("vendor/prism/plugins/autoloader/prism-autoloader.min.js", await get(`${PRISM}/plugins/autoloader/prism-autoloader.min.js`));
  for (const id of need) await write(`vendor/prism/components/prism-${id}.min.js`, await get(`${PRISM}/components/prism-${id}.min.js`));
  console.log(`  ${need.size} language components`);

  // 3. Point index.html at the local copies.
  html = swapBlock(html, "fonts", `  <link rel="stylesheet" href="vendor/fonts/fonts.css">`);
  html = swapBlock(html, "prism", `  <script src="vendor/prism/prism-core.min.js"></script>
  <script src="vendor/prism/plugins/autoloader/prism-autoloader.min.js"></script>`);
  await fs.writeFile(indexPath, html);
  console.log("Done — index.html now loads fonts and Prism from vendor/. Commit the vendor/ folder.");
}

main().catch((err) => { console.error("vendor-assets failed:", err.message); process.exit(1); });
