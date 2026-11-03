/* Code Through Time — fun.js
 * Ranks, achievement badges, toasts, confetti, era-themed quiz reactions,
 * a BIOS-style boot screen and a secret code. Exposes window.Fun for app.js and arcade.js.
 */
(() => {
  "use strict";

  const KEY = "ctt.fun.v1";
  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ───────── storage ───────── */
  function load() {
    try { return Object.assign({ badges: {}, best: {}, cards: 0 }, JSON.parse(localStorage.getItem(KEY)) || {}); }
    catch { return { badges: {}, best: {}, cards: 0 }; }
  }
  let state = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ } }

  /* ───────── ranks: your job title upgrades with history ───────── */
  const RANKS = [
    [0, "Keypunch trainee", "Every programmer starts by punching their first card."],
    [1, "Card punch operator", "You’ve passed your first test. The operators know your name."],
    [4, "Mainframe operator", "You’re trusted with the machine room keys."],
    [8, "Terminal hacker", "Green text, late nights, and a growing collection of printouts."],
    [12, "Bedroom coder", "You type in BASIC listings and dream in assembly."],
    [16, "Webmaster", "Your homepage has a visitor counter and a guestbook."],
    [20, "Web 2.0 ninja", "Rounded corners, gradients and a beta badge on everything."],
    [25, "App developer", "Your code runs on a billion phones."],
    [30, "Senior engineer", "You’ve seen every era’s mistakes — and know how to avoid them."],
    [Infinity, "Code time traveller", "You passed every test from 1843 to today."],
  ];
  function rankFor(passed, total) {
    if (passed >= total) return { title: RANKS[RANKS.length - 1][1], blurb: RANKS[RANKS.length - 1][2], next: null };
    let cur = RANKS[0], next = null;
    for (let i = 0; i < RANKS.length - 1; i++) {
      if (passed >= RANKS[i][0]) { cur = RANKS[i]; next = RANKS[i + 1]; }
    }
    const nextAt = next[0] === Infinity ? total : next[0];
    return { title: cur[1], blurb: cur[2], next: next[1], toGo: Math.max(0, nextAt - passed) };
  }

  /* ───────── badges ───────── */
  const BADGES = [
    { id: "hello", icon: "⌨️", name: "Hello, world", desc: "Pass your first test." },
    { id: "era-dawn", icon: "🗂️", name: "Punch card pro", desc: "Pass every test from 1843–1959." },
    { id: "era-mainframe", icon: "📟", name: "Phosphor burn", desc: "Pass every test from the 1960s–70s." },
    { id: "era-pc", icon: "💾", name: "DOS master", desc: "Pass every test from the 1980s." },
    { id: "era-web", icon: "🌐", name: "Webmaster ’99", desc: "Pass every test from the 1990s." },
    { id: "era-platform", icon: "✨", name: "Web 2.0 beta tester", desc: "Pass every test from the 2000s." },
    { id: "era-mobile", icon: "📱", name: "App store approved", desc: "Pass every test from the 2010s." },
    { id: "ai", icon: "🤖", name: "Prompt engineer", desc: "Pass the AI test." },
    { id: "flawless", icon: "💯", name: "Flawless", desc: "Score 100% on any test." },
    { id: "deep", icon: "🤿", name: "Deep diver", desc: "Pass every “In depth” test." },
    { id: "streak5", icon: "🔥", name: "On fire", desc: "Answer 5 questions in a row correctly." },
    { id: "coder", icon: "🧪", name: "Code runner", desc: "Pass a coding challenge." },
    { id: "keypunch", icon: "🕳️", name: "Keypunch operator", desc: "Punch a card in the Arcade." },
    { id: "snake", icon: "🐍", name: "Snake charmer", desc: "Score 15 or more in Snake." },
    { id: "polyglot", icon: "🗣️", name: "Polyglot", desc: "Score 10 or more in Guess the Language." },
    { id: "konami", icon: "🎮", name: "Cheat code", desc: "Find the secret. (Hint: Gradius, 1986.)" },
    { id: "traveller", icon: "⏳", name: "Time traveller", desc: "Pass every single test." },
  ];

  function award(id) {
    if (state.badges[id]) return false;
    const b = BADGES.find((x) => x.id === id);
    if (!b) return false;
    state.badges[id] = Date.now();
    save();
    toast(`${b.icon} Achievement unlocked`, `<strong>${b.name}</strong> — ${b.desc}`);
    return true;
  }

  // Called by app.js after any test finishes.
  function afterTest({ pct, progress, CT, order, totalTests }) {
    const passed = (id) => progress[id] && progress[id].passed;
    const count = Object.values(progress).filter((p) => p.passed).length;
    if (count >= 1) award("hello");
    if (pct >= 1) award("flawless");
    CT.eras.forEach((e) => {
      if (e.langs.length && e.langs.every(passed)) award(`era-${e.id}`);
    });
    if (passed("ai")) award("ai");
    if (order.filter((id) => CT.langs[id].level === "modern").every(passed)) award("deep");
    if (count >= totalTests) award("traveller");
    if (pct >= 0.7) confetti();
  }

  /* ───────── era-themed reactions ───────── */
  const VERDICT = {
    dawn:      ["Card accepted.", "Card jammed."],
    mainframe: ["READY.", "?SYNTAX ERROR"],
    pc:        ["OK", "Bad command or file name"],
    web:       ["200 OK", "404 Answer Not Found"],
    platform:  ["Awesome!", "Epic fail."],
    mobile:    ["Nice!", "Not quite."],
    ai:        ["Correct.", "Hallucination detected."],
  };
  const RESULT = {
    dawn:      ["Deck accepted. Your results will be on the printout tomorrow morning.", "Card jammed in the reader. Re-punch your deck and resubmit."],
    mainframe: ["JOB COMPLETED — RC=0000", "ABEND — JOB FAILED. RESUBMIT?"],
    pc:        ["C:\\> PASSED.EXE — 1 file(s) copied.", "Abort, Retry, Fail?"],
    web:       ["Congratulations! You are the 1,000,000th visitor to pass this test!", "404: Passing grade not found."],
    platform:  ["Achievement unlocked! Tell all your friends on MySpace.", "Epic fail. Reload and try again?"],
    mobile:    ["Build succeeded. Shipped to the app store.", "Build failed — fix the red squiggles and try again."],
    ai:        ["Verified. No hallucinations detected.", "Low confidence. Re-read the docs and try again."],
  };
  const verdict = (theme, ok) => (VERDICT[theme] || VERDICT.ai)[ok ? 0 : 1];
  const result = (theme, ok) => (RESULT[theme] || RESULT.ai)[ok ? 0 : 1];

  /* ───────── toasts ───────── */
  let toastBox = null;
  function toast(title, html) {
    if (!toastBox) {
      toastBox = document.createElement("div");
      toastBox.className = "toasts";
      toastBox.setAttribute("aria-live", "polite");
      document.body.appendChild(toastBox);
    }
    const t = document.createElement("div");
    t.className = "toast";
    t.dataset.theme = document.body.dataset.page || "ai";
    t.innerHTML = `<p class="toast-title">${title}</p><p>${html}</p>`;
    toastBox.appendChild(t);
    setTimeout(() => t.classList.add("out"), 4200);
    setTimeout(() => t.remove(), 4800);
  }

  /* ───────── confetti ───────── */
  function confetti() {
    if (reduceMotion()) return;
    const c = document.createElement("canvas");
    c.className = "confetti";
    c.width = innerWidth; c.height = innerHeight;
    document.body.appendChild(c);
    const ctx = c.getContext("2d");
    const colors = ["#f2b84b", "#3ef08b", "#5aa9ff", "#ff5fd2", "#ff8a3d", "#2de2e6", "#b794ff"];
    const parts = Array.from({ length: 140 }, () => ({
      x: innerWidth / 2 + (Math.random() - .5) * 200, y: innerHeight * .35,
      vx: (Math.random() - .5) * 14, vy: Math.random() * -14 - 4,
      s: 4 + Math.random() * 6, r: Math.random() * 6, vr: (Math.random() - .5) * .3,
      c: colors[(Math.random() * colors.length) | 0],
    }));
    let frame = 0;
    (function tick() {
      ctx.clearRect(0, 0, c.width, c.height);
      parts.forEach((p) => {
        p.vy += .45; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.vx *= .99;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
        ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * .6);
        ctx.restore();
      });
      if (++frame < 110) requestAnimationFrame(tick); else c.remove();
    })();
  }

  /* ───────── boot screen (once per browser session) ───────── */
  function boot(stats) {
    let seen = false;
    try { seen = sessionStorage.getItem("ctt.booted") === "1"; sessionStorage.setItem("ctt.booted", "1"); } catch { /* ignore */ }
    if (seen || reduceMotion()) return;
    const lines = [
      "CODE THROUGH TIME BIOS v1.0   (C) 1843–2026",
      "",
      "CPU: Analytical Engine (steam powered) ........ UPGRADED",
      "Memory test: 640K OK",
      `Detecting eras ................................ ${stats.eras} found`,
      `Loading languages ............................. ${stats.langs} OK`,
      `Loading test questions ........................ ${stats.questions} OK`,
      "Mounting /dev/punchcards ...................... OK",
      "Warming up vacuum tubes ....................... OK",
      "",
      "Press any key to begin_",
    ];
    const el = document.createElement("div");
    el.className = "boot";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-label", "Loading");
    el.innerHTML = `<pre></pre><button type="button" class="boot-skip">Skip</button>`;
    document.body.appendChild(el);
    const pre = el.querySelector("pre");
    let i = 0;
    const iv = setInterval(() => {
      pre.textContent += lines[i] + "\n";
      if (++i >= lines.length) clearInterval(iv);
    }, 140);
    const close = () => {
      clearInterval(iv);
      el.classList.add("out");
      setTimeout(() => el.remove(), 400);
      removeEventListener("keydown", close);
    };
    el.addEventListener("click", close);
    addEventListener("keydown", close, { once: true });
    setTimeout(close, 3400);
  }

  /* ───────── the Konami code ───────── */
  const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let pos = 0;
  addEventListener("keydown", (e) => {
    const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    pos = k === KONAMI[pos] ? pos + 1 : (k === KONAMI[0] ? 1 : 0);
    if (pos === KONAMI.length) {
      pos = 0;
      confetti();
      toast("↑↑↓↓←→←→BA", "30 extra lives! The Konami Code first appeared in the NES version of <em>Gradius</em> (1986).");
      award("konami");
      document.body.classList.toggle("cheat-mode");
    }
  });

  /* ───────── fun facts ───────── */
  function allFacts(CT) {
    const out = [];
    Object.values(CT.langs).forEach((L) => (L.facts || []).forEach((f) => out.push({ text: f.text || f, id: L.id, name: L.name })));
    (CT.ai.facts || []).forEach((f) => out.push({ text: f.text || f, id: "ai", name: "AI" }));
    return out;
  }

  window.Fun = {
    state, save, award, afterTest, rankFor, BADGES, verdict, result, toast, confetti, boot, allFacts,
    best(game, score) {
      if (score > (state.best[game] || 0)) { state.best[game] = score; save(); return true; }
      return false;
    },
    load(data) { state = Object.assign({ badges: {}, best: {}, cards: 0 }, data); save(); window.Fun.state = state; },
    reset() { state = load(); state.badges = {}; state.best = {}; state.cards = 0; save(); window.Fun.state = state; },
  };
})();
