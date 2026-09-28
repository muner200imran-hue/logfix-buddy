(function () {
  var NAME = "LAST ZONE";
  var CHANNEL = "https://t.me/+Dm8IppPh39s4YWIx";
  var SUPPORT = "https://t.me/monir_i0_0i";
  var BOT = "https://t.me/LZ_LOV_BOT";
  var NAME_RE = /Lovable Zone|LOVABLE ZONE|Lovable zone|LovableZone|\u0644\u0627\u0633\u062a \u0632\u0648\u0646/g;

  var st=document.createElement("style");st.textContent=
  'img[src*="lovable-zone-logo"]{background:transparent!important;padding:0!important;border-radius:0!important;object-fit:contain!important;filter:drop-shadow(0 0 10px rgba(236,72,153,.45)) drop-shadow(0 0 18px rgba(99,102,241,.3));}'+
  'header img[src*="lovable-zone-logo"],nav img[src*="lovable-zone-logo"]{width:40px!important;height:40px!important;}'+
  'a:has(>img[src*="lovable-zone-logo"]){gap:12px!important;align-items:center!important;}'+
  'a:has(>img[src*="lovable-zone-logo"]) span{font-weight:800!important;letter-spacing:.14em!important;font-size:1.15rem!important;line-height:1!important;}'+
  'div.fixed.bottom-5.right-5:has(button[aria-label="Help and support"]){display:none!important;}';
  (document.head||document.documentElement).appendChild(st);
  function hide(el) { if (el && el.style.display !== "none") el.style.setProperty("display", "none", "important"); }

  function apply() {
    var root = document.body;
    if (!root) return;
    // Rename text
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), n;
    while ((n = w.nextNode())) {
      if (NAME_RE.test(n.nodeValue)) {
        NAME_RE.lastIndex = 0;
        if (n.nodeValue.indexOf(NAME) < 0) n.nodeValue = n.nodeValue.replace(NAME_RE, NAME);
        var p = n.parentElement;
        if (p) { p.style.setProperty("color", "#ffffff", "important"); p.style.setProperty("background", "none", "important"); p.style.setProperty("-webkit-text-fill-color", "#ffffff", "important"); }
      }
      NAME_RE.lastIndex = 0;
    }
    document.querySelectorAll("img[alt]").forEach(function (i) { i.alt = i.alt.replace(NAME_RE, NAME); });
    if (NAME_RE.test(document.title)) document.title = document.title.replace(NAME_RE, NAME);
    NAME_RE.lastIndex = 0;

    document.querySelectorAll("a[href]").forEach(function (a) {
      var h = a.getAttribute("href") || "";
      if (/wa\.me|whatsapp|facebook\.com|my-license|reseller/i.test(h)) {
        var li = a.closest("li");
        hide(li && li.children.length === 1 ? li : a);
        return;
      }
      if (/t\.me\//.test(h) && h !== CHANNEL && h !== SUPPORT && h !== BOT) {
        a.setAttribute("href", /support/i.test(a.textContent) ? SUPPORT : CHANNEL);
      }
    });
    // Strip any Arabic characters
    var AR = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]+/g;
    var w2 = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), m;
    while ((m = w2.nextNode())) { if (m.parentElement && m.parentElement.closest('[lang="ar"]')) continue; if (AR.test(m.nodeValue)) { AR.lastIndex = 0; m.nodeValue = m.nodeValue.replace(AR, "").replace(/\s{2,}/g, " "); } AR.lastIndex = 0; }
    // Add Guides link to header nav and footer once
    var nav = document.querySelector("header nav");
    if (nav && !nav.querySelector('a[href="/guides.html"]')) { var g = document.createElement("a"); g.href = "/guides.html"; g.textContent = "Guides"; g.className = (nav.querySelector("a") || {}).className || ""; nav.appendChild(g); }
    var ful = document.querySelector("footer ul");
    if (ful && !ful.querySelector('a[href="/guides.html"]')) { var li = document.createElement("li"); var fa = document.createElement("a"); fa.href = "/guides.html"; fa.textContent = "Guides & Comparisons"; var ref = ful.querySelector("a"); if (ref) fa.className = ref.className; li.appendChild(fa); ful.appendChild(li); }
    // Nav/menu items by label
    document.querySelectorAll("a,button").forEach(function (el) {
      var t = (el.textContent || "").trim();
      if (/^(My License|Reseller|WhatsApp)$/i.test(t)) hide(el);
    });
    // Remove legacy payment details and heading everywhere they appear.
    document.querySelectorAll("body *").forEach(function (el) {
      var text = (el.textContent || "").replace(/\s+/g, " ").trim();
      if (/^(01626900766|\*?\s*Send money from personal bKash only|Pay the way you like)$/i.test(text)) hide(el);
    });
    // Remove testimonials section
    document.querySelectorAll("body *").forEach(function (el) {
      if (el.children.length === 0 && /Local taka or international/i.test(el.textContent)) {
        var s = el.closest("section");
        if (s) hide(s); else { var p = el; for (var k = 0; k < 3 && p.parentElement; k++) p = p.parentElement; hide(p); }
      }
    });
    hide(document.getElementById("payment-methods"));
    document.querySelectorAll("h2").forEach(function (h) {
      if (/Loved by Real Users/i.test(h.textContent)) hide(h.closest("section") || h.parentElement);
    });
  }

  // Package purchase clicks -> bot
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest("a,button");
    if (!t) return;
    var txt = (t.textContent || "").trim();
    var pk = t.closest("#packages") || /^(Buy now|Get started|Order now|Buy)/i.test(txt) ||
      (t.closest("[role=dialog],section,div") && /Lifetime plan|Premium access/i.test(t.parentElement ? t.parentElement.textContent : ""));
    if (pk) { e.preventDefault(); e.stopPropagation(); window.open(BOT, "_blank", "noopener"); }
  }, true);

  var scheduled = false;
  function schedule() { if (scheduled) return; scheduled = true; requestAnimationFrame(function () { scheduled = false; apply(); }); }
  function start() {
    apply();
    new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();
})();

