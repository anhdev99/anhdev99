(function () {
  var META = {
    vi: 'Trang giới thiệu của Nguyễn Tuấn Kiệt (anhdev99), Fullstack Developer tại Việt Nam, làm việc với C#/.NET, Vue.js và các công nghệ web.',
    en: 'Personal page of Nguyễn Tuấn Kiệt (anhdev99), a Fullstack Developer based in Vietnam working with C#/.NET, Vue.js and web technologies.'
  };
  var KEY = 'lang';
  var root = document.documentElement;

  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }

  function setLang(lang, persist) {
    if (lang !== 'vi' && lang !== 'en') lang = 'vi';
    root.lang = lang;
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.content = META[lang];
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
