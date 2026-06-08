/* assets/common.js
 *
 * Geteiltes JavaScript für alle 9 Production-HTML-Seiten
 * (index.html, praxis/, 7 Behandlungs-Subpages).
 *
 * Single-Source-of-Truth für die Bausteine, die auf jeder Seite
 * gebraucht werden. Vorher war derselbe Code byte-identisch zwischen
 * main.js und subpages.js dupliziert — jeder Edit musste zweimal
 * gemacht werden, was die Truncation-Klasse von Bugs einlädt.
 *
 * Alle IIFEs sind idempotent: wenn das Ziel-Element auf einer Page
 * fehlt, ist der Block ein No-Op (z.B. .hero--fullbleed nur auf
 * index — Notfall-Bar-Block überspringt dann das Hero-Hide).
 *
 * Eingebunden mit: <script src="/assets/common.js?v=N" defer></script>
 * VOR main.js bzw. subpages.js auf allen 9 HTML-Seiten. Cache-Buster
 * bei Edits überall identisch hochzählen, sonst inkonsistenter Load.
 */

(function(){
  // Footer-Year: aktualisiert das Jahr im Footer-Span
  var y = document.getElementById('footer-year');
  if (y) y.textContent = new Date().getFullYear();
})();

(function(){
  // Mobile-Navigation Plus: vier Mechaniken in einem IIFE
  //
  // 1) Burger-Toggle: öffnet/schliesst die Drawer-Navigation auf <768px.
  //    Body-Scroll-Lock aktiv solange offen, damit Hintergrund nicht
  //    während Touch-Interaktion mitscrollt.
  //
  // 2) Burger-Submenüs (Praxis/Behandlungen) sind default eingeklappt.
  //    Tap auf den Parent-Link expandiert inline (kein Direkt-Navigieren).
  //
  // 3) Quick-Access-Icons (Praxis / Behandlungen) öffnen EIGENE Mini-Panels
  //    mit nur den jeweiligen Sub-Links. Click ausserhalb schliesst alle.
  //
  // 4) Accessibility: Escape schliesst Drawer/Panel und gibt Focus zurück
  //    an den Trigger-Button. Tab-Focus-Order respektiert die Drawer-Bounds.
  var nav = document.getElementById('main-nav');
  var toggle = document.getElementById('nav-toggle');
  var header = document.querySelector('.site-header');
  if (!nav || !toggle || !header) return;
  var body = document.body;
  var subItems = nav.querySelectorAll('.nav__item--has-sub');
  var sourceMap = { praxis: subItems[0], behandlungen: subItems[1] };
  var lastTrigger = null;

  // ─── 1) Burger-Toggle ────────────────────────────────────────────────
  // aria-label wechselt zwischen „öffnen"/„schliessen", weil Screenreader sonst
  // bei aria-expanded=true noch immer „Navigation öffnen, erweitert" sagen — ein
  // Widerspruch in einem Token. „Schliessen" ist die echte Aktion im offenen State.
  var LABEL_OPEN = 'Navigation öffnen';
  var LABEL_CLOSE = 'Navigation schliessen';
  function openDrawer(){
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', LABEL_CLOSE);
    body.classList.add('has-nav-open');
    closeAllPanels(); // sicherstellen, dass kein Quick-Panel parallel offen ist
  }
  function closeDrawer(){
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', LABEL_OPEN);
    body.classList.remove('has-nav-open');
    // Submenüs beim Schliessen einklappen, damit beim nächsten Öffnen
    // wieder ein sauberer Stand vorliegt.
    nav.querySelectorAll('.nav__item--has-sub.is-expanded').forEach(function(el){
      el.classList.remove('is-expanded');
    });
  }
  toggle.addEventListener('click', function(e){
    e.stopPropagation();
    if (nav.classList.contains('is-open')) closeDrawer();
    else openDrawer();
  });
  // Anchor-Klick im Nav (zu # auf gleicher Page) schliesst Drawer
  nav.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(){ closeDrawer(); });
  });

  // ─── 2) Mobile-Submenu-Toggle ────────────────────────────────────────
  // Auf <768px: Tap auf den Parent-Link (Wort, Icon, Caret) togglt das
  // Submenu inline. Kein Direkt-Navigieren in der Burger-Nav für Items
  // mit Submenu, weil die Eltern-URLs nicht die "Übersicht" sind und
  // User das nicht erwartet.
  nav.querySelectorAll('.nav__item--has-sub > a').forEach(function(link){
    link.addEventListener('click', function(e){
      if (window.innerWidth >= 768) return;
      e.preventDefault();
      link.parentElement.classList.toggle('is-expanded');
    });
  });

  // ─── 3) Quick-Access-Panels generieren ──────────────────────────────
  // Klon der nav__sub als Stand-Alone-Mini-Dropdown. WICHTIG: nav__sub-
  // Klasse vom Klon entfernen — die hat opacity:0 + visibility:hidden
  // vom Desktop-Hover-Dropdown, sonst leere Box-Bug.
  var panels = {};
  Object.keys(sourceMap).forEach(function(key){
    var src = sourceMap[key];
    if (!src) return;
    var source = src.querySelector('.nav__sub');
    if (!source) return;
    var panel = document.createElement('div');
    panel.className = 'nav-quick-panel';
    panel.id = 'nav-quick-panel-' + key;
    panel.setAttribute('role', 'menu');
    var cloned = source.cloneNode(true);
    cloned.classList.remove('nav__sub');
    panel.appendChild(cloned);
    header.appendChild(panel);
    panels[key] = panel;
  });

  function closeAllPanels(){
    Object.keys(panels).forEach(function(k){ panels[k].classList.remove('is-open'); });
    document.querySelectorAll('.nav-quick').forEach(function(b){ b.setAttribute('aria-expanded', 'false'); });
  }

  document.querySelectorAll('.nav-quick').forEach(function(btn){
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      var key = btn.getAttribute('data-target');
      var panel = panels[key];
      if (!panel) return;
      var wasOpen = panel.classList.contains('is-open');
      // Burger-Nav zu, andere Panels zu
      if (nav.classList.contains('is-open')) closeDrawer();
      closeAllPanels();
      if (!wasOpen) {
        panel.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        lastTrigger = btn;
      }
    });
  });

  // ─── 4) Click-Outside + Escape + Resize ──────────────────────────────
  // Click ausserhalb von Panel/Quick-Icon: alle Panels schliessen.
  // Click ausserhalb des Drawers (und nicht auf Toggle): Drawer schliessen.
  document.addEventListener('click', function(e){
    var insideQuick = e.target.closest('.nav-quick') || e.target.closest('.nav-quick-panel');
    if (!insideQuick) closeAllPanels();
    if (nav.classList.contains('is-open')) {
      var insideNav = e.target.closest('.nav') || e.target.closest('#nav-toggle');
      if (!insideNav) closeDrawer();
    }
  });
  document.addEventListener('keydown', function(e){
    if (e.key !== 'Escape') return;
    var panelOpen = Object.keys(panels).some(function(k){
      return panels[k].classList.contains('is-open');
    });
    if (panelOpen) {
      closeAllPanels();
      if (lastTrigger) { lastTrigger.focus(); lastTrigger = null; }
    } else if (nav.classList.contains('is-open')) {
      closeDrawer();
      toggle.focus();
    }
  });
  // Resize über 768px: Drawer/Panels schliessen, sonst klebt der is-open-State
  // wenn User von Mobile zu Desktop rotiert.
  window.addEventListener('resize', function(){
    if (window.innerWidth >= 768 && nav.classList.contains('is-open')) closeDrawer();
    if (window.innerWidth >= 768) closeAllPanels();
  }, { passive: true });
})();

