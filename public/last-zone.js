(function () {
  var NAME = "لاست زون";
  var CHANNEL = "https://t.me/+Dm8IppPh39s4YWIx";
  var SUPPORT = "https://t.me/monir_i0_0i";
  var BOT = "https://t.me/LZ_LOV_BOT";
  var NAME_RE = /Lovable Zone|LOVABLE ZONE|Lovable zone/g;

  function hide(el) { if (el && el.style.display !== "none") el.style.setProperty("display", "none", "important"); }

  function apply() {
    var root = document.body;
    if (!root) return;
    // Rename text
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), n;
    while ((n = w.nextNode())) {
      if (NAME_RE.test(n.nodeValue)) {
        NAME_RE.lastIndex = 0;
        n.nodeValue = n.nodeValue.replace(NAME_RE, NAME);
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
        a.setAttribute("href", /support|دعم/i.test(a.textContent) ? SUPPORT : CHANNEL);
      }
    });
    // Nav/menu items by label
    document.querySelectorAll("a,button").forEach(function (el) {
      var t = (el.textContent || "").trim();
      if (/^(My License|Reseller|WhatsApp)$/i.test(t)) hide(el);
    });
    // Remove testimonials section
    document.querySelectorAll("h2").forEach(function (h) {
      if (/Loved by Real Users/i.test(h.textContent)) hide(h.closest("section") || h.parentElement);
    });
  }

  // Package purchase clicks -> bot
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest("a,button");
    if (!t) return;
    var pk = t.closest("#packages");
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
