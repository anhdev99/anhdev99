(function () {
  var KEY = 'lang';
  var root = document.documentElement;

  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function setLang(lang, persist) {
    if (lang !== 'vi' && lang !== 'en') lang = 'vi';
    root.lang = lang;
    var desc = document.querySelector('meta[name="description"]');
    if (desc && desc.getAttribute('data-' + lang)) desc.content = desc.getAttribute('data-' + lang);
    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set-lang') === lang));
    });
    if (persist) {
      try { localStorage.setItem(KEY, lang); } catch (e) {}
    }
  }

  var initial = saved() || ((navigator.language || 'vi').slice(0, 2) === 'vi' ? 'vi' : 'en');
  setLang(initial, false);

  document.querySelectorAll('[data-set-lang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-set-lang'), true); });
  });

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
