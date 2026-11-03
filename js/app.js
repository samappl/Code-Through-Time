/* Code Through Time — app.js
 * A tiny hash-routed single-page app. All content comes from window.CT (js/data/*.js).
 * Routes:  #/  ·  #/era/<id>  ·  #/lang/<id>  ·  #/languages  ·  #/ai  ·  #/people  ·  #/glossary
 *          #/arcade  ·  #/sources  ·  #/progress   (search opens with / or Ctrl+K)
 * Fun extras (badges, toasts, reactions) live in fun.js; the mini-games live in arcade.js.
 */
(() => {
  "use strict";

  const CT = window.CT;
  const app = document.getElementById("app");
  const PASS = 0.7;                 // 70% to pass a test
  const STORE_KEY = "ctt.progress.v1";

  /* ───────── helpers ───────── */
  const esc = (s) => String(s ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

  // Inline `code` in plain text → <code>
  const rich = (s) => esc(s).replace(/`([^`]+)`/g, "<code>$1</code>");

  const h = (strings, ...vals) =>
    strings.reduce((out, str, i) => out + str + (i < vals.length ? (Array.isArray(vals[i]) ? vals[i].join("") : (vals[i] ?? "")) : ""), "");

  const shuffle = (a) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };

  function factList(facts) {
    return h`<ol class="fun-facts">${facts.map((f) => h`<li>${rich(f.text || f)}
      ${f.src ? h`<a class="fact-src" href="${esc(f.src.u)}" target="_blank" rel="noopener noreferrer">Source: ${esc(f.src.t)}</a>` : ""}</li>`)}</ol>`;
  }

  const eraById = Object.fromEntries(CT.eras.map((e) => [e.id, e]));
  const order = CT.eras.flatMap((e) => e.langs);           // chronological reading order
  const totalTests = order.length + 1;                     // + the AI test

  /* ───────── progress (localStorage, safely) ───────── */
  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { return {}; }
  }
  function saveProgress(p) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(p)); } catch { /* private mode etc. */ }
  }
  let progress = loadProgress();

  function recordScore(id, score, total) {
    const pct = total ? score / total : 0;
    const prev = progress[id] || { best: 0, passed: false, attempts: 0 };
    progress[id] = {
      best: Math.max(prev.best, pct),
      passed: prev.passed || pct >= PASS,
      attempts: prev.attempts + 1,
      last: Date.now(),
    };
    saveProgress(progress);
    updatePill();
    renderEraTabs(tabState.era, tabState.lang);   // show the ✓ in the language tabs
  }
  const passedCount = () => Object.values(progress).filter((p) => p.passed).length;
  function updatePill() {
    const pill = document.getElementById("progressPill");
    if (pill) pill.textContent = `${passedCount()}/${totalTests}`;
  }
  const statusOf = (id) => {
    const p = progress[id];
    if (!p) return { cls: "todo", label: "Not started" };
    if (p.passed) return { cls: "passed", label: `Passed · best ${Math.round(p.best * 100)}%` };
    return { cls: "tried", label: `Best ${Math.round(p.best * 100)}% · try again` };
  };

  /* ───────── shared components ───────── */
  function codeBlock(code, prism, title) {
    const lang = prism || "none";
    return h`
      <figure class="code">
        <figcaption>
          <span class="code-title">${esc(title || "")}</span>
          <button class="copy" type="button" data-copy>Copy</button>
        </figcaption>
        <pre><code class="language-${esc(lang)}">${esc(code)}</code></pre>
      </figure>`;
  }

  function sourcesList(sources) {
    return h`<ul class="sources">${sources.map((s) => h`
      <li><a href="${esc(s.u)}" target="_blank" rel="noopener noreferrer">${esc(s.t)}</a>
        <span class="src-host">${esc(new URL(s.u).hostname.replace(/^www\./, ""))}</span></li>`)}</ul>`;
  }

  // The page's look follows the era: <body data-theme> styles the top bar and background.
  // Only the top bar, footer and page background follow it; every section carries its own data-theme,
  // so themes never leak into each other.
  function setTheme(id) {
    id = id || "ai";
    const bar = document.querySelector(".topbar");
    bar.dataset.theme = id;
    document.querySelector(".footer").dataset.theme = id;
    document.body.dataset.page = id;
    document.body.style.backgroundColor = getComputedStyle(bar).getPropertyValue("--bg").trim();
  }

  // Window title bars, used by the themes that draw window chrome (DOS, Windows 95, Aero).
  function winTitle(theme, title) {
    if (theme === "pc") {
      const dos = title.replace(/\s*\(.*\)/, "").toUpperCase().replace(/\+/g, "P").replace(/#/g, "SHARP").replace(/[^A-Z0-9]+/g, "_").slice(0, 8);
      return `C:\\HISTORY\\${dos}.TXT`;
    }
    if (theme === "web") return `Netscape Navigator - [${title}]`;
    if (theme === "platform") return `${title} — Code Through Time 2.0 Beta`;
    return title;
  }

  /* ───────── era tabs (pinned at the top of every page) ───────── */
  let tabState = { era: null, lang: null };
  function renderEraTabs(era = null, lang = null) {
    tabState = { era, lang };
    const box = document.getElementById("eraTabs");
    if (!box) return;
    const e = era && eraById[era];
    const sub = !e ? "" : e.id === "ai"
      ? [["#/era/ai", "Overview", "era"], ["#/ai", "AI chapter", "ai"], ["#/ai#ai-train", "Training", "train"], ["#/ai#ai-lab", "Try it", "lab"]]
          .map(([href, label, key]) => h`<a class="et-lang" href="${href}" ${lang === key ? 'aria-current="page"' : ""}>${label}</a>`).join("") +
        e.langs.map((id) => h`<a class="et-lang" href="#/lang/${id}" ${lang === id ? 'aria-current="page"' : ""}>${esc(CT.langs[id].name)} <small>${CT.langs[id].year}</small></a>`).join("")
      : h`<a class="et-lang et-overview" href="#/era/${e.id}" ${!lang ? 'aria-current="page"' : ""}>Overview</a>` +
        e.langs.map((id) => {
          const L = CT.langs[id];
          const done = progress[id]?.passed ? '<span class="et-done" aria-label="passed">✓</span>' : "";
          return h`<a class="et-lang" href="#/lang/${id}" ${lang === id ? 'aria-current="page"' : ""}>${esc(L.name)} <small>${L.year}</small>${done}</a>`;
        }).join("");
    box.innerHTML = h`
      <div class="et-row" role="tablist" aria-label="Eras">
        ${CT.eras.map((x) => h`<a class="et" role="tab" data-theme="${x.id}" href="#/era/${x.id}" aria-selected="${x.id === era}">
          <span class="et-n">${x.n}</span><span class="et-name">${esc(x.short)}</span><span class="et-years">${esc(x.shortYears)}</span></a>`)}
      </div>
      ${e ? h`<div class="et-sub" aria-label="${esc(e.title)}">${sub}</div>` : ""}`;
    const active = box.querySelector('.et[aria-selected="true"]');
    const row = box.querySelector(".et-row");
    if (active) row.scrollLeft = active.offsetLeft - row.clientWidth / 2 + active.clientWidth / 2;
    const cur = box.querySelector('.et-sub [aria-current="page"]');
    const subRow = box.querySelector(".et-sub");
    if (cur && subRow) subRow.scrollLeft = cur.offsetLeft - subRow.clientWidth / 2 + cur.clientWidth / 2;
  }

  // On the home page the theme changes as each era scrolls under the top bar.
  let themeObserver = null;
  function watchThemes() {
    if (themeObserver) themeObserver.disconnect();
    if (!("IntersectionObserver" in window)) return;
    themeObserver = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        setTheme(en.target.dataset.theme);
        const era = en.target.classList.contains("era") ? en.target.dataset.theme : null;
        if (era !== tabState.era) renderEraTabs(era);
      });
    }, { rootMargin: "-160px 0px -70% 0px" });
    app.querySelectorAll("[data-scroll-theme]").forEach((el) => themeObserver.observe(el));
  }

  function highlight(root) {
    if (window.Prism && Prism.highlightAllUnder) {
      try { Prism.highlightAllUnder(root); } catch { /* ignore */ }
    }
  }

  // Copy buttons (event delegation)
  document.addEventListener("click", async (e) => {
    const btn = e.target.closest("[data-copy]");
    if (!btn) return;
    const code = btn.closest(".code").querySelector("code").innerText;
    try {
      await navigator.clipboard.writeText(code);
      btn.textContent = "Copied";
    } catch {
      btn.textContent = "Select & copy";
    }
    setTimeout(() => (btn.textContent = "Copy"), 1600);
  });

  /* ───────── hero: hello, world through time ───────── */
  const HELLOS = [
    ["1957", "dawn", "Fortran", "fortran", "print *, 'Hello, world'"],
    ["1958", "dawn", "Lisp", "lisp", '(print "Hello, world")'],
    ["1959", "dawn", "COBOL", "cobol", "DISPLAY 'HELLO, WORLD'."],
    ["1964", "mainframe", "BASIC", "basic", '10 PRINT "HELLO, WORLD"'],
    ["1970", "mainframe", "Pascal", "pascal", "WriteLn('Hello, world');"],
    ["1972", "mainframe", "C", "c", 'printf("Hello, world\\n");'],
    ["1985", "pc", "C++", "cpp", 'std::cout << "Hello, world\\n";'],
    ["1987", "pc", "Perl", "perl", 'print "Hello, world\\n";'],
    ["1991", "web", "Python", "python", 'print("Hello, world")'],
    ["1993", "web", "Lua", "lua", 'print("Hello, world")'],
    ["1995", "web", "Java", "java", 'System.out.println("Hello, world");'],
    ["1995", "web", "JavaScript", "javascript", 'console.log("Hello, world");'],
    ["1995", "web", "PHP", "php", "<?php echo 'Hello, world'; ?>"],
    ["2000", "platform", "C#", "csharp", 'Console.WriteLine("Hello, world");'],
    ["2009", "platform", "Go", "go", 'fmt.Println("Hello, world")'],
    ["2011", "mobile", "Kotlin", "kotlin", 'println("Hello, world")'],
    ["2014", "mobile", "Swift", "swift", 'print("Hello, world")'],
    ["2015", "mobile", "Rust", "rust", 'println!("Hello, world");'],
    ["2022", "ai", "Prompt", "none", "Write a hello world program in any language."],
  ];

  let heroTimer = null;
  let typeTimer = null;
  function typeTitle() {
    clearInterval(typeTimer);
    const el = document.getElementById("heroTitle");
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const full = el.textContent;
    let n = 0;
    el.textContent = "";
    typeTimer = setInterval(() => {
      el.textContent = full.slice(0, ++n);
      if (n >= full.length) clearInterval(typeTimer);
    }, 55);
  }
  function startHero() {
    clearInterval(heroTimer);
    const el = document.getElementById("heroCode");
    if (!el) return;
    const yearEl = document.getElementById("heroYear");
    const langEl = document.getElementById("heroLang");
    const bar = document.getElementById("heroBar");
    const term = document.getElementById("heroTerm");
    const eraEl = document.getElementById("heroEra");
    let i = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const show = () => {
      const [year, theme, name, prism, code] = HELLOS[i];
      term.dataset.theme = theme;
      eraEl.textContent = eraById[theme].years;
      yearEl.textContent = year;
      langEl.textContent = name;
      el.className = `language-${prism}`;
      el.textContent = code;
      highlight(el.parentElement);
      bar.style.setProperty("--p", ((i + 1) / HELLOS.length).toFixed(3));
      i = (i + 1) % HELLOS.length;
    };
    show();
    if (!reduce) heroTimer = setInterval(show, 1900);
  }

  /* ───────── views ───────── */
  function viewHome() {
    setTheme("dawn");
    renderEraTabs(null);
    const langsCount = order.length;
    app.innerHTML = h`
      <div class="hero-wrap" data-theme="dawn" data-scroll-theme>
      <section class="hero">
        <div class="hero-text">
          <h1 aria-label="From punch cards to prompts."><span class="typed" id="heroTitle" aria-hidden="true">From punch cards to prompts.</span></h1>
          <p class="lede">A walk through the history of programming — the languages, the companies that bet on them, and the breakthroughs in between. The site itself upgrades as you go: it starts on typewriter paper and ends in the AI era. Every language comes with real syntax, what you actually need to know, a test, and sources to dig deeper.</p>
          <p class="hero-actions">
            <a class="btn" href="#/era/dawn">Start in 1843</a>
            <a class="btn btn-ghost" href="#/languages">Jump to a language</a>
          </p>
          <p class="hero-meta">${langsCount} languages · ${CT.eras.length} eras · ${countQuestions()} test questions</p>
        </div>
        <div class="hero-term" id="heroTerm" data-theme="dawn" aria-label="Hello, world in languages through time">
          <div class="term-head">
            <span class="term-year" id="heroYear"></span>
            <span class="term-lang" id="heroLang"></span>
            <span class="term-era" id="heroEra"></span>
          </div>
          <pre class="term-body"><code id="heroCode"></code></pre>
          <div class="term-bar" id="heroBar"></div>
        </div>
      </section>

      <nav class="rail" aria-label="Eras">
        ${CT.eras.map((e) => h`
          <a class="rail-item" href="#/era/${e.id}" data-theme="${e.id}">
            <span class="rail-n">${e.n}</span>
            <span class="rail-years">${esc(e.years)}</span>
            <span class="rail-title">${esc(e.title)}</span>
          </a>`)}
      </nav>
      <div class="dyk-wrap">${factBox(Fun.allFacts(CT))}</div>
      </div>

      ${CT.eras.map(eraSection)}
    `;
    highlight(app);
    startHero();
    typeTitle();
    watchThemes();
    window.scrollTo(0, 0);
  }

  // One era on its own page — what the era tabs open.
  function viewEra(id) {
    const e = eraById[id];
    if (!e) return viewNotFound();
    setTheme(e.id);
    renderEraTabs(e.id);
    const i = CT.eras.indexOf(e);
    const prev = CT.eras[i - 1], next = CT.eras[i + 1];
    app.innerHTML = h`
      ${eraSection(e)}
      <div class="era-pager-wrap" data-theme="${e.id}">
        <nav class="pager era-pager" aria-label="Next and previous era">
          ${prev ? h`<a href="#/era/${prev.id}" class="pager-prev"><small>Previous era · ${esc(prev.years)}</small>${esc(prev.title)}</a>` : h`<a href="#/" class="pager-prev"><small>Back to</small>The full timeline</a>`}
          ${next ? h`<a href="#/era/${next.id}" class="pager-next"><small>Next era · ${esc(next.years)}</small>${esc(next.title)}</a>` : h`<a href="#/ai" class="pager-next"><small>Next</small>The AI chapter</a>`}
        </nav>
      </div>`;
    window.scrollTo(0, 0);
  }

  function countQuestions() {
    return Object.values(CT.langs).reduce((n, l) => n + l.quiz.length, 0) + CT.ai.quiz.length;
  }

  function eraSection(e) {
    const games = e.tracks.filter((t) => t.k === "games");
    const phones = e.tracks.filter((t) => t.k === "phones");
    return h`
      <section class="era" id="era-${e.id}" data-theme="${e.id}" data-scroll-theme>
        <div class="era-inner">
        <header class="era-head">
          <span class="era-n" aria-hidden="true">${e.n}</span>
          <div>
            <p class="era-years">${esc(e.years)}</p>
            <h2>${esc(e.title)}</h2>
            <p class="era-mood">${esc(e.mood)}</p>
          </div>
        </header>
        <div class="era-body win" data-title="${esc(winTitle(e.id, e.title))}">
          <p class="era-intro">${esc(e.intro)}</p>

          ${e.machine ? h`
          <div class="era-extras">
            <figure class="machine">
              <figcaption><span>The machine</span><strong>${esc(e.machine.name)}</strong><small>${esc(e.machine.year)}</small></figcaption>
              <dl>${e.machine.specs.map(([k, v]) => h`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`)}</dl>
              <p class="machine-compare">${esc(e.machine.compare)}</p>
            </figure>
            <div class="day">
              <h3>A day in the life of a programmer</h3>
              <p>${esc(e.day)}</p>
            </div>
          </div>` : ""}

          <h3>Breakthroughs</h3>
          <ol class="timeline">
            ${e.breakthroughs.map((b) => h`
              <li><span class="t-year">${esc(b.y)}</span>
                <div><strong>${esc(b.t)}</strong><p>${esc(b.d)}</p></div></li>`)}
          </ol>

          ${(games.length || phones.length) ? h`
            <div class="tracks">
              ${games.length ? h`<div class="track"><h3><span class="track-icon" aria-hidden="true">▶</span> Games</h3>
                <ul>${games.map((t) => h`<li><span class="t-year">${esc(t.y)}</span><div><strong>${esc(t.t)}</strong><p>${esc(t.d)}</p></div></li>`)}</ul></div>` : ""}
              ${phones.length ? h`<div class="track"><h3><span class="track-icon" aria-hidden="true">▯</span> Phones</h3>
                <ul>${phones.map((t) => h`<li><span class="t-year">${esc(t.y)}</span><div><strong>${esc(t.t)}</strong><p>${esc(t.d)}</p></div></li>`)}</ul></div>` : ""}
            </div>` : ""}

          ${e.langs.length ? h`
            <h3>Languages of this era</h3>
            <ul class="lang-rows">${e.langs.map((id) => langRow(CT.langs[id]))}</ul>` : ""}
          ${e.id === "ai" ? h`
            <a class="ai-cta" href="#/ai">
              <span>Enter the AI chapter</span>
              <small>How AI works, how to code with it safely, and a final test.</small>
              ${statusBadge("ai")}
            </a>` : ""}
          ${e.sources ? h`<details class="era-sources"><summary>Sources for this era (${e.sources.length})</summary>${sourcesList(e.sources)}</details>` : ""}
          ${e.id === "web" ? h`<p class="under-construction"><span>This page is under construction — best viewed in Netscape Navigator at 800×600</span></p>` : ""}
        </div>
        </div>
      </section>`;
  }

  const TODAY_CLASS = { Thriving: "t-thriving", Growing: "t-thriving", Steady: "t-steady", Niche: "t-niche", Legacy: "t-legacy", Retired: "t-retired" };
  function todayChip(L) {
    if (!L.today) return "";
    return h`<span class="today ${TODAY_CLASS[L.today.status] || ""}">Today: ${esc(L.today.status)}</span>`;
  }

  function factBox(facts) {
    const all = facts;
    if (!all.length) return "";
    const f = all[(Math.random() * all.length) | 0];
    return h`
      <aside class="dyk" aria-live="polite">
        <p class="dyk-label">Did you know?</p>
        <p class="dyk-text">${esc(f.text)}</p>
        <p class="dyk-actions"><a href="${f.id === "ai" ? "#/ai" : `#/lang/${f.id}`}">More about ${esc(f.name)}</a>
          <button type="button" class="btn btn-ghost" data-dyk>Another fact</button></p>
      </aside>`;
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-dyk]");
    if (!b) return;
    const box = b.closest(".dyk");
    const all = Fun.allFacts(CT);
    const f = all[(Math.random() * all.length) | 0];
    box.querySelector(".dyk-text").textContent = f.text;
    const a = box.querySelector(".dyk-actions a");
    a.href = f.id === "ai" ? "#/ai" : `#/lang/${f.id}`;
    a.textContent = `More about ${f.name}`;
  });

  function statusBadge(id) {
    const s = statusOf(id);
    return h`<span class="status ${s.cls}">${esc(s.label)}</span>`;
  }

  function langRow(L) {
    const depth = { classic: "History", core: "Core", modern: "In depth" }[L.level];
    return h`
      <li><a class="lang-row" href="#/lang/${L.id}">
        <span class="lr-year">${L.year}</span>
        <span class="lr-name">${esc(L.name)}</span>
        <span class="lr-tag">${esc(L.tagline)}</span>
        <span class="lr-meta"><span class="depth depth-${L.level}">${depth} · ${L.quiz.length} questions</span>${todayChip(L)}${statusBadge(L.id)}</span>
      </a></li>`;
  }

  function viewLang(id) {
    const L = CT.langs[id];
    if (!L) return viewNotFound();
    const era = eraById[L.era];
    setTheme(era.id);
    renderEraTabs(era.id, id);
    const idx = order.indexOf(id);
    const prev = order[idx - 1] ? CT.langs[order[idx - 1]] : null;
    const next = order[idx + 1] ? CT.langs[order[idx + 1]] : null;

    app.innerHTML = h`
      <div class="lang-wrap" data-theme="${era.id}">
      <article class="lang win" data-title="${esc(winTitle(era.id, `${L.name} (${L.year})`))}">
        <nav class="crumbs" aria-label="Breadcrumb">
          <a href="#/era/${era.id}">${era.n} · ${esc(era.title)} · ${esc(era.years)}</a>
        </nav>
        <header class="lang-head">
          <p class="lang-year">${L.year}</p>
          <h1>${esc(L.name)}</h1>
          <p class="lede">${esc(L.tagline)}</p>
          ${L.today ? h`<p class="today-line">${todayChip(L)} <span>${esc(L.today.text)}</span></p>` : ""}
          ${L.learnIf ? h`<p class="learn-if"><strong>Learn it if</strong> ${esc(L.learnIf)}</p>` : ""}
          <dl class="facts">
            <div><dt>Created by</dt><dd>${esc(L.creator)}</dd></div>
            <div><dt>Where</dt><dd>${esc(L.org)}</dd></div>
            <div><dt>Style</dt><dd>${esc(L.paradigm)}</dd></div>
            <div><dt>Typing</dt><dd>${esc(L.typing)}</dd></div>
          </dl>
          <p class="jump">
            <a href="#story" data-jump>Story</a>
            <a href="#used" data-jump>Who used it</a>
            <a href="#know" data-jump>Need to know</a>
            <a href="#fun" data-jump>Fun facts</a>
            ${L.ecosystem ? h`<a href="#toolkit" data-jump>Toolkit</a><a href="#roadmap" data-jump>Roadmap</a>` : ""}
            <a href="#syntax" data-jump>Syntax</a>
            ${CT.challenges && CT.challenges[L.id] ? h`<a href="#lab" data-jump>Code challenges</a>` : ""}
            <a href="#test" data-jump>Test</a>
            <a href="#sources" data-jump>Sources</a>
          </p>
        </header>

        <section id="story" class="block prose">
          <h2>The story</h2>
          ${L.story.map((p) => h`<p>${esc(p)}</p>`)}
        </section>

        <section id="used" class="block">
          <h2>Who used it, and how</h2>
          <ul class="used">
            ${L.usedBy.map((u) => h`<li><strong>${esc(u.who)}</strong><span>${esc(u.what)}</span></li>`)}
          </ul>
        </section>

        <section id="know" class="block">
          <h2>What you need to know</h2>
          <ul class="know">${L.know.map((k) => h`<li>${rich(k)}</li>`)}</ul>
        </section>

        ${L.facts ? h`
        <section id="fun" class="block">
          <h2>Fun facts</h2>
          ${factList(L.facts)}
        </section>` : ""}

        ${L.ecosystem ? h`
        <section id="toolkit" class="block">
          <h2>The modern toolkit</h2>
          <p class="muted">The tools, frameworks and libraries you’ll meet in real ${esc(L.name)} jobs and projects today.</p>
          <ul class="toolkit">${L.ecosystem.map((t) => h`<li><strong>${esc(t.name)}</strong><span>${esc(t.what)}</span></li>`)}</ul>

          <h3>Common pitfalls</h3>
          <ul class="pitfalls">${L.pitfalls.map((p) => h`<li>${rich(p)}</li>`)}</ul>
        </section>

        <section id="roadmap" class="block">
          <h2>Learning roadmap</h2>
          <ol class="roadmap">${L.roadmap.map((r) => h`<li>${esc(r)}</li>`)}</ol>
          <h3>Project ideas to build</h3>
          <ul class="projects">${L.projects.map((p) => h`<li>${esc(p)}</li>`)}</ul>
        </section>` : ""}

        <section id="syntax" class="block">
          <h2>Syntax by example</h2>
          ${L.examples.map((ex) => h`
            <div class="example">
              ${codeBlock(ex.code, ex.prism || L.prism, ex.title)}
              ${ex.note ? h`<p class="note">${esc(ex.note)}</p>` : ""}
            </div>`)}
          ${L.cheats ? h`
            <h3>Cheat sheet</h3>
            <table class="cheats">
              <tbody>${L.cheats.map(([label, code]) => h`
                <tr><th scope="row">${esc(label)}</th><td><code class="language-${esc(L.prism)}">${esc(code)}</code></td></tr>`)}
              </tbody>
            </table>` : ""}
        </section>

        ${CT.challenges && CT.challenges[L.id] ? h`
        <section id="lab" class="block">
          <h2>Code challenges</h2>
          <p class="muted">Write real ${esc(L.name)} and run it against tests, right here in your browser.${L.id === "python" ? " Python runs through Pyodide — the first run downloads about 10 MB." : ""} Press Ctrl+Enter to run.</p>
          <div id="labMount"></div>
        </section>` : ""}

        <section id="test" class="block">
          <h2>Test: ${esc(L.name)}</h2>
          <p class="muted">${L.quiz.length} questions${L.level === "modern" ? " including output-prediction, bug-spotting and type-the-syntax questions" : ""}. Score ${Math.round(PASS * 100)}% or more to pass.</p>
          <div class="quiz" data-quiz="${L.id}"></div>
        </section>

        <section id="sources" class="block">
          <h2>Sources and where to learn more</h2>
          ${sourcesList(L.sources)}
        </section>

        <nav class="pager" aria-label="Next and previous language">
          ${prev ? h`<a href="#/lang/${prev.id}" class="pager-prev"><small>Previous · ${prev.year}</small>${esc(prev.name)}</a>` : h`<a href="#/era/dawn" class="pager-prev"><small>Back to</small>The timeline</a>`}
          ${next ? h`<a href="#/lang/${next.id}" class="pager-next"><small>Next · ${next.year}</small>${esc(next.name)}</a>` : h`<a href="#/ai" class="pager-next"><small>Next · 2020s</small>AI and coding with AI</a>`}
        </nav>
      </article>
      </div>`;

    mountQuiz(app.querySelector(`[data-quiz="${L.id}"]`), L.id, L.quiz, L.prism);
    if (window.Lab && CT.challenges && CT.challenges[L.id]) Lab.mount(document.getElementById("labMount"), L.id, CT.challenges[L.id], highlight);
    highlight(app);
    window.scrollTo(0, 0);
  }

  function viewAI() {
    const AI = CT.ai;
    const era = eraById.ai;
    setTheme("ai");
    renderEraTabs("ai", "ai");
    app.innerHTML = h`
      <div class="lang-wrap" data-theme="ai">
      <article class="lang ai win">
        <nav class="crumbs" aria-label="Breadcrumb"><a href="#/era/ai">${era.n} · ${esc(era.title)}</a></nav>
        <header class="lang-head">
          <p class="lang-year">1950 → today</p>
          <h1>${esc(AI.title)}</h1>
          <p class="lede">${esc(AI.intro)}</p>
          <p class="jump">
            <a href="#ai-history" data-jump>History</a>
            <a href="#ai-concepts" data-jump>How it works</a>
            <a href="#ai-train" data-jump>Training</a>
            <a href="#ai-lab" data-jump>Try it</a>
            <a href="#ai-llm" data-jump>LLMs</a>
            <a href="#ai-code" data-jump>Code</a>
            <a href="#ai-coding" data-jump>Coding with AI</a>
            <a href="#ai-path" data-jump>Learning path</a>
            <a href="#test" data-jump>Test</a>
            <a href="#sources" data-jump>Sources</a>
          </p>
        </header>

        <section id="ai-history" class="block">
          <h2>A short history of AI</h2>
          <ol class="timeline">${AI.timeline.map((t) => h`
            <li><span class="t-year">${esc(t.y)}</span><div><strong>${esc(t.t)}</strong><p>${esc(t.d)}</p></div></li>`)}</ol>
        </section>

        ${AI.facts ? h`
        <section class="block">
          <h2>Fun facts</h2>
          ${factList(AI.facts)}
        </section>` : ""}

        <section id="ai-concepts" class="block">
          <h2>How machine learning works</h2>
          <dl class="concepts">${AI.concepts.map((k) => h`<div><dt>${esc(k.t)}</dt><dd>${esc(k.d)}</dd></div>`)}</dl>
        </section>

        <section id="ai-train" class="block">
          <h2>How AI models are trained</h2>
          <p class="muted">From raw data to a deployed model — the same steps whether you’re training a spam filter or a large language model.</p>
          <dl class="concepts train-steps">${AI.training.map((k) => h`<div><dt>${esc(k.t)}</dt><dd>${esc(k.d)}</dd></div>`)}</dl>
          <h3>Train your own models</h3>
          ${AI.trainingExamples.map((ex) => h`
            <div class="example">
              ${codeBlock(ex.code, ex.prism, ex.title)}
              ${ex.note ? h`<p class="note">${esc(ex.note)}</p>` : ""}
            </div>`)}
        </section>

        <section id="ai-lab" class="block">
          <h2>Train a neural network in your browser</h2>
          <p class="muted">Pick a dataset, choose how many hidden neurons the network gets, and press Train. Each “epoch” runs one round of the forward pass, loss, backpropagation and weight update — live, in plain JavaScript.</p>
          <div id="trainer"></div>
        </section>

        <section id="ai-llm" class="block">
          <h2>Large language models, explained</h2>
          <dl class="concepts">${AI.llm.map((k) => h`<div><dt>${esc(k.t)}</dt><dd>${esc(k.d)}</dd></div>`)}</dl>
        </section>

        <section id="ai-code" class="block">
          <h2>AI in code</h2>
          <p class="muted">Every example below is plain Python you can run. The first three need no libraries at all.</p>
          ${AI.examples.map((ex) => h`
            <div class="example">
              ${codeBlock(ex.code, ex.prism, ex.title)}
              ${ex.note ? h`<p class="note">${esc(ex.note)}</p>` : ""}
            </div>`)}
        </section>

        <section id="ai-coding" class="block">
          <h2>What you need to know about coding with AI</h2>
          <dl class="concepts">${AI.coding.map((k) => h`<div><dt>${esc(k.t)}</dt><dd>${esc(k.d)}</dd></div>`)}</dl>

          <h3>Prompting: weak vs strong</h3>
          <div class="prompts">${AI.prompts.map((p) => h`
            <figure class="prompt"><figcaption>${esc(p.label)}</figcaption><blockquote>${esc(p.text)}</blockquote></figure>`)}</div>

          <h3>A workflow that works</h3>
          <ol class="steps">${AI.workflow.map((s) => h`<li>${esc(s)}</li>`)}</ol>
        </section>

        <section id="ai-path" class="block">
          <h2>Your AI learning path</h2>
          <ol class="roadmap path">${AI.path.map((p) => h`<li><strong>${esc(p.step)}</strong><span>${esc(p.what)}</span>
            <a href="${esc(p.link.u)}" target="_blank" rel="noopener noreferrer">${esc(p.link.t)}</a></li>`)}</ol>
        </section>

        <section id="test" class="block">
          <h2>Final test: AI and coding with AI</h2>
          <p class="muted">${AI.quiz.length} questions. Score ${Math.round(PASS * 100)}% or more to pass.</p>
          <div class="quiz" data-quiz="ai"></div>
        </section>

        <section id="sources" class="block">
          <h2>Sources and where to learn more</h2>
          ${sourcesList(AI.sources)}
        </section>

        <nav class="pager" aria-label="Next and previous">
          <a href="#/lang/${order[order.length - 1]}" class="pager-prev"><small>Previous</small>${esc(CT.langs[order[order.length - 1]].name)}</a>
          <a href="#/progress" class="pager-next"><small>Finish</small>See your progress</a>
        </nav>
      </article>
      </div>`;
    mountQuiz(app.querySelector('[data-quiz="ai"]'), "ai", AI.quiz, "python");
    if (window.Trainer) Trainer.mount(document.getElementById("trainer"));
    highlight(app);
    window.scrollTo(0, 0);
  }

  const FILTERS = [
    ["all", "All"], ["web", "Web"], ["mobile", "Phones"], ["games", "Games"],
    ["systems", "Systems"], ["data", "Data"], ["ai", "AI"], ["business", "Business"],
  ];

  function viewLanguages(filter = "all") {
    setTheme("ai");
    renderEraTabs(null);
    const list = order.map((id) => CT.langs[id]).filter((L) => filter === "all" || L.tags.includes(filter));
    app.innerHTML = h`
      <section class="page" data-theme="ai">
        <h1>Every language, in order</h1>
        <p class="lede">Filter by what you want to build. Languages marked “In depth” have the longest tests, with output-prediction, bug-spotting and type-the-syntax questions.</p>
        <div class="filters" role="group" aria-label="Filter languages">
          ${FILTERS.map(([k, label]) => h`<a href="#/languages/${k}" class="chip${k === filter ? " on" : ""}" ${k === filter ? 'aria-current="true"' : ""}>${label}</a>`)}
        </div>
        <ul class="lang-rows wide">${list.map((L) => {
          const e = eraById[L.era];
          const row = langRow(L).replace(/^\s*<li>|<\/li>\s*$/g, "")
            .replace('<span class="lr-meta">', `<span class="lr-meta"><span class="lr-era" data-theme="${e.id}">${esc(e.years)}</span>`);
          return h`<li>${row}</li>`;
        })}</ul>
      </section>`;
    window.scrollTo(0, 0);
  }

  function viewProgress() {
    setTheme("ai");
    renderEraTabs(null);
    const done = passedCount();
    const pct = Math.round((done / totalTests) * 100);
    const rows = [...order.map((id) => [id, CT.langs[id].name, CT.langs[id].year, eraById[CT.langs[id].era].accent, `#/lang/${id}`]),
      ["ai", "AI and coding with AI", "2020s", eraById.ai.accent, "#/ai"]];
    app.innerHTML = h`
      <section class="page" data-theme="ai">
        <h1>Your progress</h1>
        <p class="lede">${done === totalTests
          ? "You passed every test, from assembly to AI. That’s the whole history of programming — nicely done."
          : `You’ve passed ${done} of ${totalTests} tests (${pct}%). Scores are saved in this browser only.`}</p>
        ${(() => {
          const r = Fun.rankFor(done, totalTests);
          return h`<div class="rank"><p class="rank-label">Your rank</p><p class="rank-title">${esc(r.title)}</p>
            <p class="muted">${esc(r.blurb)}${r.next ? ` Pass ${r.toGo} more to become a ${esc(r.next)}.` : ""}</p></div>`;
        })()}
        <div class="meter" style="grid-template-columns:repeat(${totalTests},1fr)" role="progressbar" aria-valuemin="0" aria-valuemax="${totalTests}" aria-valuenow="${done}">
          ${rows.map(([id, , , c]) => h`<span class="${progress[id]?.passed ? "on" : ""}" style="--mc:${c}"></span>`)}
        </div>
        <table class="progress-table">
          <thead><tr><th scope="col">Year</th><th scope="col">Test</th><th scope="col">Best</th><th scope="col">Status</th></tr></thead>
          <tbody>${rows.map(([id, name, year, c, href]) => {
            const p = progress[id];
            return h`<tr style="--mc:${c}"><td>${year}</td><td><a href="${href}">${esc(name)}</a></td>
              <td>${p ? Math.round(p.best * 100) + "%" : "—"}</td><td>${statusBadge(id)}</td></tr>`;
          })}</tbody>
        </table>
        <h2 class="badges-title">Achievements <small>${Object.keys(Fun.state.badges).length}/${Fun.BADGES.length}</small></h2>
        <ul class="badges">${Fun.BADGES.map((b) => {
          const got = Fun.state.badges[b.id];
          return h`<li class="badge ${got ? "got" : ""}"><span class="badge-icon" aria-hidden="true">${got ? b.icon : "🔒"}</span>
            <strong>${esc(b.name)}</strong><span>${esc(b.desc)}</span></li>`;
        })}</ul>
        <p class="muted">Arcade bests — Snake: ${Fun.state.best.snake || 0} · Guess the language: ${Fun.state.best.guess || 0} · Cards punched: ${Fun.state.cards || 0}</p>
        <div class="progress-actions">
          <button class="btn" type="button" id="exportProgress">Export progress</button>
          <label class="btn btn-ghost" for="importProgress">Import progress</label>
          <input type="file" id="importProgress" accept="application/json,.json" hidden>
          <button class="btn btn-ghost" type="button" id="resetProgress">Reset all progress</button>
        </div>
        <p class="muted">Export saves your scores, achievements, high scores and challenge progress to a file you can import on another device or browser.</p>
      </section>`;
    document.getElementById("exportProgress").addEventListener("click", () => {
      const data = { app: "code-through-time", version: 1, exported: new Date().toISOString(), progress, fun: Fun.state };
      try { data.lab = JSON.parse(localStorage.getItem("ctt.lab.v1")) || {}; } catch { data.lab = {}; }
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
      a.download = "code-through-time-progress.json";
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    });
    document.getElementById("importProgress").addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        const data = JSON.parse(await file.text());
        if (data.app !== "code-through-time" || typeof data.progress !== "object") throw new Error("not a Code Through Time export");
        progress = data.progress;
        saveProgress(progress);
        Fun.load(data.fun || {});
        try { localStorage.setItem("ctt.lab.v1", JSON.stringify(data.lab || {})); } catch { /* ignore */ }
        updatePill();
        Fun.toast("📥 Progress imported", `${Object.values(progress).filter((p) => p.passed).length} passed tests restored.`);
        viewProgress();
      } catch (err) {
        Fun.toast("Import failed", `That file couldn’t be read: ${esc(err.message)}.`);
      }
    });
    document.getElementById("resetProgress").addEventListener("click", () => {
      if (!confirm("Clear all saved test scores, achievements and high scores in this browser?")) return;
      progress = {};
      saveProgress(progress);
      Fun.reset();
      try { localStorage.removeItem("ctt.lab.v1"); } catch { /* ignore */ }
      updatePill();
      viewProgress();
    });
    window.scrollTo(0, 0);
  }

  function viewPeople() {
    setTheme("ai");
    renderEraTabs(null);
    app.innerHTML = h`
      <section class="page" data-theme="ai">
        <h1>People</h1>
        <p class="lede">The pioneers behind the languages and breakthroughs on this site — in the order they appear in history.</p>
        <ul class="people">${CT.eras.flatMap((e) => CT.people.filter((p) => p.era === e.id)).map((p) => h`
          <li class="person" id="person-${p.id}">
            <span class="person-era lr-era" data-theme="${p.era}">${esc(eraById[p.era].shortYears)}</span>
            <h2>${esc(p.name)}</h2>
            <p class="person-years">${esc(p.years)} · ${esc(p.role)}</p>
            <p>${esc(p.bio)}</p>
            <p class="person-links">${p.langs.map((id) => h`<a class="chip" href="#/lang/${id}">${esc(CT.langs[id].name)}</a>`)}
              <a class="fact-src" href="${esc(p.src.u)}" target="_blank" rel="noopener noreferrer">Source: ${esc(p.src.t)}</a></p>
          </li>`)}</ul>
      </section>`;
    window.scrollTo(0, 0);
  }

  function viewGlossary() {
    setTheme("ai");
    renderEraTabs(null);
    const terms = [...CT.glossary].sort((a, b) => a.term.localeCompare(b.term));
    const letters = [...new Set(terms.map((t) => t.term[0].toUpperCase()))];
    app.innerHTML = h`
      <section class="page" data-theme="ai">
        <h1>Glossary</h1>
        <p class="lede">${terms.length} terms you’ll meet on this site and in real programming jobs, in plain English.</p>
        <label class="sr" for="glossFilter">Filter terms</label>
        <input id="glossFilter" class="fill-input gloss-filter" type="search" placeholder="Filter terms…" autocomplete="off">
        <nav class="filters" aria-label="Jump to letter">${letters.map((l) => h`<a class="chip" href="#g-${l}" data-jump>${l}</a>`)}</nav>
        <dl class="glossary">${terms.map((t, k) => h`
          ${k === 0 || terms[k - 1].term[0].toUpperCase() !== t.term[0].toUpperCase() ? h`<p class="gloss-letter" id="g-${t.term[0].toUpperCase()}">${t.term[0].toUpperCase()}</p>` : ""}
          <div class="gloss-item" data-term="${esc(t.term.toLowerCase())} ${esc(t.text.toLowerCase())}">
            <dt id="term-${esc(t.term.toLowerCase().replace(/[^a-z0-9]+/g, "-"))}">${esc(t.term)}</dt>
            <dd>${esc(t.text)}${t.see && CT.langs[t.see] ? h` <a href="#/lang/${t.see}">See ${esc(CT.langs[t.see].name)}</a>` : ""}</dd>
          </div>`)}</dl>
      </section>`;
    document.getElementById("glossFilter").addEventListener("input", (e) => {
      const q = e.target.value.trim().toLowerCase();
      app.querySelectorAll(".gloss-item").forEach((el) => { el.hidden = q && !el.dataset.term.includes(q); });
      app.querySelectorAll(".gloss-letter").forEach((el) => { el.hidden = !!q; });
    });
    window.scrollTo(0, 0);
  }

  /* ───────── search (press / or Ctrl+K) ───────── */
  let searchIndex = null;
  function buildIndex() {
    const items = [];
    order.forEach((id) => {
      const L = CT.langs[id];
      items.push({ type: "Language", title: L.name, sub: `${L.year} · ${L.tagline}`, href: `#/lang/${id}`, text: [L.name, L.tagline, L.creator, L.org, L.tags.join(" "), L.paradigm].join(" ") });
      (L.facts || []).forEach((f) => items.push({ type: "Fact", title: L.name, sub: f.text, href: `#/lang/${id}#fun`, text: f.text }));
    });
    CT.eras.forEach((e) => {
      items.push({ type: "Era", title: e.title, sub: e.years, href: `#/era/${e.id}`, text: [e.title, e.mood, e.intro].join(" ") });
      e.breakthroughs.forEach((b) => items.push({ type: "Breakthrough", title: b.t, sub: `${b.y} · ${b.d}`, href: `#/era/${e.id}`, text: b.t + " " + b.d }));
      e.tracks.forEach((t) => items.push({ type: t.k === "games" ? "Game" : "Phone", title: t.t, sub: `${t.y} · ${t.d}`, href: `#/era/${e.id}`, text: t.t + " " + t.d }));
    });
    CT.people.forEach((p) => items.push({ type: "Person", title: p.name, sub: p.role, href: `#/people#person-${p.id}`, text: [p.name, p.role, p.bio].join(" ") }));
    CT.glossary.forEach((g) => items.push({ type: "Glossary", title: g.term, sub: g.text, href: "#/glossary", text: g.term + " " + g.text }));
    [["How AI models are trained", "#/ai#ai-train"], ["Train a neural network in your browser", "#/ai#ai-lab"], ["Coding with AI", "#/ai#ai-coding"], ["AI learning path", "#/ai#ai-path"]]
      .forEach(([t, href]) => items.push({ type: "AI", title: t, sub: "AI chapter", href, text: t }));
    [["Arcade", "#/arcade", "punch card snake guess the language games"], ["Sources", "#/sources", "bibliography references"], ["Your progress", "#/progress", "achievements rank badges export import"]]
      .forEach(([t, href, x]) => items.push({ type: "Page", title: t, sub: "", href, text: t + " " + x }));
    items.forEach((it) => { it.lc = it.text.toLowerCase(); it.tl = it.title.toLowerCase(); });
    return items;
  }
  function searchFor(q) {
    searchIndex = searchIndex || buildIndex();
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    return searchIndex.map((it) => {
      if (!words.every((w) => it.lc.includes(w) || it.tl.includes(w))) return null;
      let score = 0;
      words.forEach((w) => { if (it.tl === w) score += 10; else if (it.tl.startsWith(w)) score += 6; else if (it.tl.includes(w)) score += 3; });
      score += { Language: 4, Era: 3, Person: 3, AI: 2, Page: 2, Glossary: 2 }[it.type] || 0;
      return { it, score };
    }).filter(Boolean).sort((a, b) => b.score - a.score).slice(0, 12).map((r) => r.it);
  }
  function openSearch() {
    if (document.querySelector(".search")) return;
    const el = document.createElement("div");
    el.className = "search";
    el.dataset.theme = document.body.dataset.page || "ai";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-label", "Search");
    el.innerHTML = `<div class="search-box">
        <input type="search" class="search-input" placeholder="Search languages, people, eras, terms…" aria-label="Search" autocomplete="off">
        <ul class="search-results" role="listbox"></ul>
        <p class="search-hint">↑↓ to move · Enter to open · Esc to close</p>
      </div>`;
    document.body.appendChild(el);
    const input = el.querySelector("input");
    const list = el.querySelector(".search-results");
    let sel = 0, results = [];
    const draw = () => {
      list.innerHTML = results.length ? results.map((r, k) => h`<li role="option" aria-selected="${k === sel}">
        <a href="${r.href}"><span class="sr-type">${esc(r.type)}</span><strong>${esc(r.title)}</strong><small>${esc(r.sub.slice(0, 110))}</small></a></li>`).join("")
        : (input.value.trim() ? `<li class="search-empty">No matches. Try a language, a person or a term like “pointer”.</li>` : "");
    };
    const close = () => { el.remove(); };
    input.addEventListener("input", () => { results = searchFor(input.value); sel = 0; draw(); });
    input.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { sel = Math.min(sel + 1, results.length - 1); draw(); e.preventDefault(); }
      if (e.key === "ArrowUp") { sel = Math.max(sel - 1, 0); draw(); e.preventDefault(); }
      if (e.key === "Enter" && results[sel]) { location.hash = results[sel].href; close(); }
      if (e.key === "Escape") close();
    });
    el.addEventListener("click", (e) => { if (e.target === el || e.target.closest("a")) setTimeout(close, 0); });
    input.focus();
  }
  document.addEventListener("keydown", (e) => {
    const typing = /input|textarea|select/i.test(document.activeElement.tagName);
    if ((e.key === "/" && !typing) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k")) { e.preventDefault(); openSearch(); }
  });
  document.addEventListener("click", (e) => { if (e.target.closest("[data-search]")) openSearch(); });

  function viewSources() {
    setTheme("ai");
    renderEraTabs(null);
    // Each language's reading list plus the sources behind its fun facts (without duplicates).
    const langSources = (L) => {
      const seen = new Set(L.sources.map((x) => x.u));
      return [...L.sources, ...L.facts.map((f) => f.src).filter((x) => x && !seen.has(x.u) && seen.add(x.u))];
    };
    const all = new Set();
    CT.eras.forEach((e) => (e.sources || []).forEach((x) => all.add(x.u)));
    order.forEach((id) => langSources(CT.langs[id]).forEach((x) => all.add(x.u)));
    [...CT.ai.sources, ...CT.ai.facts.map((f) => f.src), ...CT.ai.path.map((p) => p.link), ...CT.people.map((p) => p.src)].forEach((x) => all.add(x.u));
    app.innerHTML = h`
      <section class="page" data-theme="ai">
        <h1>Sources</h1>
        <p class="lede">Every fact on this site is summarised from the ${all.size} sources below — official documentation, original papers, museums and well-cited references. Follow them to check the details or go deeper.</p>
        <nav class="filters" aria-label="Jump to era">${CT.eras.map((e) => h`<a class="chip" href="#src-${e.id}" data-jump>${esc(e.short)} <small>${esc(e.shortYears)}</small></a>`)}
          <a class="chip" href="#src-people" data-jump>People</a></nav>
        ${CT.eras.map((e) => h`
          <section class="src-era" id="src-${e.id}">
            <h2><span class="lr-era" data-theme="${e.id}">${e.n}</span> ${esc(e.title)} <small>${esc(e.years)}</small></h2>
            ${e.sources ? h`<h3>History of the era</h3>${sourcesList(e.sources)}` : ""}
            ${e.langs.map((id) => {
              const L = CT.langs[id];
              return h`<h3><a href="#/lang/${id}">${esc(L.name)}</a> <small>${L.year}</small></h3>${sourcesList(langSources(L))}`;
            })}
            ${e.id === "ai" ? h`<h3><a href="#/ai">AI and coding with AI</a></h3>${sourcesList([...CT.ai.sources, ...CT.ai.facts.map((f) => f.src), ...CT.ai.path.map((p) => p.link)])}` : ""}
          </section>`)}
        <section class="src-era" id="src-people">
          <h2>People</h2>
          ${sourcesList(CT.people.map((p) => p.src))}
        </section>
      </section>`;
    window.scrollTo(0, 0);
  }

  function viewNotFound() {
    setTheme("mainframe");
    app.innerHTML = h`<section class="page" data-theme="mainframe"><h1>Segmentation fault (page not found)</h1>
      <p class="lede">That page doesn’t exist. <a href="#/">Go back to the timeline</a>.</p></section>`;
  }

  /* ───────── quiz engine ───────── */
  function normalise(s, ci) {
    let out = String(s).trim().replace(/\s+/g, " ");
    return ci ? out.toLowerCase() : out;
  }

  function mountQuiz(root, id, questions, prism) {
    let i = 0;
    let score = 0;
    let answered = false;
    let streak = 0;
    let missed = [];
    let qs = shuffle(questions);
    const theme = () => (root.closest("[data-theme]") || {}).dataset?.theme || document.body.dataset.page || "ai";

    const render = () => {
      if (i >= qs.length) return renderResult();
      answered = false;
      const q = qs[i];
      const optOrder = q.type === "mc" ? shuffle(q.options.map((_, n) => n)) : [];
      const kind = q.type === "fill" ? "Type the missing syntax" : (q.code ? "Read the code" : "Choose one");
      root.innerHTML = h`
        <div class="q">
          <div class="q-top">
            <span class="q-count">Question ${i + 1} of ${qs.length}</span>
            <span class="q-kind">${kind}</span>
            <span class="q-score">${streak >= 3 ? h`<span class="streak">🔥 ${streak} in a row</span> ` : ""}Score ${score}</span>
          </div>
          <div class="q-progress"><span style="width:${(i / qs.length) * 100}%"></span></div>
          <p class="q-text">${rich(q.q)}</p>
          ${q.code ? codeBlock(q.code, prism, q.type === "fill" ? "Fill in the ____" : "") : ""}
          ${q.type === "mc" ? h`
            <div class="options" role="group" aria-label="Answers">
              ${optOrder.map((n, pos) => h`<button type="button" class="option" data-opt="${n}"><span class="opt-key">${"ABCD"[pos]}</span><span>${rich(q.options[n])}</span></button>`)}
            </div>` : h`
            <form class="fill" autocomplete="off">
              <label class="sr" for="fill-${id}-${i}">Your answer</label>
              <input id="fill-${id}-${i}" class="fill-input" type="text" spellcheck="false" autocapitalize="off" placeholder="Type what replaces ____">
              <button class="btn" type="submit">Check</button>
            </form>`}
          <div class="feedback" aria-live="polite"></div>
        </div>`;
      highlight(root);

      if (q.type === "mc") {
        root.querySelectorAll(".option").forEach((btn) =>
          btn.addEventListener("click", () => answerMC(q, Number(btn.dataset.opt))));
      } else {
        const form = root.querySelector(".fill");
        const input = form.querySelector("input");
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          if (!input.value.trim() || answered) return;
          answerFill(q, input.value);
        });
      }
    };

    const answerMC = (q, choice) => {
      if (answered) return;
      answered = true;
      const correct = choice === q.answer;
      if (correct) score++;
      root.querySelectorAll(".option").forEach((b) => {
        const n = Number(b.dataset.opt);
        b.disabled = true;
        if (n === q.answer) b.classList.add("right");
        else if (n === choice) b.classList.add("wrong");
      });
      if (!correct) missed.push({ q: q.q, yours: q.options[choice], right: q.options[q.answer], explain: q.explain });
      showFeedback(correct, q.explain);
    };

    const answerFill = (q, value) => {
      answered = true;
      const v = normalise(value, q.ci);
      const correct = q.answers.some((a) => normalise(a, q.ci) === v);
      if (correct) score++;
      else missed.push({ q: q.q, yours: value, right: q.answers[0], explain: q.explain });
      const input = root.querySelector(".fill-input");
      input.disabled = true;
      input.classList.add(correct ? "right" : "wrong");
      root.querySelector(".fill .btn").disabled = true;
      showFeedback(correct, (correct ? "" : `Answer: ${q.answers[0]}. `) + q.explain);
    };

    const showFeedback = (correct, text) => {
      streak = correct ? streak + 1 : 0;
      if (streak >= 5) Fun.award("streak5");
      const fb = root.querySelector(".feedback");
      fb.innerHTML = h`
        <p class="verdict ${correct ? "ok" : "no"}">${esc(Fun.verdict(theme(), correct))}</p>
        <p>${rich(text)}</p>
        <button type="button" class="btn next">${i + 1 < qs.length ? "Next question" : "See your result"}</button>`;
      const next = fb.querySelector(".next");
      next.addEventListener("click", () => { i++; render(); root.scrollIntoView({ block: "nearest" }); });
      next.focus({ preventScroll: true });
    };

    const renderResult = () => {
      recordScore(id, score, qs.length);
      const pct = Math.round((score / qs.length) * 100);
      const passed = score / qs.length >= PASS;
      Fun.afterTest({ pct: score / qs.length, progress, CT, order, totalTests });
      const idx = order.indexOf(id);
      const nextHref = id === "ai" ? "#/progress" : (order[idx + 1] ? `#/lang/${order[idx + 1]}` : "#/ai");
      const nextLabel = id === "ai" ? "See your progress" : (order[idx + 1] ? `Next: ${CT.langs[order[idx + 1]].name}` : "Next: AI");
      root.innerHTML = h`
        <div class="result ${passed ? "ok" : "no"}">
          <p class="result-score">${score} / ${qs.length} <span>${pct}%</span></p>
          <p class="result-flavour">${esc(Fun.result(theme(), passed))}</p>
          <p>${passed ? "Passed — your best score is saved." : `You need ${Math.round(PASS * 100)}% to pass. Re-read the examples above and try again.`}</p>
          ${missed.length ? h`<details class="review" ${passed ? "" : "open"}><summary>Review the ${missed.length} question${missed.length > 1 ? "s" : ""} you missed</summary>
            <ol>${missed.map((m) => h`<li><p class="review-q">${rich(m.q)}</p>
              <p><span class="review-no">You said:</span> ${rich(m.yours)}</p>
              <p><span class="review-ok">Answer:</span> ${rich(m.right)}</p>
              <p class="muted">${rich(m.explain)}</p></li>`)}</ol></details>` : ""}
          <p class="result-actions">
            <button type="button" class="btn ${passed ? "btn-ghost" : ""}" data-retry>Retake test</button>
            ${passed ? h`<a class="btn" href="${nextHref}">${nextLabel}</a>` : ""}
          </p>
        </div>`;
      root.querySelector("[data-retry]").addEventListener("click", () => { i = 0; score = 0; streak = 0; missed = []; qs = shuffle(questions); render(); });
    };

    render();
  }

  /* ───────── router ───────── */
  function route() {
    clearInterval(heroTimer);
    clearInterval(typeTimer);
    if (window.Arcade) Arcade.stop();
    if (window.Trainer) Trainer.stop();
    if (themeObserver) { themeObserver.disconnect(); themeObserver = null; }
    // "#/ai#ai-train" → page "ai", then scroll to the #ai-train section
    const [path, anchor] = location.hash.replace(/^#\/?/, "").split("#");
    const [page, arg] = path.split("/");
    document.querySelectorAll("[data-nav]").forEach((a) => {
      const active = (a.dataset.nav === "home" && page === "") || a.dataset.nav === page ||
        (a.dataset.nav === "languages" && page === "lang");
      a.toggleAttribute("aria-current", active);
    });

    if (!page) viewHome();
    else if (page === "era") viewEra(arg);
    else if (page === "lang") viewLang(arg);
    else if (page === "languages") viewLanguages(arg || "all");
    else if (page === "ai") viewAI();
    else if (page === "progress") viewProgress();
    else if (page === "arcade") { setTheme("pc"); renderEraTabs(null); Arcade.render(app, { CT, highlight }); window.scrollTo(0, 0); }
    else if (page === "sources") viewSources();
    else if (page === "people") viewPeople();
    else if (page === "glossary") viewGlossary();
    else viewNotFound();

    if (anchor) {
      const target = document.getElementById(anchor);
      if (target) requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
      if (page === "ai") renderEraTabs("ai", { "ai-train": "train", "ai-lab": "lab" }[anchor] || "ai");
    }

    const L = page === "lang" && CT.langs[arg];
    document.title = L ? `${L.name} (${L.year}) — Code Through Time`
      : page === "ai" ? "AI and coding with AI — Code Through Time"
      : page === "arcade" ? "Arcade — Code Through Time"
      : page === "sources" ? "Sources — Code Through Time"
      : page === "people" ? "People — Code Through Time"
      : page === "glossary" ? "Glossary — Code Through Time"
      : page === "era" && eraById[arg] ? `${eraById[arg].title} (${eraById[arg].years}) — Code Through Time`
      : "Code Through Time — the history of programming languages";
  }

  // In-page section links (#story etc.) shouldn't trigger the router
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-jump]");
    if (!a) return;
    e.preventDefault();
    const target = document.getElementById(a.getAttribute("href").slice(1));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // Tuck the top row of the header away when scrolling down; bring it back when scrolling up.
  (() => {
    const bar = document.querySelector(".topbar");
    const row = bar.querySelector(".topbar-row");
    let lastY = scrollY;
    const setH = () => bar.style.setProperty("--row-h", row.offsetHeight + "px");
    setH();
    addEventListener("resize", setH);
    addEventListener("scroll", () => {
      const y = scrollY;
      if (Math.abs(y - lastY) < 6) return;
      bar.classList.toggle("tuck", y > lastY && y > 200);
      lastY = y;
    }, { passive: true });
    bar.addEventListener("focusin", () => bar.classList.remove("tuck"));
  })();

  // Arrow keys move between era tabs, like a real tab list.
  document.addEventListener("keydown", (e) => {
    const tab = e.target.closest && e.target.closest(".et, .et-lang");
    if (!tab || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    const all = [...tab.parentElement.querySelectorAll(tab.classList.contains("et") ? ".et" : ".et-lang")];
    let k = all.indexOf(tab);
    k = e.key === "Home" ? 0 : e.key === "End" ? all.length - 1 : (k + (e.key === "ArrowRight" ? 1 : -1) + all.length) % all.length;
    all[k].focus();
    e.preventDefault();
  });

  window.addEventListener("hashchange", route);
  updatePill();
  route();
  Fun.boot({ eras: CT.eras.length, langs: order.length, questions: countQuestions() });
})();
