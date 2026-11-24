const puppeteer = require('puppeteer');
const path = require('path');
const root = path.resolve(__dirname, '..', '..', '..');
const pages = { home: 'index.html', post: 'blog/sample-1-oop-lop-va-doi-tuong/index.html' };
const all = ['index.html','blog/index.html','about/index.html','topics/teaching/index.html','topics/dev/index.html','topics/research/index.html', ...require('fs').readdirSync(path.join(root,'blog')).filter(d=>d.startsWith('sample-')).map(d=>`blog/${d}/index.html`)];
(async () => {
  const b = await puppeteer.launch();
  let fail = 0;
  for (const w of [360, 768, 1280]) for (const scheme of ['light', 'dark']) {
    const pg = await b.newPage();
    await pg.setViewport({ width: w, height: 900 });
    await pg.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: scheme }]);
    for (const f of all) {
      await pg.goto('file:///' + path.join(root, f).replace(/\\/g, '/'));
      const r = await pg.evaluate(() => {
        const bad = [...document.querySelectorAll('header a, header button, nav.menu a, footer a, .chip, .logo, .lang button')]
          .filter(e => e.getBoundingClientRect().height && e.getBoundingClientRect().height < 43.5 && !e.closest('p'))
          .map(e => e.textContent.trim().slice(0, 15) + ':' + e.getBoundingClientRect().height);
        const m = document.querySelector('.menu');
        const clipped = [...document.querySelectorAll('.menu a, .chip')].filter(e => e.getBoundingClientRect().right > innerWidth + 0.5 || e.getBoundingClientRect().left < -0.5).length;
        return { bad, clipped, hscroll: document.documentElement.scrollWidth > innerWidth, menuOverflow: m && getComputedStyle(m).overflowX };
      });
      if (r.bad.length || r.clipped || r.hscroll) { fail++; console.log('FAIL', w, scheme, f, JSON.stringify(r)); }
    }
    for (const [n, f] of Object.entries(pages)) {
      await pg.goto('file:///' + path.join(root, f).replace(/\\/g, '/'));
      await pg.screenshot({ path: path.join(__dirname, `${n}-${w}-${scheme}.png`), fullPage: true });
    }
    await pg.close();
  }
  await b.close();
  console.log(fail ? 'FAILS=' + fail : 'ALL OK (' + all.length + ' pages x 6 viewports)');
  process.exit(fail ? 1 : 0);
})();