// Keep top bar fixed while scrolling (overflow hidden breaks sticky)
(function () {
  var s = document.createElement("style");
  s.textContent = ".overflow-x-hidden{overflow-x:clip!important}html,body{overflow-x:clip}header{position:sticky!important;top:0!important;z-index:50!important}";
  (document.head || document.documentElement).appendChild(s);
})();

// Permanent white holding screen
(function () {
  var d = document.createElement("div");
  d.id = "lz-splash";
  d.innerHTML = '<style>#lz-splash{position:fixed;inset:0;z-index:99999;background:#ffffff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;transition:opacity .5s}#lz-splash img{width:56px;height:56px;object-fit:contain;filter:drop-shadow(0 0 12px rgba(139,92,246,.35));animation:lzp 1.5s ease-in-out infinite}#lz-splash span{color:#07070d;font:700 15px Inter,sans-serif;letter-spacing:.35em}.lzlogo{position:relative;width:56px;height:56px;filter:drop-shadow(0 0 12px rgba(139,92,246,.35));animation:lzp 1.5s ease-in-out 1.3s infinite}.lzlogo b{position:absolute;width:14px;height:14px;background:url(/images/lovable-zone-logo-v2.png) no-repeat;background-size:56px 56px;opacity:0;transform:var(--t);animation:lzl 1s cubic-bezier(.2,1.2,.3,1) forwards}#lz-splash i{display:inline-block;font-style:normal;opacity:0;transform:var(--f) rotate(25deg);animation:lzl .9s cubic-bezier(.2,1.4,.4,1) forwards}@keyframes lzl{to{opacity:1;transform:none}}@keyframes lzp{50%{transform:scale(1.04)}}</style><div class="lzlogo" role="img" aria-label="LAST ZONE"><b style="left:0px;top:0px;background-position:-0px -0px;--t:translate(-39px,143px) rotate(98deg) scale(.4);animation-delay:0.04s"></b><b style="left:14px;top:0px;background-position:-14px -0px;--t:translate(149px,82px) rotate(140deg) scale(.4);animation-delay:0.17s"></b><b style="left:28px;top:0px;background-position:-28px -0px;--t:translate(150px,-154px) rotate(60deg) scale(.4);animation-delay:0.08s"></b><b style="left:42px;top:0px;background-position:-42px -0px;--t:translate(-41px,-62px) rotate(60deg) scale(.4);animation-delay:0.16s"></b><b style="left:0px;top:14px;background-position:-0px -14px;--t:translate(121px,83px) rotate(23deg) scale(.4);animation-delay:0.19s"></b><b style="left:14px;top:14px;background-position:-14px -14px;--t:translate(-83px,-42px) rotate(145deg) scale(.4);animation-delay:0.05s"></b><b style="left:28px;top:14px;background-position:-28px -14px;--t:translate(107px,39px) rotate(-173deg) scale(.4);animation-delay:0.20s"></b><b style="left:42px;top:14px;background-position:-42px -14px;--t:translate(-128px,-79px) rotate(122deg) scale(.4);animation-delay:0.01s"></b><b style="left:0px;top:28px;background-position:-0px -28px;--t:translate(-145px,-23px) rotate(62deg) scale(.4);animation-delay:0.18s"></b><b style="left:14px;top:28px;background-position:-14px -28px;--t:translate(38px,58px) rotate(22deg) scale(.4);animation-delay:0.22s"></b><b style="left:28px;top:28px;background-position:-28px -28px;--t:translate(135px,67px) rotate(-112deg) scale(.4);animation-delay:0.26s"></b><b style="left:42px;top:28px;background-position:-42px -28px;--t:translate(-111px,-142px) rotate(-111deg) scale(.4);animation-delay:0.15s"></b><b style="left:0px;top:42px;background-position:-0px -42px;--t:translate(-28px,63px) rotate(140deg) scale(.4);animation-delay:0.26s"></b><b style="left:14px;top:42px;background-position:-14px -42px;--t:translate(55px,99px) rotate(17deg) scale(.4);animation-delay:0.17s"></b><b style="left:28px;top:42px;background-position:-28px -42px;--t:translate(113px,139px) rotate(28deg) scale(.4);animation-delay:0.18s"></b><b style="left:42px;top:42px;background-position:-42px -42px;--t:translate(12px,-146px) rotate(-37deg) scale(.4);animation-delay:0.30s"></b></div><span><i style="--f:translate(60vw,0);animation-delay:0.10s">L</i><i style="--f:translate(0,50vh);animation-delay:0.18s">A</i><i style="--f:translate(0,-50vh);animation-delay:0.26s">S</i><i style="--f:translate(40vw,40vh);animation-delay:0.34s">T</i><i style="--f:translate(0,0) scale(3);animation-delay:0.42s">&nbsp;</i><i style="--f:translate(-40vw,-40vh);animation-delay:0.50s">Z</i><i style="--f:translate(0,50vh);animation-delay:0.58s">O</i><i style="--f:translate(0,-50vh);animation-delay:0.66s">N</i><i style="--f:translate(60vw,0);animation-delay:0.74s">E</i></span>';
  document.body.appendChild(d);
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
})();
