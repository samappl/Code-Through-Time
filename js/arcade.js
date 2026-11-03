/* Code Through Time — arcade.js
 * Three mini-games, each dressed in its era:
 *   1. Punch card maker  (1950s, IBM 029 card codes)
 *   2. Snake             (1997, Nokia-style LCD)
 *   3. Guess the language (60-second speed round using every code sample on the site)
 * Exposes window.Arcade = { render(app, helpers), stop() }.
 */
(() => {
  "use strict";

  const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  let cleanups = [];
  const stop = () => { cleanups.forEach((fn) => fn()); cleanups = []; };

  /* ════════ 1. PUNCH CARD ════════ */
  // Hollerith punch codes (IBM 029 / EBCDIC). Rows are 12, 11, 0–9.
  function holes(ch) {
    const c = ch.toUpperCase();
    if (c === " ") return [];
    if (c >= "0" && c <= "9") return [Number(c)];
    const code = c.charCodeAt(0);
    if (c >= "A" && c <= "I") return [12, code - 64];
    if (c >= "J" && c <= "R") return [11, code - 73];
    if (c >= "S" && c <= "Z") return [0, code - 81];
    const special = {
      "&": [12], "-": [11], "/": [0, 1],
      "¢": [12, 2, 8], ".": [12, 3, 8], "<": [12, 4, 8], "(": [12, 5, 8], "+": [12, 6, 8], "|": [12, 7, 8],
      "!": [11, 2, 8], "$": [11, 3, 8], "*": [11, 4, 8], ")": [11, 5, 8], ";": [11, 6, 8], "¬": [11, 7, 8],
      ",": [0, 3, 8], "%": [0, 4, 8], "_": [0, 5, 8], ">": [0, 6, 8], "?": [0, 7, 8],
      ":": [2, 8], "#": [3, 8], "@": [4, 8], "'": [5, 8], "=": [6, 8], "\"": [7, 8],
    };
    return special[c] || null;      // null = the 029 keypunch can't punch it
  }

  function cardSVG(text) {
    const ROWS = [12, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const colW = 8.6, x0 = 26, y0 = 44, rowH = 19;
    const W = x0 * 2 + colW * 80, H = y0 + rowH * 12 + 22;
    const chars = text.padEnd(80, " ").slice(0, 80).split("");
    let out = `<svg class="card" viewBox="0 0 ${W} ${H}" role="img" aria-label="Punch card reading: ${esc(text)}">`;
    out += `<path d="M18 0 H${W} V${H} H0 V18 Z" class="card-paper"/>`;
    out += `<text x="${x0}" y="${H - 6}" class="card-label">CODE THROUGH TIME · FORTRAN STATEMENT · 80 COLUMNS</text>`;
    chars.forEach((ch, col) => {
      const x = x0 + col * colW;
      const punched = holes(ch) || [];
      if (ch !== " ") out += `<text x="${x + colW / 2}" y="${y0 - 26}" class="card-char">${esc(ch.toUpperCase())}</text>`;
      ROWS.forEach((row, r) => {
        const y = y0 + r * rowH;
        if (punched.includes(row)) {
          out += `<rect x="${x + 1.6}" y="${y - 6}" width="${colW - 3.2}" height="13" class="card-hole"><animate attributeName="opacity" from="0" to="1" dur=".2s" begin="${(col * 0.012).toFixed(3)}s" fill="freeze"/></rect>`;
        } else if (row >= 0 && row <= 9) {
          out += `<text x="${x + colW / 2}" y="${y + 3.5}" class="card-digit">${row}</text>`;
        }
      });
    });
    return out + "</svg>";
  }

  function mountPunch(root) {
    const input = root.querySelector("#punchInput");
    const out = root.querySelector("#punchCard");
    const warn = root.querySelector("#punchWarn");
    const draw = () => {
      const text = input.value.slice(0, 80);
      out.innerHTML = cardSVG(text);
      const bad = [...new Set(text.split("").filter((ch) => holes(ch) === null))];
      warn.textContent = bad.length ? `The 1964 IBM 029 keypunch had no key for: ${bad.join(" ")}` : `${text.length}/80 columns used`;
    };
    input.addEventListener("input", draw);
    root.querySelector("#punchGo").addEventListener("click", () => {
      draw();
      window.Fun.state.cards = (window.Fun.state.cards || 0) + 1;
      window.Fun.save();
      window.Fun.award("keypunch");
      window.Fun.toast("🕳️ Card punched", "One line of code = one card. A 1,000-line program was a box of 1,000 cards.");
    });
    draw();
  }

  /* ════════ 2. SNAKE ════════ */
  function mountSnake(root) {
    const canvas = root.querySelector("#snake");
    const ctx = canvas.getContext("2d");
    const COLS = 21, ROWS = 15, CELL = 14;
    canvas.width = COLS * CELL; canvas.height = ROWS * CELL;
    const LCD = "#c7f0d8", INK = "#43523d";
    const scoreEl = root.querySelector("#snakeScore");
    const bestEl = root.querySelector("#snakeBest");
    let snake, dir, nextDir, food, score, timer = null, alive = false, speed;

    const best = () => (window.Fun.state.best.snake || 0);
    bestEl.textContent = best();

    const place = () => {
      do { food = { x: (Math.random() * COLS) | 0, y: (Math.random() * ROWS) | 0 }; }
      while (snake.some((s) => s.x === food.x && s.y === food.y));
    };
    const cell = (x, y, inset = 1) => ctx.fillRect(x * CELL + inset, y * CELL + inset, CELL - inset * 2, CELL - inset * 2);
    const draw = (msg) => {
      ctx.fillStyle = LCD; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = INK;
      if (snake) {
        snake.forEach((s) => cell(s.x, s.y));
        if (food) { cell(food.x, food.y, 4); }
      }
      if (msg) {
        ctx.fillStyle = INK; ctx.textAlign = "center";
        ctx.font = "bold 18px monospace"; ctx.fillText(msg[0], canvas.width / 2, canvas.height / 2 - 6);
        ctx.font = "12px monospace"; ctx.fillText(msg[1], canvas.width / 2, canvas.height / 2 + 16);
      }
    };
    const step = () => {
      dir = nextDir;
      const head = { x: (snake[0].x + dir.x + COLS) % COLS, y: (snake[0].y + dir.y + ROWS) % ROWS };
      if (snake.some((s) => s.x === head.x && s.y === head.y)) return over();
      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        score++; scoreEl.textContent = score;
        place();
        if (score % 4 === 0 && speed > 60) { speed -= 10; restartTimer(); }
      } else snake.pop();
      draw();
    };
    const restartTimer = () => { clearInterval(timer); timer = setInterval(step, speed); };
    const over = () => {
      alive = false; clearInterval(timer);
      const rec = window.Fun.best("snake", score);
      bestEl.textContent = best();
      if (score >= 15) window.Fun.award("snake");
      draw(["GAME OVER", rec ? `New best: ${score}!` : `Score ${score} · press Start`]);
    };
    const start = () => {
      snake = [{ x: 10, y: 7 }, { x: 9, y: 7 }, { x: 8, y: 7 }];
      dir = nextDir = { x: 1, y: 0 };
      score = 0; scoreEl.textContent = 0; speed = 130; alive = true;
      place(); draw(); restartTimer();
      canvas.focus({ preventScroll: true });
    };
    const turn = (d) => {
      const map = { up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 } };
      const n = map[d];
      if (!n || !alive) return;
      if (n.x === -dir.x && n.y === -dir.y) return;   // no reversing into yourself
      nextDir = n;
    };
    // Only steer while the game has focus (or nothing else does), so arrow keys still scroll the page otherwise.
    const onKey = (e) => {
      const focus = document.activeElement;
      if (!alive || !(root.contains(focus) || focus === document.body)) return;
      const k = { ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right", w: "up", s: "down", a: "left", d: "right", 2: "up", 8: "down", 4: "left", 6: "right" }[e.key];
      if (k) { e.preventDefault(); turn(k); }
    };
    addEventListener("keydown", onKey);
    root.querySelectorAll("[data-dir]").forEach((b) => b.addEventListener("click", () => turn(b.dataset.dir)));
    let tx = 0, ty = 0;
    canvas.addEventListener("touchstart", (e) => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
    canvas.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 20) return;
      turn(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : (dy > 0 ? "down" : "up"));
    });
    root.querySelector("#snakeStart").addEventListener("click", start);
    snake = null; draw(["SNAKE", "Press Start"]);
    cleanups.push(() => { clearInterval(timer); removeEventListener("keydown", onKey); });
  }

  /* ════════ 3. GUESS THE LANGUAGE ════════ */
  function mountGuess(root, CT, highlight) {
    const ROUND = 60;
    const langs = Object.values(CT.langs).filter((L) => L.examples && L.examples.length);
    const box = root.querySelector("#guessBox");
    const bestEl = root.querySelector("#guessBest");
    bestEl.textContent = window.Fun.state.best.guess || 0;
    let score, streak, timeLeft, timer = null, current;

    // A random example with any line that names the language removed (no free answers!).
    const snippet = (L) => {
      const re = L.name.length >= 3 ? new RegExp(L.name.split(/\W/)[0], "i") : null;
      const options = shuffle(L.examples.map((ex) => {
        const lines = ex.code.split("\n").filter((ln) => !(re && re.test(ln)));
        return lines.slice(0, 12).join("\n").trim();
      }));
      return options.find((s) => s.split("\n").length >= 3) || options[0];
    };
    const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };

    const ask = () => {
      const L = langs[(Math.random() * langs.length) | 0];
      const others = shuffle(langs.filter((x) => x.id !== L.id)).slice(0, 3);
      current = { L, options: shuffle([L, ...others]) };
      box.innerHTML = `
        <div class="guess-top"><span>⏱ <b id="guessTime">${timeLeft}</b>s</span><span>Score <b>${score}</b></span><span>${streak >= 3 ? `🔥 ${streak} in a row` : ""}</span></div>
        <figure class="code"><figcaption><span class="code-title">Which language is this?</span></figcaption>
          <pre><code class="language-${esc(L.prism)}">${esc(snippet(L))}</code></pre></figure>
        <div class="options guess-options">${current.options.map((o, n) =>
          `<button type="button" class="option" data-n="${n}"><span class="opt-key">${"ABCD"[n]}</span><span>${esc(o.name)} <small class="muted">${o.year}</small></span></button>`).join("")}
        </div>`;
      highlight(box);
      box.querySelectorAll(".option").forEach((b) => b.addEventListener("click", () => answer(Number(b.dataset.n), b)));
    };
    const answer = (n, btn) => {
      const right = current.options[n].id === current.L.id;
      box.querySelectorAll(".option").forEach((b, i) => {
        b.disabled = true;
        if (current.options[i].id === current.L.id) b.classList.add("right");
      });
      if (right) { score++; streak++; } else { streak = 0; timeLeft = Math.max(0, timeLeft - 3); btn.classList.add("wrong"); }
      setTimeout(() => { if (timeLeft > 0) ask(); }, right ? 350 : 900);
    };
    const end = () => {
      clearInterval(timer);
      const rec = window.Fun.best("guess", score);
      bestEl.textContent = window.Fun.state.best.guess || 0;
      if (score >= 10) window.Fun.award("polyglot");
      box.innerHTML = `<div class="guess-end">
        <p class="result-score">${score} <span>correct</span></p>
        <p>${rec ? "New personal best!" : "Time’s up."} ${score >= 10 ? "You really know your languages." : "Every language page has the examples used here — study up and try again."}</p>
        <button type="button" class="btn" id="guessAgain">Play again</button></div>`;
      box.querySelector("#guessAgain").addEventListener("click", start);
    };
    const start = () => {
      score = 0; streak = 0; timeLeft = ROUND;
      clearInterval(timer);
      timer = setInterval(() => {
        timeLeft--;
        const t = box.querySelector("#guessTime");
        if (t) t.textContent = timeLeft;
        if (timeLeft <= 0) end();
      }, 1000);
      ask();
    };
    root.querySelector("#guessStart").addEventListener("click", start);
    cleanups.push(() => clearInterval(timer));
  }

  /* ════════ page ════════ */
  function render(app, { CT, highlight }) {
    stop();
    app.innerHTML = `
      <section class="page arcade-head" data-theme="pc">
        <h1>Arcade</h1>
        <p class="lede">Three games from three eras. High scores and achievements save in this browser. <span class="insert-coin">INSERT COIN</span></p>
      </section>

      <section class="arcade-game" data-theme="dawn">
        <div class="arcade-inner">
          <h2>Punch card maker <small>1950s–70s</small></h2>
          <p>Before screens, every line of code was punched onto an 80-column card. Type a line and see how an IBM 029 keypunch would encode it: letters use a “zone” punch (12, 11 or 0) plus a digit punch.</p>
          <div class="punch-controls">
            <label for="punchInput" class="sr">Text to punch</label>
            <input id="punchInput" class="fill-input" maxlength="80" value="      PRINT *, 'HELLO, WORLD'" spellcheck="false" autocomplete="off">
            <button type="button" class="btn" id="punchGo">Punch it</button>
          </div>
          <p class="note" id="punchWarn"></p>
          <div class="card-wrap" id="punchCard"></div>
        </div>
      </section>

      <section class="arcade-game" data-theme="web">
        <div class="arcade-inner win" data-title="Snake II — Nokia 6110 (1997)">
          <h2>Snake <small>1997</small></h2>
          <p>Taneli Armanto’s Snake shipped on the Nokia 6110 and became one of the most-played games ever. Arrow keys, WASD or swipe to steer. The edges wrap around. Don’t bite yourself.</p>
          <div class="phone">
            <div class="phone-brand">NOKIA-ish</div>
            <div class="lcd"><canvas id="snake" tabindex="0" aria-label="Snake game"></canvas></div>
            <div class="lcd-stats"><span>Score <b id="snakeScore">0</b></span><span>Best <b id="snakeBest">0</b></span></div>
            <div class="pad">
              <button type="button" data-dir="up" aria-label="Up">2</button>
              <button type="button" data-dir="left" aria-label="Left">4</button>
              <button type="button" id="snakeStart" class="pad-start">Start</button>
              <button type="button" data-dir="right" aria-label="Right">6</button>
              <button type="button" data-dir="down" aria-label="Down">8</button>
            </div>
          </div>
        </div>
      </section>

      <section class="arcade-game" data-theme="platform">
        <div class="arcade-inner win" data-title="Guess the Language — Flash Game of the Day">
          <h2>Guess the language <small>All eras</small></h2>
          <p>A snippet from somewhere in history appears. Pick the language. You have 60 seconds; wrong answers cost 3 seconds. Best score: <b id="guessBest">0</b></p>
          <div id="guessBox"><button type="button" class="btn" id="guessStart">Start the clock</button></div>
        </div>
      </section>`;
    const sections = app.querySelectorAll(".arcade-game");
    mountPunch(sections[0]);
    mountSnake(sections[1]);
    mountGuess(sections[2], CT, highlight);
  }

  window.Arcade = { render, stop };
})();
