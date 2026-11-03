/* Code Through Time — trainer.js
 * "Train a neural network in your browser": a tiny 2-input network (optional hidden layer of tanh
 * neurons, sigmoid output) trained with full-batch gradient descent on binary cross-entropy.
 * Exposes window.Trainer = { mount(root), stop() }.
 */
(() => {
  "use strict";

  let raf = null;
  const stop = () => { if (raf) cancelAnimationFrame(raf); raf = null; };

  /* ───────── datasets (points in [-1, 1]²) ───────── */
  const rnd = (a = -1, b = 1) => a + Math.random() * (b - a);
  const gauss = () => { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
  const DATASETS = {
    blobs: () => Array.from({ length: 80 }, (_, i) => {
      const c = i % 2;
      return { x: (c ? .45 : -.45) + gauss() * .22, y: (c ? .35 : -.35) + gauss() * .22, c };
    }),
    xor: () => Array.from({ length: 120 }, () => {
      const x = rnd(), y = rnd();
      return { x: x + (x > 0 ? .06 : -.06), y: y + (y > 0 ? .06 : -.06), c: (x > 0) === (y > 0) ? 1 : 0 };
    }),
    circle: () => Array.from({ length: 140 }, (_, i) => {
      const c = i % 2, r = c ? rnd(0, .38) : rnd(.6, .95), a = rnd(0, Math.PI * 2);
      return { x: Math.cos(a) * r, y: Math.sin(a) * r, c };
    }),
  };

  /* ───────── the model ───────── */
  function makeModel(H) {
    const r = () => (Math.random() * 2 - 1) * (H ? 1 : .3);
    return {
      H,
      W1: Array.from({ length: H }, () => [r(), r()]),
      b1: Array.from({ length: H }, () => r() * .5),
      w2: H ? Array.from({ length: H }, () => r()) : [r(), r()],
      b2: 0,
    };
  }
  const sigmoid = (z) => 1 / (1 + Math.exp(-z));

  function forward(m, x, y) {
    if (!m.H) return { p: sigmoid(m.w2[0] * x + m.w2[1] * y + m.b2), a: null };
    const a = m.W1.map((w, j) => Math.tanh(w[0] * x + w[1] * y + m.b1[j]));
    let z = m.b2;
    for (let j = 0; j < m.H; j++) z += m.w2[j] * a[j];
    return { p: sigmoid(z), a };
  }

  // One step of full-batch gradient descent. Returns { loss, acc }.
  function step(m, data, lr) {
    const H = m.H, n = data.length;
    const gW1 = Array.from({ length: H }, () => [0, 0]), gb1 = new Array(H).fill(0);
    const gw2 = new Array(H || 2).fill(0);
    let gb2 = 0, loss = 0, correct = 0;
    for (const pt of data) {
      const { p, a } = forward(m, pt.x, pt.y);
      const pc = Math.min(Math.max(p, 1e-7), 1 - 1e-7);
      loss += -(pt.c * Math.log(pc) + (1 - pt.c) * Math.log(1 - pc));
      if ((p > .5 ? 1 : 0) === pt.c) correct++;
      const dz2 = p - pt.c;                    // derivative of BCE through the sigmoid
      gb2 += dz2;
      if (!H) { gw2[0] += dz2 * pt.x; gw2[1] += dz2 * pt.y; continue; }
      for (let j = 0; j < H; j++) {
        gw2[j] += dz2 * a[j];
        const dz1 = dz2 * m.w2[j] * (1 - a[j] * a[j]);   // backprop through tanh
        gW1[j][0] += dz1 * pt.x; gW1[j][1] += dz1 * pt.y; gb1[j] += dz1;
      }
    }
    m.b2 -= lr * gb2 / n;
    for (let j = 0; j < gw2.length; j++) m.w2[j] -= lr * gw2[j] / n;
    for (let j = 0; j < H; j++) {
      m.W1[j][0] -= lr * gW1[j][0] / n; m.W1[j][1] -= lr * gW1[j][1] / n; m.b1[j] -= lr * gb1[j] / n;
    }
    return { loss: loss / n, acc: correct / n };
  }

  /* ───────── UI ───────── */
  function mount(root) {
    stop();
    root.innerHTML = `
      <div class="trainer">
        <div class="tr-stage">
          <canvas class="tr-canvas" width="360" height="360" aria-label="Training data and the network's decision boundary. Click to add points."></canvas>
          <p class="note">Click the chart to add <b class="tr-dot0">●</b>/<b class="tr-dot1">●</b> points (choose the colour below).</p>
        </div>
        <div class="tr-panel">
          <div class="tr-row" role="group" aria-label="Dataset">
            <span class="tr-label">Data</span>
            <button type="button" class="chip" data-set="blobs">Two blobs</button>
            <button type="button" class="chip" data-set="xor">XOR</button>
            <button type="button" class="chip" data-set="circle">Circle</button>
            <button type="button" class="chip" data-set="clear">Clear</button>
          </div>
          <div class="tr-row" role="group" aria-label="Point colour">
            <span class="tr-label">Add</span>
            <button type="button" class="chip on" data-class="0"><b class="tr-dot0">●</b> Purple</button>
            <button type="button" class="chip" data-class="1"><b class="tr-dot1">●</b> Cyan</button>
          </div>
          <label class="tr-slider"><span class="tr-label">Hidden neurons <b data-out="H">4</b></span>
            <input type="range" min="0" max="16" value="4" data-in="H"></label>
          <label class="tr-slider"><span class="tr-label">Learning rate <b data-out="lr">0.30</b></span>
            <input type="range" min="1" max="100" value="30" data-in="lr"></label>
          <div class="tr-row">
            <button type="button" class="btn" data-act="train">Train</button>
            <button type="button" class="btn btn-ghost" data-act="reset">Reset weights</button>
          </div>
          <dl class="tr-stats">
            <div><dt>Epoch</dt><dd data-stat="epoch">0</dd></div>
            <div><dt>Loss</dt><dd data-stat="loss">—</dd></div>
            <div><dt>Accuracy</dt><dd data-stat="acc">—</dd></div>
          </dl>
          <canvas class="tr-loss" width="300" height="70" aria-label="Loss over time"></canvas>
          <p class="note tr-tip"></p>
        </div>
      </div>`;

    const canvas = root.querySelector(".tr-canvas");
    const ctx = canvas.getContext("2d");
    const lossCanvas = root.querySelector(".tr-loss");
    const lctx = lossCanvas.getContext("2d");
    const $ = (sel) => root.querySelector(sel);
    const C0 = [183, 148, 255], C1 = [45, 226, 230];

    let data = DATASETS.circle();
    let H = 4, lr = .3, addClass = 0, running = false, epoch = 0, history = [];
    let model = makeModel(H);

    const tip = () => {
      const t = $(".tr-tip");
      if (H === 0) t.textContent = "With 0 hidden neurons the network can only draw a straight line. Try XOR or Circle and watch it fail — then add neurons.";
      else if (H < 3) t.textContent = "A couple of neurons can bend the boundary a little. Circle and XOR usually need 3–4 or more.";
      else t.textContent = "Hidden neurons let the network learn curved boundaries. Too high a learning rate makes the loss jump around.";
    };

    const draw = () => {
      const W = canvas.width, N = 36, cell = W / N;
      for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
        const x = (i + .5) / N * 2 - 1, y = 1 - (j + .5) / N * 2;
        const p = forward(model, x, y).p;
        const c = C0.map((v, k) => Math.round(v + (C1[k] - v) * p));
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${.18 + Math.abs(p - .5) * .5})`;
        ctx.fillRect(i * cell, j * cell, cell + 1, cell + 1);
      }
      for (const pt of data) {
        const px = (pt.x + 1) / 2 * W, py = (1 - pt.y) / 2 * W;
        ctx.beginPath(); ctx.arc(px, py, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${(pt.c ? C1 : C0).join(",")})`; ctx.fill();
        ctx.lineWidth = 1.5; ctx.strokeStyle = "#0b0820"; ctx.stroke();
      }
      // loss curve
      lctx.clearRect(0, 0, lossCanvas.width, lossCanvas.height);
      if (history.length > 1) {
        const max = Math.max(...history, .01);
        lctx.beginPath();
        history.forEach((l, k) => {
          const x = k / (history.length - 1) * lossCanvas.width, y = lossCanvas.height - 4 - (l / max) * (lossCanvas.height - 8);
          k ? lctx.lineTo(x, y) : lctx.moveTo(x, y);
        });
        lctx.strokeStyle = "rgb(183,148,255)"; lctx.lineWidth = 2; lctx.stroke();
      }
    };

    const stats = (r) => {
      $('[data-stat="epoch"]').textContent = epoch;
      $('[data-stat="loss"]').textContent = r ? r.loss.toFixed(3) : "—";
      $('[data-stat="acc"]').textContent = r ? Math.round(r.acc * 100) + "%" : "—";
    };

    const loop = () => {
      if (!running || !data.length) { running = false; $('[data-act="train"]').textContent = "Train"; return; }
      let r;
      for (let k = 0; k < 15; k++) { r = step(model, data, lr); epoch++; }
      if (epoch % 30 === 0 || history.length === 0) { history.push(r.loss); if (history.length > 200) history.shift(); }
      stats(r); draw();
      if (r.acc === 1 && r.loss < .05) {
        running = false; $('[data-act="train"]').textContent = "Train";
        if (window.Fun) window.Fun.toast("🧠 Trained!", `100% accuracy after ${epoch} epochs. That’s gradient descent at work.`);
        return;
      }
      raf = requestAnimationFrame(loop);
    };

    const resetModel = () => { model = makeModel(H); epoch = 0; history = []; stats(null); draw(); };

    root.querySelectorAll("[data-set]").forEach((b) => b.addEventListener("click", () => {
      data = b.dataset.set === "clear" ? [] : DATASETS[b.dataset.set]();
      resetModel();
    }));
    root.querySelectorAll("[data-class]").forEach((b) => b.addEventListener("click", () => {
      addClass = Number(b.dataset.class);
      root.querySelectorAll("[data-class]").forEach((x) => x.classList.toggle("on", x === b));
    }));
    $('[data-in="H"]').addEventListener("input", (e) => { H = Number(e.target.value); $('[data-out="H"]').textContent = H; tip(); resetModel(); });
    $('[data-in="lr"]').addEventListener("input", (e) => { lr = Number(e.target.value) / 100; $('[data-out="lr"]').textContent = lr.toFixed(2); });
    $('[data-act="train"]').addEventListener("click", (e) => {
      running = !running;
      e.target.textContent = running ? "Pause" : "Train";
      if (running) loop();
    });
    $('[data-act="reset"]').addEventListener("click", resetModel);
    canvas.addEventListener("click", (e) => {
      const r = canvas.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width * 2 - 1, y = 1 - (e.clientY - r.top) / r.height * 2;
      data.push({ x, y, c: addClass });
      draw();
    });

    tip(); draw();
  }

  window.Trainer = { mount, stop };
})();
