/* Homepage title: "HIGHLIGHTED WORKS" in 3D pixel blocks. It holds, turns around to show
   "RIYA KANANI" on the back, holds, and turns back. Falls back to the plain <h2>. */
(function () {
  var wrap = document.getElementById("titleGL");
  if (!wrap) return;

  function loadThree(cb) {
    if (window.THREE) return cb();
    if (!window.__threeWaiters) {
      window.__threeWaiters = [];
      var s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
      s.onload = function () { window.__threeWaiters.forEach(function (f) { f(); }); };
      document.head.appendChild(s);
    }
    window.__threeWaiters.push(cb);
  }

  // 5x7 pixel font (only the letters we need)
  var FONT = {
    A: ["01110","10001","10001","11111","10001","10001","10001"],
    D: ["11110","10001","10001","10001","10001","10001","11110"],
    E: ["11111","10000","10000","11110","10000","10000","11111"],
    G: ["01111","10000","10000","10111","10001","10001","01111"],
    H: ["10001","10001","10001","11111","10001","10001","10001"],
    I: ["11111","00100","00100","00100","00100","00100","11111"],
    K: ["10001","10010","10100","11000","10100","10010","10001"],
    L: ["10000","10000","10000","10000","10000","10000","11111"],
    N: ["10001","11001","10101","10011","10001","10001","10001"],
    O: ["01110","10001","10001","10001","10001","10001","01110"],
    R: ["11110","10001","10001","11110","10100","10010","10001"],
    S: ["01111","10000","10000","01110","00001","00001","11110"],
    T: ["11111","00100","00100","00100","00100","00100","00100"],
    W: ["10001","10001","10001","10101","10101","10101","01010"],
    Y: ["10001","10001","01010","00100","00100","00100","00100"],
    " ": ["000","000","000","000","000","000","000"]
  };
  var ACC = [0xf5b452, 0x86b2ab, 0xa8728c, 0x6c724b];

  // returns [{x, y, letter}] voxels for lines of text, centred on 0,0
  function layout(lines) {
    var vox = [], LH = 9, widths = [], li = 0;
    lines.forEach(function (line) {
      var w = 0;
      for (var i = 0; i < line.length; i++) w += FONT[line[i]][0].length + (i < line.length - 1 ? 1 : 0);
      widths.push(w);
    });
    var totalH = lines.length * 7 + (lines.length - 1) * (LH - 7), maxW = Math.max.apply(null, widths);
    lines.forEach(function (line, row) {
      var cx = -widths[row] / 2, top = totalH / 2 - row * LH;
      for (var i = 0; i < line.length; i++) {
        var g = FONT[line[i]];
        if (line[i] !== " ") {
          for (var y = 0; y < 7; y++) for (var x = 0; x < g[y].length; x++)
            if (g[y][x] === "1") vox.push({ x: cx + x + 0.5, y: top - y - 0.5, letter: li });
          li++;
        }
        cx += g[0].length + 1;
      }
    });
    return { vox: vox, w: maxW, h: totalH };
  }

  loadThree(function () {
    var T = THREE, renderer;
    try { renderer = new T.WebGLRenderer({ antialias: true, alpha: true }); } catch (e) { return; }
    if (!renderer.getContext()) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0, 0);
    wrap.appendChild(renderer.domElement);
    wrap.classList.add("on");

    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var scene = new T.Scene();
    var camera = new T.PerspectiveCamera(7, 1, 1, 5000);
    scene.add(new T.AmbientLight(0xffffff, 0.75));
    var sun = new T.DirectionalLight(0xffffff, 0.5); sun.position.set(0.4, 1, 1); scene.add(sun);

    var sign = new T.Group(); scene.add(sign);
    var DEPTH = 2.2;
    var box = new T.BoxGeometry(1, 1, DEPTH);
    // faces: +x, -x, +y, -y, +z (front), -z (back). Sides take each letter's colour, faces stay black.
    var mats = [0, 0, 0, 0].map(function () { return new T.MeshLambertMaterial({ color: 0xffffff }); })
      .concat([new T.MeshBasicMaterial({ color: 0x111111 }), new T.MeshBasicMaterial({ color: 0x111111 })]);

    var front, back, dims = { w: 1, h: 1 }, mode = "";
    function build(lines, flip) {
      var L = layout(lines), mesh = new T.InstancedMesh(box, mats, L.vox.length), m = new T.Matrix4(), c = new T.Color();
      L.vox.forEach(function (v, i) {
        m.makeTranslation(v.x, v.y, 0); mesh.setMatrixAt(i, m);
        mesh.setColorAt(i, c.setHex(ACC[v.letter % ACC.length]));
      });
      var g = new T.Group(); g.add(mesh);
      if (flip) g.rotation.y = Math.PI;          // back text reads correctly once the sign has turned
      sign.add(g);
      return { group: g, w: L.w, h: L.h };
    }
    function rebuild() {
      var narrow = wrap.clientWidth < 620, want = narrow ? "narrow" : "wide";
      if (want === mode) return;
      mode = want;
      if (front) { sign.remove(front.group); sign.remove(back.group); }
      front = build(narrow ? ["HIGHLIGHTED", "WORKS"] : ["HIGHLIGHTED WORKS"], false);
      back = build(narrow ? ["RIYA", "KANANI"] : ["RIYA KANANI"], true);
      dims = { w: Math.max(front.w, back.w), h: Math.max(front.h, back.h) };
    }
    function resize() {
      var w = wrap.clientWidth, h = wrap.clientHeight;
      if (!w || !h) return;
      rebuild();
      renderer.setSize(w, h, false);
      camera.aspect = w / h; camera.updateProjectionMatrix();
      var t = Math.tan(T.MathUtils.degToRad(camera.fov / 2));
      // size by height (like a normal heading), but always leave room for "View all work" on the right
      var reserve = mode === "narrow" ? 40 : 380;
      var targetPx = mode === "narrow" ? 40 : 24;                    // height of the lettering in px
      var ppu = Math.min(targetPx / dims.h, Math.max(1, (w - reserve) / dims.w));   // pixels per block
      camera.position.set(0, 0, h / (ppu * 2 * t) + DEPTH);
      camera.lookAt(0, 0, 0);
      draw();
    }

    // Timeline (seconds): hold front, turn, hold back, turn back
    var HOLD_FRONT = 3.2, HOLD_BACK = 2.6, TURN = 1.0, CYCLE = HOLD_FRONT + TURN + HOLD_BACK + TURN;
    function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }
    function angleAt(t) {
      t = t % CYCLE;
      if (t < HOLD_FRONT) return 0;
      t -= HOLD_FRONT;
      if (t < TURN) return Math.PI * ease(t / TURN);
      t -= TURN;
      if (t < HOLD_BACK) return Math.PI;
      t -= HOLD_BACK;
      return Math.PI + Math.PI * ease(t / TURN);   // keep turning the same way, back to the front
    }

    // Mouse-controlled flip: moving the mouse sideways turns the sign; when the mouse stops,
    // it settles on whichever side (HIGHLIGHTED WORKS / RIYA KANANI) is closest.
    // Touch screens (no mouse) fall back to a gentle automatic flip.
    var canHover = window.matchMedia && window.matchMedia("(hover: hover)").matches;
    var M = { angle: 0, target: 0, vel: 0, lastX: null, lastMove: 0, tiltX: 0, tiltXT: 0, lastT: 0,
              inZone: false, lastFlip: performance.now() };
    var AUTO_FLIP_MS = 7000;   // when the mouse isn't on the title row, flip on its own every 7 seconds
    // Only the title row reacts: the strip above the works grid, across the section's width.
    var header = wrap.parentElement, grid = document.querySelector(".works-grid");
    function inZone(x, y) {
      var h = header.getBoundingClientRect(), gTop = grid ? grid.getBoundingClientRect().top : h.bottom;
      return x >= h.left && x <= h.right && y >= h.top - 30 && y <= gTop;
    }
    window.addEventListener("mousemove", function (e) {
      if (!inZone(e.clientX, e.clientY)) {
        if (M.inZone) M.lastFlip = performance.now();   // start the 7s count from when the mouse leaves
        M.inZone = false; M.lastX = null; M.tiltXT = 0; return;
      }
      M.inZone = true;
      if (M.lastX !== null) M.target += Math.max(-40, Math.min(40, e.clientX - M.lastX)) * 0.006;
      M.lastX = e.clientX; M.lastMove = performance.now();
      var r = wrap.getBoundingClientRect();
      M.tiltXT = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / 60)) * 0.12;
    }, { passive: true });
    var t0 = performance.now(), visible = true, running = false;
    function draw(now) {
      var nowT = now || performance.now(), dt = Math.min(0.05, (nowT - (M.lastT || nowT)) / 1000); M.lastT = nowT;
      var a;
      if (!reduce) {
        if (nowT - M.lastMove > 220) M.target = Math.round(M.target / Math.PI) * Math.PI;   // settle on a readable side
        if (!M.inZone && nowT - M.lastFlip > AUTO_FLIP_MS) { M.target += Math.PI; M.lastFlip = nowT; }
        M.vel += (40 * (M.target - M.angle) - 11 * M.vel) * dt;                             // springy follow
        M.angle += M.vel * dt;
        a = M.angle;
      } else {
        a = angleAt(reduce ? 0 : (nowT - t0) / 1000);
      }
      M.tiltX += (M.tiltXT - M.tiltX) * 0.08;
      sign.rotation.y = a;
      sign.rotation.x = M.tiltX;
      // show whichever side faces the viewer (no letters peeking through from behind)
      var facingFront = Math.cos(a) > 0;
      front.group.visible = facingFront; back.group.visible = !facingFront;
      renderer.render(scene, camera);
    }
    function frame(now) {
      if (!visible || document.hidden) { running = false; return; }
      running = true; draw(now); requestAnimationFrame(frame);
    }
    function start() { if (!running) requestAnimationFrame(frame); }
    if ("IntersectionObserver" in window)
      new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible) start(); }).observe(wrap);
    document.addEventListener("visibilitychange", function () { if (!document.hidden) start(); });
    window.addEventListener("resize", resize);
    resize();
    start();
    window.__titleGL = { draw: draw, angleAt: angleAt, t0: function () { return t0; } };
  });
})();
