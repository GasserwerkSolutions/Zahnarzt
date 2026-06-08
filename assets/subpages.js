/* assets/subpages.js
 *
 * JavaScript exklusiv für Praxis + 7 Behandlungs-Subpages.
 *
 * Geteilte Bausteine (Footer-Year, Mobile-Nav-Toggle, Quick-Panels,
 * Notfall-Bar/Header-Scroll) leben in assets/common.js und werden auf
 * allen 9 HTML-Seiten geladen — diese Datei enthält nur Subpage-
 * spezifisches: FAQ-Ask-Form (sammelt Frei-Text und redirected zur
 * Startseite mit ?frage=).
 *
 * Eingebunden mit: <script src="/assets/subpages.js?v=N" defer></script>
 * NACH common.js. Cache-Buster bei JS-Edits in allen 8 Subseiten
 * identisch hochzählen, sonst inkonsistenter Load.
 */

(function(){
  // FAQ-Ask: Form-Submit redirected zur Startseite mit ?frage= Param
  document.querySelectorAll('[data-faq-ask]').forEach(function(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var ta = form.querySelector('.faq-ask__input');
      var v = (ta.value || '').trim();
      if (!v) { ta.focus(); return; }
      var params = new URLSearchParams({ frage: v.substring(0, 800) });
      window.location.href = '/?' + params.toString() + '#anfrage';
    });
  });
})();
