/* assets/main.js
 *
 * JavaScript exklusiv für die Startseite (index.html).
 *
 * Geteilte Bausteine (Footer-Year, Mobile-Nav-Toggle, Quick-Panels,
 * Notfall-Bar/Header-Scroll) leben in assets/common.js und werden auf
 * allen 9 HTML-Seiten geladen — diese Datei enthält nur Index-spezifisches:
 * Hero-Smart-Positioning, Hash-Scroll-Fix, Sticky-Notfall-Button (Öffnungs-
 * zeiten), ?frage=-URL-Sync, Reviews-Fetch, Map-Lazy-Load, Form-Submit.
 *
 * Phase 3 (2026-05-10): aus dem Inline-`<script>`-Block extrahiert. Bis dahin
 * lagen ~100 Zeilen JS direkt in index.html — und das war exakt die
 * Architektur, die am 2026-05-10 die Mobile-Nav lahmgelegt hat (Truncation
 * mid-statement → Parse-Error → kein einziges IIFE läuft).
 *
 * Alle IIFEs sind idempotent: wenn das Ziel-Element auf der Page fehlt,
 * ist der Block ein No-Op.
 *
 * Eingebunden mit: <script src="/assets/main.js?v=N" defer></script>
 * NACH common.js. Cache-Buster bei JS-Edits in index.html hochzählen.
 */

// Hero-Bild-Positioning ist jetzt rein CSS (assets/main.css → .hero--fullbleed
// .hero__bg img mit aspect-ratio Media-Queries). Vorher lief das als JS-IIFE
// mit 4 Aspect-Buckets und resize-Listener — was bei iOS-Address-Bar-Collapse
// resize-Events feuerte und das Bild „atmen" liess. CSS-Lösung ist statisch,
// kein Repaint bei Scroll, kein prefers-reduced-motion-Gate nötig. (2026-05-23)

