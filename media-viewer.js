/* media-viewer.js: click any photo or video on a project page to see it big.
   Same look as the Graphics viewer: dark backdrop, round cream close button,
   black arrows beside the media to step through everything on the page. */
(function () {
  var css = [
    "#projects .mv-item {cursor: zoom-in;}",
    ".mv-box {display: none; position: fixed; inset: 0; z-index: 1000; background: rgba(0,0,0,.9); align-items: center; justify-content: center; padding: 24px;}",
    ".mv-box.open {display: flex;}",
    ".mv-stage {position: relative; display: inline-block; max-width: 100%;}",
    ".mv-stage img, .mv-stage video {display: block; max-width: 100%; max-height: 88vh; border-radius: 16px; background: #000;}",
    ".mv-stage video {width: min(1200px, 90vw); height: auto;}",
    ".mv-stage .mv-prev, .mv-stage .mv-next {position: absolute; top: 50%; transform: translateY(-50%); font-size: 22px; padding: 14px 18px; z-index: 2;}",
    ".mv-stage .mv-prev {left: -64px;} .mv-stage .mv-next {right: -64px;}",
    "@media only screen and (max-width: 700px) {.mv-stage .mv-prev {left: 0;} .mv-stage .mv-next {right: 0;}}",
    "@media only screen and (min-width: 3200px) {.mv-stage img, .mv-stage video {max-height: calc(88vh / 1.5);}}",
    ".mv-close {position: absolute; top: 18px; right: 18px; width: 44px; height: 44px; border-radius: 50%; border: 0; background: #fdf5e6; color: #111; font-size: 24px; line-height: 44px; cursor: pointer;}"
  ].join("\n");
  function init() {
    var items = Array.prototype.slice.call(document.querySelectorAll("#projects img, #projects video"))
      .filter(function (el) { return !el.closest("button, a, .wip-badge"); });
    if (!items.length) return;
    var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
    var box = document.createElement("div");
    box.className = "mv-box"; box.setAttribute("role", "dialog"); box.setAttribute("aria-label", "Media viewer");
    box.innerHTML = '<button type="button" class="mv-close" aria-label="Close">&times;</button>' +
      '<div class="mv-stage"><button class="w3-button w3-black mv-prev" type="button" aria-label="Previous">&#10094;</button>' +
      '<button class="w3-button w3-black mv-next" type="button" aria-label="Next">&#10095;</button></div>';
    document.body.appendChild(box);
    var stage = box.querySelector(".mv-stage"), shown = null, i = 0;
    // only one photo/video on the page: no arrows to step through
    if (items.length < 2) box.querySelectorAll(".mv-prev, .mv-next").forEach(function (b) { b.style.display = "none"; });
    function show(n) {
      i = (n + items.length) % items.length;
      if (shown) shown.remove();
      var src = items[i];
      if (src.tagName === "VIDEO") {
        shown = document.createElement("video");
        shown.src = src.currentSrc || (src.querySelector("source") || {}).src;
        shown.controls = true; shown.autoplay = true; shown.muted = true; shown.loop = true; shown.playsInline = true;
      } else {
        shown = document.createElement("img"); shown.src = src.currentSrc || src.src; shown.alt = src.alt || "";
      }
      stage.insertBefore(shown, stage.querySelector(".mv-next"));
    }
    function shut() { box.classList.remove("open"); if (shown) { shown.remove(); shown = null; } }
    items.forEach(function (el, k) {
      el.classList.add("mv-item");
      el.addEventListener("click", function (e) {
        // on videos, leave clicks on the play/volume bar alone
        if (el.tagName === "VIDEO") { var r = el.getBoundingClientRect(); if (e.clientY > r.bottom - 48) return; e.preventDefault(); }
        show(k); box.classList.add("open");
      });
    });
    box.querySelector(".mv-close").addEventListener("click", shut);
    box.querySelector(".mv-prev").addEventListener("click", function () { show(i - 1); });
    box.querySelector(".mv-next").addEventListener("click", function () { show(i + 1); });
    box.addEventListener("click", function (e) { if (e.target === box) shut(); });
    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("open")) return;
      if (e.key === "Escape") shut();
      if (items.length < 2) return;
      if (e.key === "ArrowLeft") show(i - 1);
      if (e.key === "ArrowRight") show(i + 1);
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
