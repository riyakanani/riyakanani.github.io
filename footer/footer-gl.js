/* Footer scene: a flat 2D pixel skyline (1 world unit = one 16px block, orthographic camera)
   with Riya's layered "rainbow woman". Only she has depth: her five colour layers are flat
   cut-outs stacked in 3D, so they slide apart when she turns, gets startled, or follows the
   mouse. She keeps just out of reach of the cursor and hops away when it gets too close. */
(function () {
  var footer = document.querySelector(".site-footer");
  var stage = footer && footer.querySelector(".footer-stage");
  if (!footer || !stage || !window.THREE || stage.dataset.ready) return;
  stage.dataset.ready = "1";
  var base = window.__footerBase || "";
  var T = THREE;

  var renderer;
  try { renderer = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" }); }
  catch (e) { return; }
  if (!renderer.getContext()) return;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  stage.appendChild(renderer.domElement);
  footer.classList.add("gl-on");

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var BLOCK = 16;                                   // px per world unit
  var scene = new T.Scene();
  var camera = new T.OrthographicCamera(-10, 10, 10, 0, -50, 50);
  camera.position.set(0, 0, 10);

  var dark = footer.classList.contains("on-dark");             // black pages get a cream skyline
  var BLACK = dark ? 0xfdf5e6 : 0x111111;
  var ACC = [0xf5b452, 0x86b2ab, 0xa8728c, 0x6c724b, dark ? 0x111111 : 0xfdf5e6];
  var N = 161, X0 = -80;                            // columns cover very wide screens
  var heights = [];
  for (var i = 0; i < N; i++) {
    var v = Math.sin(i * 0.71) + Math.sin(i * 0.23 + 1.3) * 0.9 + Math.sin(i * 1.9) * 0.35;
    heights.push(1 + Math.max(0, Math.min(3, Math.floor((v + 2.2) * 0.75))));
  }
  function groundAt(x) {
    var i = Math.round(x - X0); i = Math.max(0, Math.min(N - 1, i));
    return heights[i];
  }

  // Flat skyline: one black rectangle per column, a thin coloured strip on top
  var quad = new T.PlaneGeometry(1, 1), m4 = new T.Matrix4(), col = new T.Color();
  var cols = new T.InstancedMesh(quad, new T.MeshBasicMaterial({ color: BLACK }), N);
  var caps = new T.InstancedMesh(quad, new T.MeshBasicMaterial({ color: 0xffffff }), N);
  for (var j = 0; j < N; j++) {
    var h = heights[j];
    m4.makeScale(1.002, h, 1).setPosition(X0 + j, h / 2, 0); cols.setMatrixAt(j, m4);
    m4.makeScale(1.002, 0.25, 1).setPosition(X0 + j, h - 0.125, 0.01); caps.setMatrixAt(j, m4);
    caps.setColorAt(j, col.setHex(ACC[(j * 3) % ACC.length]));
  }
  scene.add(cols); scene.add(caps);

  // Floating pixels that bob in whole-pixel steps
  var floaters = [];
  for (var f = 0; f < 26; f++) {
    var px = new T.Mesh(quad, new T.MeshBasicMaterial({ color: ACC[f % 4] }));
    var fi = Math.floor(Math.random() * N);
    px.position.set(X0 + fi, heights[fi] + 3 + Math.floor(Math.random() * 6), -0.5);
    px.userData = { y: px.position.y, p: Math.random() * 6.28, s: 0.6 + Math.random() * 0.8 };
    scene.add(px); floaters.push(px);
  }

  // The character: five flat colour layers (magenta at the back, purple in front)
  var HW = 9.6, HH = HW * 498 / 873, hero = new T.Group(), body = new T.Group(), layers = [], face = 1;
  hero.add(body); body.position.y = HH / 2;
  var manager = new T.LoadingManager(function () { renderer.render(scene, camera); });
  var loader = new T.TextureLoader(manager);
  for (var k = 0; k < 5; k++) {
    var tex = loader.load(base + "footer/bent_layer" + k + ".png");
    tex.anisotropy = 4;
    var plane = new T.Mesh(new T.PlaneGeometry(HW, HH),
      new T.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false, side: T.DoubleSide }));
    plane.renderOrder = 10 + k;
    body.add(plane); layers.push(plane);
  }
  hero.position.z = 1;
  scene.add(hero);

  // Pixel burst particles for take-offs and landings
  var bits = [];
  for (var b = 0; b < 36; b++) {
    var bit = new T.Mesh(quad, new T.MeshBasicMaterial({ color: ACC[b % ACC.length], transparent: true }));
    bit.scale.set(0.5, 0.5, 1); bit.visible = false; bit.position.z = 2;
    bit.userData = { vx: 0, vy: 0, life: 0, x: 0, y: 0 };
    scene.add(bit); bits.push(bit);
  }
  var nextBit = 0;
  function burst(x, y, n, power) {
    for (var i = 0; i < n; i++) {
      var bt = bits[nextBit++ % bits.length], u = bt.userData;
      u.x = x + (Math.random() - 0.5) * HW * 0.6; u.y = y + 0.3;
      u.vx = (Math.random() - 0.5) * 16 * power; u.vy = (4 + Math.random() * 12) * power;
      u.life = 0.6 + Math.random() * 0.5; bt.visible = true;
    }
  }

  var S = { x: 0, y: 0, vx: 0, vy: 0, ground: true, spread: 0.5, spreadT: 0.5, look: 0,
            spin: 0, cool: 0, wanderX: 0, wanderWait: 1, t: 0, flip: 0, flipDir: 1, stretch: 0, squash: 0 };
  var mouse = { inside: false, nx: 0, wx: 0, lastWx: 0 };
  var halfW = 20, topY = 16;

  function resize() {
    var w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    halfW = w / BLOCK / 2; topY = h / BLOCK;
    camera.left = -halfW; camera.right = halfW; camera.top = topY; camera.bottom = 0;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);

  function pointer(cx, cy) {
    var r = stage.getBoundingClientRect();
    // the playing field is just the strip above the black footer bar
    mouse.inside = cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom;
    mouse.nx = ((cx - r.left) / r.width) * 2 - 1;
    mouse.wx = (cx - r.left) / BLOCK - halfW;
  }
  window.addEventListener("mousemove", function (e) { pointer(e.clientX, e.clientY); }, { passive: true });
  window.addEventListener("touchmove", function (e) {
    if (e.touches[0]) pointer(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  function onHero(cx, cy) {
    var r = stage.getBoundingClientRect();
    var wx = (cx - r.left) / BLOCK - halfW, wy = (r.bottom - cy) / BLOCK;
    return Math.abs(wx - S.x) < HW * 0.45 && wy > S.y && wy < S.y + HH;
  }
  stage.addEventListener("mousemove", function (e) { stage.style.cursor = onHero(e.clientX, e.clientY) ? "pointer" : ""; });
  stage.addEventListener("click", function (e) {
    if (onHero(e.clientX, e.clientY)) { S.spin = 1; S.spreadT = 5; if (S.ground) { S.vy = 14; S.ground = false; } }
  });

  var G = 60;
  function jump(height) { if (S.ground) { S.vy = Math.sqrt(2 * G * height); S.ground = false; } }
  function escape(dir, height, speed) {                       // the big getaway leap
    if (!S.ground) return;
    jump(height); S.vx = dir * speed;
    S.spreadT = 7; S.stretch = 1; S.cool = 1.1; S.escaping = true;
    if (!reduce) { S.flip = 1; S.flipDir = dir; }
    burst(S.x, S.y, 16, 1);
  }

  function step(dt) {
    S.t += dt; S.cool -= dt;
    var lim = halfW - HW * 0.45;
    var dx = mouse.wx - S.x, dist = Math.abs(dx), dir = dx > 0 ? 1 : -1;
    var mSpeed = Math.abs(mouse.wx - mouse.lastWx) / Math.max(dt, 1e-3); mouse.lastWx = mouse.wx;
    var targetV = 0, lookT = 0;

    if (mouse.inside && !reduce) {
      lookT = Math.max(-1, Math.min(1, dx * 0.12));
      if (dist < 3) {                                                // too close: run
        var cornered = (S.x <= -lim + 1 && dir < 0) || (S.x >= lim - 1 && dir > 0);
        if (cornered) { targetV = dir * 24; if (S.cool <= 0) escape(dir, 9, 24); }
        else { targetV = -dir * 20; if (S.cool <= 0) escape(-dir, 6.5, 20); }
      } else if (dist > 6) {                                         // curious: come closer
        targetV = dir * Math.min(9, 2.5 + dist * 0.6);
      } else {                                                       // tease: hover out of reach
        targetV = Math.sin(S.t * 2.2) * 1.2;
        if (mSpeed > 45 && S.cool <= 0) { jump(1.5); S.cool = 0.5; S.spreadT = 2; }
      }
    } else {                                                         // mouse outside the field: stay put
      lookT = 0;
    }

    if (S.escaping && !S.ground) targetV = S.vx;                    // commit to the getaway until she lands
    S.vx += (targetV - S.vx) * Math.min(1, dt * (S.ground ? 8 : 3));
    S.x += S.vx * dt;
    if (S.x < -lim || S.x > lim) { S.x = Math.max(-lim, Math.min(lim, S.x)); S.vx = 0; }

    var g = groundAt(S.x);
    if (S.ground && g > S.y + 0.05) jump(g - S.y + 0.4);             // hop up a step
    S.vy -= G * dt; S.y += S.vy * dt;
    if (S.y + HH > topY - 0.3) { S.y = Math.max(g, topY - 0.3 - HH); if (S.vy > 0) S.vy = 0; }
    if (S.y <= g) {
      if (!S.ground && S.vy < -14) { S.squash = 1; burst(S.x, g, 8, 0.6); }
      S.y = g; S.vy = 0; S.ground = true; S.escaping = false;
    } else if (S.y > g + 0.02) S.ground = false;

    S.spread += (S.spreadT - S.spread) * Math.min(1, dt * 7);
    S.spreadT += (0.5 - S.spreadT) * Math.min(1, dt * 1.6);
    S.look += (lookT - S.look) * Math.min(1, dt * 5);
    if (S.spin > 0) S.spin = Math.max(0, S.spin - dt * 1.4);
    if (S.flip > 0) S.flip = Math.max(0, S.flip - dt * 1.25);
    if (S.ground && S.flip > 0) S.flip = 0;
    S.stretch = Math.max(0, S.stretch - dt * 3.5);
    S.squash = Math.max(0, S.squash - dt * 6);

    var walking = S.ground && Math.abs(S.vx) > 0.8;
    var bob = walking ? (Math.sin(S.t * 14) > 0 ? 0.25 : 0) : 0;      // two-frame pixel bob
    hero.position.x = S.x; hero.position.y = S.y + bob;
    // her head is on the left of the artwork: mirror her to face where she's going (or the mouse)
    var want = Math.abs(S.vx) > 0.8 ? (S.vx > 0 ? -1 : 1) : (mouse.inside ? (dx > 0 ? -1 : 1) : face);
    face += (want - face) * Math.min(1, dt * 10);
    hero.scale.x = Math.abs(face) < 0.08 ? 0.08 * (face < 0 ? -1 : 1) : face;
    hero.rotation.y = S.look * 0.45 + (S.spin > 0 ? (1 - S.spin) * Math.PI * 2 : 0);
    hero.rotation.z = S.flip > 0 ? 0 : -S.vx * 0.008;
    // flip: a full somersault in the direction she's fleeing
    var e = 1 - S.flip, eased = e * e * (3 - 2 * e);
    body.rotation.z = S.flip > 0 ? eased * Math.PI * 2 * (S.flipDir < 0 ? 1 : -1) * (hero.scale.x < 0 ? -1 : 1) : 0;
    // stretch on take-off, squash on landing (feet stay planted)
    var sy = 1 + 0.35 * S.stretch - 0.28 * S.squash, sx = 1 - 0.2 * S.stretch + 0.22 * S.squash;
    body.scale.set(sx, sy, 1);
    body.position.y = HH / 2 * sy;
    var par = mouse.inside ? mouse.nx : 0;
    for (var k = 0; k < 5; k++) {
      var p = layers[k], d = k - 2;
      p.position.z = k * S.spread;
      // layers trail behind when moving and drift with the mouse, like the offset copies in the artwork
      p.position.x = (-S.vx * 0.03 * (4 - k) + d * par * 0.35) * (face < 0 ? -1 : 1);
      p.position.y = S.ground ? 0 : -S.vy * 0.02 * (4 - k);
    }
    for (var bi = 0; bi < bits.length; bi++) {
      var bt = bits[bi], bu = bt.userData;
      if (!bt.visible) continue;
      bu.life -= dt; if (bu.life <= 0) { bt.visible = false; continue; }
      bu.vy -= 40 * dt; bu.x += bu.vx * dt; bu.y += bu.vy * dt;
      bt.position.x = Math.round(bu.x * 4) / 4; bt.position.y = Math.round(bu.y * 4) / 4;   // snap to pixels
      bt.material.opacity = Math.min(1, bu.life * 3);
    }
    for (var f = 0; f < floaters.length; f++) {
      var c = floaters[f], u = c.userData;
      c.position.y = u.y + (reduce ? 0 : Math.round(Math.sin(S.t * u.s + u.p) * 2) * 0.25);
    }
  }

  var clock = new T.Clock(), visible = true, running = false;
  function frame() {
    if (!visible || document.hidden) { running = false; return; }
    running = true;
    step(Math.min(0.05, clock.getDelta()));
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  function start() { if (!running) { clock.getDelta(); requestAnimationFrame(frame); } }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible) start(); }, { rootMargin: "100px" })
      .observe(stage);
  }
  document.addEventListener("visibilitychange", function () { if (!document.hidden) start(); });

  resize();
  S.y = groundAt(0);
  step(0.016); renderer.render(scene, camera);
  start();
  window.__footerGL = { step: step, render: function () { renderer.render(scene, camera); }, S: S, mouse: mouse, pointer: pointer };
})();