(function(){
  // Notfall-Bar blendet beim Scrollen nach unten aus.
  // Header wechselt Opacity 40% → 30% sobald >80px gescrollt.
  // Hero-BG + Overlay (fixed-positioned, nur auf index.html) werden versteckt,
  // sobald die Hero-Section ausgescrollt ist — sonst bleibt das Bild bei
  // Bottom-Overscroll im Viewport sichtbar und „leuchtet durch" unter dem
  // Footer. Auf Subpages ist hero null → Block ist No-Op.
  //
  // Notfall-Bar Tab-Focus: bei is-hidden setzen wir inert (modern, Chrome 102+,
  // Safari 15.5+, FF 112+) — verhindert Tab-Focus auf die nicht-sichtbare Bar.
  // Plus aria-hidden für Screenreader. Browser ohne inert-Support fallen
  // sauber auf pointer-events:none zurück (CSS-Side), Focus-Tabbing geht dann
  // noch — minimaler Edge-Case bei <1% Geräten.
  var bar = document.getElementById('notfall-bar');
  var header = document.querySelector('.site-header');
  var hero = document.querySelector('.hero--fullbleed');
  var heroBg = hero ? hero.querySelector('.hero__bg') : null;
  var heroOverlay = hero ? hero.querySelector('.hero__overlay') : null;
  if (!bar && !header && !hero) return;
  var lastY = 0, ticking = false, lastBarHidden = false;
  function update(){
    var y = window.scrollY;
    if (bar) {
      var shouldHide = y > 100 && y > lastY;
      if (shouldHide !== lastBarHidden) {
        if (shouldHide) {
          bar.classList.add('is-hidden');
          bar.setAttribute('aria-hidden', 'true');
          bar.setAttribute('inert', '');
        } else {
          bar.classList.remove('is-hidden');
          bar.removeAttribute('aria-hidden');
          bar.removeAttribute('inert');
        }
        lastBarHidden = shouldHide;
      }
    }
    if (header) {
      if (y > 80) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    }
    if (hero && heroBg && heroOverlay) {
      // visibility-Hide nur auf Desktop (>980px) nötig, wo BG + Overlay
      // position:fixed sind und sonst durch nachfolgende Sections „leuchten"
      // würden. Auf Mobile (<=980px) ist BG position:absolute (siehe main.css
      // 2026-05-23) — er scrollt mit der Hero-Section raus, hat per se keinen
      // Leak. Falls Style-Inline-Override durch früheren Scroll noch hängt
      // (Resize von >980 zu <=980 ohne Reload), explizit zurücksetzen.
      if (window.innerWidth > 980) {
        var heroBottom = hero.offsetTop + hero.offsetHeight;
        var hide = y > heroBottom;
        heroBg.style.visibility = hide ? 'hidden' : '';
        heroOverlay.style.visibility = hide ? 'hidden' : '';
      } else if (heroBg.style.visibility) {
        heroBg.style.visibility = '';
        heroOverlay.style.visibility = '';
      }
    }
    lastY = y;
    ticking = false;
  }
  update();
  window.addEventListener('scroll', function(){
    if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', function(){
    if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
})();