(function(){
  // Hash-Anker-Scroll-Fix: bei Cross-Page-Navigation (z.B. von Subpage zu /#kontakt)
  // scrollt der Browser zur initialen Anker-Position, bevor Bilder geladen sind.
  // Nach 'load' ist Layout final — wir scrollen nochmal explizit zum Anker.
  if (!window.location.hash) return;
  function scrollToHash(){
    try {
      var target = document.querySelector(window.location.hash);
      if (target && typeof target.scrollIntoView === 'function') {
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    } catch (e) { /* malformed hash, ignore */ }
  }
  if (document.readyState === 'complete') {
    setTimeout(scrollToHash, 80);
  } else {
    window.addEventListener('load', function(){ setTimeout(scrollToHash, 80); });
  }
})();

(function(){
  // Notfall-Button: Öffnungszeiten Mo–Do 08:00–17:00 → Praxis, sonst → Notfalldienst
  var btn = document.getElementById('sticky-notfall');
  if (!btn) return;
  var now = new Date();
  var day = now.getDay(); // 0=So, 1=Mo, ..., 4=Do, 5=Fr, 6=Sa
  var mins = now.getHours() * 60 + now.getMinutes();
  var open = day >= 1 && day <= 4 && mins >= 480 && mins < 1020; // 08:00–17:00
  if (open) {
    btn.href = 'tel:+41326793788';
    btn.setAttribute('aria-label', 'Praxis anrufen — jetzt geöffnet');
  } else {
    btn.href = 'tel:0848800855';
    btn.setAttribute('aria-label', 'Zahnärztlicher Notfalldienst Kanton Bern');
  }
})();

(function(){
  // Liest ?frage=... aus URL (von Subpage-FAQ-Ask) und füllt das Bemerkung-Feld
  try {
    var params = new URLSearchParams(window.location.search);
    var q = params.get('frage');
    if (!q) return;
    var ta = document.getElementById('f-bemerkung');
    if (ta) {
      ta.value = q.substring(0, 800);
      var sel = document.getElementById('f-anliegen');
      if (sel) sel.value = 'sonstiges';
    }
    // URL aufräumen — Query-Param raus, Hash bleibt
    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, '', window.location.pathname + window.location.hash);
    }
    // Sanft zum Anfrage-Form scrollen
    setTimeout(function(){
      var anchor = document.getElementById('anfrage');
      if (anchor) anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  } catch (err) { /* ignore */ }
})();

(function(){
  // Bewertungen: lazy-fetch von /api/reviews und render in #review-grid.
  // Section ist initial hidden; bei Erfolg entfernen wir das Attribut.
  // Bei Fehler oder leerer Liste bleibt sie unsichtbar (Graceful Fallback).
  var section = document.getElementById('bewertungen');
  var grid = document.getElementById('review-grid');
  if (!section || !grid) return;

  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, function(c){
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
    });
  }
  function shortName(name){
    // DSG-konform: "Maria Müller" → "Maria M." (Vorname + Initial Nachname)
    if (!name) return 'Patient:in';
    var parts = name.trim().split(/\s+/);
    if (parts.length < 2) return parts[0];
    return parts[0] + ' ' + parts[parts.length - 1].charAt(0).toUpperCase() + '.';
  }
  function initial(name){
    return (name && name.trim().charAt(0).toUpperCase()) || '·';
  }
  function stars(rating){
    var n = Math.max(0, Math.min(5, Math.round(rating)));
    return '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n);
  }
  function renderReview(r){
    return '<article class="review-card">' +
      '<div class="review-card__header">' +
        '<div class="review-card__avatar" aria-hidden="true">' + escapeHtml(initial(r.author_name)) + '</div>' +
        '<div class="review-card__meta">' +
          '<p class="review-card__author">' + escapeHtml(shortName(r.author_name)) + '</p>' +
          '<p class="review-card__date">' + escapeHtml(r.relative_time_description || '') + '</p>' +
        '</div>' +
        '<div class="review-card__stars" aria-label="' + r.rating + ' von 5 Sternen">' + stars(r.rating) + '</div>' +
      '</div>' +
      '<p class="review-card__text">' + escapeHtml(r.text) + '</p>' +
    '</article>';
  }

  // AbortController-Timeout: ohne den hängt der Browser bei API-Stall am Default-
  // Network-Timeout (30-60s) und die Section bleibt unsichtbar während dieser Zeit.
  // 5s ist grosszügig für /api/reviews (KV-Cache-Hit ist <100ms, frischer Google-
  // Places-Roundtrip ~1-2s). Bei Timeout fällt der catch-Branch durch und die
  // Section bleibt sauber hidden — Reviews sind dekorativ, kein Page-Blocker.
  var ctrl = (typeof AbortController !== 'undefined') ? new AbortController() : null;
  var timer = ctrl ? setTimeout(function(){ ctrl.abort(); }, 5000) : null;

  fetch('/api/reviews', {
    headers: { 'accept': 'application/json' },
    signal: ctrl ? ctrl.signal : undefined
  })
    .then(function(r){
      if (timer) clearTimeout(timer);
      if (!r.ok) throw new Error('http_' + r.status);
      return r.json();
    })
    .then(function(data){
      if (!data || !Array.isArray(data.reviews) || data.reviews.length === 0) return;
      grid.innerHTML = data.reviews.slice(0, 3).map(renderReview).join('');
      section.hidden = false;
    })
    .catch(function(){
      if (timer) clearTimeout(timer);
      /* Section bleibt hidden — timeout/network-error/empty-response sind alle non-fatal */
    });
})();

(function(){
  // Map: lazy-load OpenStreetMap-iframe nur nach Klick (Privacy + Performance).
  // Two-Click-Pattern: keine Verbindung zu OSM, bis Patient:in zustimmt.
  // OSM statt Google Maps weil (a) CSP frame-src nur OSM erlaubt, (b) Datenschutz
  // §2.4 OSM offenlegt, (c) keine Drittanbieter-Cookies/Profilbildung.
  // Bürenstrasse 13, 3296 Arch ≈ 47.1766, 7.3505.
  var btn = document.getElementById('map-load'),
      ph = document.getElementById('map-placeholder'),
      wrap = document.getElementById('map-wrap');
  if (!btn || !ph || !wrap) return;
  btn.addEventListener('click', function(){
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.openstreetmap.org/export/embed.html?bbox=7.345%2C47.173%2C7.356%2C47.180&layer=mapnik&marker=47.1766%2C7.3505';
    iframe.title = 'Karte: Bürenstrasse 13, 3296 Arch';
    iframe.loading = 'lazy';
    iframe.className = 'map-iframe';
    iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
    wrap.replaceChild(iframe, ph);
  });
})();

(function(){
  // Form-Submit: validation, fetch zum /api/contact-Worker, Status-Feedback
  var form = document.getElementById('anfrage-form'),
      status = document.getElementById('anfrage-status'),
      submit = document.getElementById('anfrage-submit');
  if (!form || !status || !submit) return;
  var FIELD_MSG = {
    name: 'Bitte geben Sie Ihren Namen an.',
    tel: 'Bitte geben Sie eine gültige Telefonnummer an.',
    email: 'Die E-Mail-Adresse scheint nicht korrekt zu sein.',
    anliegen: 'Bitte wählen Sie ein Anliegen aus.',
    datenschutz: 'Bitte stimmen Sie der Datenschutzerklärung zu.',
    message: 'Die Bemerkung ist zu lang.'
  };
  var ERR_MSG = {
    spam: 'Ihre Anfrage wurde als Spam eingestuft. Bitte rufen Sie uns direkt an: <a href="tel:+41326793788">032 679 37 88</a>',
    turnstile_failed: 'Bitte schliessen Sie die Sicherheitsprüfung ab und versuchen Sie es nochmal.',
    rate_limit: 'Sie haben in der letzten Stunde mehrere Anfragen gesendet. Bitte später nochmal versuchen oder anrufen: <a href="tel:+41326793788">032 679 37 88</a>',
    email_send_failed: 'Wir konnten Ihre Anfrage gerade nicht versenden. Bitte rufen Sie uns an: <a href="tel:+41326793788">032 679 37 88</a>',
    network: 'Verbindungsproblem. Bitte versuchen Sie es nochmal oder rufen Sie uns an.',
    config_missing: 'Service vorübergehend nicht verfügbar. Bitte rufen Sie uns an: <a href="tel:+41326793788">032 679 37 88</a>'
  };
  function clearErrors(){
    form.querySelectorAll('.form__field--error').forEach(function(f){ f.classList.remove('form__field--error'); });
    form.querySelectorAll('[aria-invalid]').forEach(function(e){ e.removeAttribute('aria-invalid'); });
  }
  function markFieldErrors(fields){
    clearErrors();
    var first = null;
    fields.forEach(function(f){
      var el = form.querySelector('[name="' + f + '"]');
      if (el) {
        var wrap = el.closest('.form__field') || el.closest('.form__check');
        if (wrap) wrap.classList.add('form__field--error');
        el.setAttribute('aria-invalid', 'true');
        if (!first) first = el;
      }
    });
    if (first) first.focus();
  }
  function showError(msg){
    status.className = 'form__status form__status--error';
    status.innerHTML = msg;
  }
  function showSuccess(){
    status.className = 'form__status form__status--success';
    status.innerHTML = '<strong>Vielen Dank!</strong> Wir haben Ihre Anfrage erhalten und melden uns innerhalb eines Werktages zurück.';
    form.querySelectorAll('input,select,button,textarea').forEach(function(el){ el.disabled = true; });
  }
  form.addEventListener('submit', function(e){
    e.preventDefault();
    status.className = 'form__status';
    status.textContent = '';
    clearErrors();
    submit.disabled = true;
    submit.setAttribute('aria-busy', 'true');
    var origLabel = submit.textContent;
    submit.textContent = 'Wird gesendet…';
    function resetSubmit(){
      submit.disabled = false;
      submit.removeAttribute('aria-busy');
      submit.textContent = origLabel;
    }
    var fd = new FormData(form), data = {};
    fd.forEach(function(v, k){ data[k] = v; });
    data.datenschutz = fd.get('datenschutz') === 'on';
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function(r){ return r.json().then(function(j){ return { ok: r.ok, body: j }; }); })
      .then(function(res){
        resetSubmit();
        if (res.ok && res.body.ok) {
          showSuccess();
          status.scrollIntoView({ behavior: 'smooth', block: 'center' });
          if (window.turnstile) window.turnstile.reset();
        } else {
          var err = res.body.error;
          if (err === 'validation' && Array.isArray(res.body.fields)) {
            var f = res.body.fields[0];
            showError(FIELD_MSG[f] || 'Bitte überprüfen Sie Ihre Angaben.');
            markFieldErrors(res.body.fields);
          } else {
            showError(ERR_MSG[err] || 'Etwas ist schiefgelaufen. Bitte versuchen Sie es nochmal oder rufen Sie uns an: <a href="tel:+41326793788">032 679 37 88</a>');
            if (window.turnstile) window.turnstile.reset();
          }
        }
      })
      .catch(function(){
        resetSubmit();
        showError(ERR_MSG.network);
      });
  });
})();
