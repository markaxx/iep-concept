/* Faster page changes (16 Nov). Loaded with defer on every page.
   1. Browsers with Speculation Rules (Chrome, Edge): same-site pages are prerendered when the pointer rests on a link
      for 200 ms or presses it ("moderate"), and fetched ahead on a 10 ms hover or, on phones, when a link is on screen.
      When the menu opens, every menu page is fetched ahead at once.
   2. Other browsers (Safari, Firefox): the page behind a link is fetched on hover, touch or focus, and every menu page
      when the menu opens; with fetch() also the next page's main photo, so it is in the cache before the click.
   3. A resized WebP photo that is missing (a new photo before tools/make-variants.py was run) falls back to its JPEG. */
(() => {
  const here = location.pathname;
  const pageUrl = a => {
    if (!a || !a.href || a.hasAttribute('download') || (a.target && a.target !== '_self')) return null;
    let u; try { u = new URL(a.href, location.href); } catch (e) { return null; }
    if (u.origin !== location.origin || !/\.html$/.test(u.pathname) || u.pathname === here) return null;
    return u.origin + u.pathname;
  };
  const menuLinks = () => [...document.querySelectorAll('.menu a[href]')].map(pageUrl).filter(Boolean);

  // 3. WebP copy missing: use the original JPEG (img/g/<dir>/x1600/<name>.webp -> img/g/<dir>/<name>.jpg)
  document.addEventListener('error', e => {
    const t = e.target;
    if (t && t.tagName === 'IMG' && /\/x\d+\/[^/]+\.webp$/.test(t.currentSrc || t.src) && !t.dataset.jpg) {
      t.dataset.jpg = '1'; t.removeAttribute('srcset'); t.src = (t.currentSrc || t.src).replace(/x\d+\/([^/]+)\.webp$/, '$1.jpg');
    }
  }, true);

  const conn = navigator.connection;
  if (conn && (conn.saveData || /2g/.test(conn.effectiveType || ''))) return;   // data saver or very slow line: fetch nothing ahead

  // 1. Speculation Rules
  if (window.HTMLScriptElement && HTMLScriptElement.supports && HTMLScriptElement.supports('speculationrules')) {
    const add = rules => { const s = document.createElement('script'); s.type = 'speculationrules'; s.textContent = JSON.stringify(rules); document.head.appendChild(s); };
    const where = {and: [{href_matches: '/*.html'}, {not: {selector_matches: '[download], [target=_blank], [data-no-prefetch]'}}]};
    add({
      prerender: [{source: 'document', where, eagerness: 'moderate'}],
      prefetch: [{source: 'document', where, eagerness: 'eager'}]
    });
    let warmed = false;
    const warmMenu = () => { if (warmed) return; warmed = true; const urls = menuLinks(); if (urls.length) add({prefetch: [{source: 'list', urls, eagerness: 'immediate'}]}); };
    document.addEventListener('click', e => { if (e.target.closest && e.target.closest('[data-menu]')) warmMenu(); }, true);
    return;
  }

  // 2. Fallback: <link rel=prefetch> where supported, else fetch() into the HTTP cache (Safari)
  const done = new Set();
  const linkOk = (() => { try { return document.createElement('link').relList.supports('prefetch'); } catch (e) { return false; } })();
  const heroOf = html => {   // the next page's main photo: its first fetchpriority="high" image
    const m = html.match(/<img\b[^>]*\bfetchpriority="high"[^>]*>/i); if (!m) return;
    const attr = n => { const r = m[0].match(new RegExp('\\b' + n + '="([^"]*)"')); return r && !r[1].includes('${') ? r[1] : ''; };
    const src = attr('src'); if (!src) return;
    const im = new Image(); im.decoding = 'async';
    if (attr('sizes')) im.sizes = attr('sizes');
    if (attr('srcset')) im.srcset = attr('srcset');
    im.src = src;
  };
  const warm = url => {
    if (!url || done.has(url)) return; done.add(url);
    if (linkOk) { const l = document.createElement('link'); l.rel = 'prefetch'; l.href = url; document.head.appendChild(l); return; }
    fetch(url, {credentials: 'same-origin', priority: 'low'}).then(r => r.ok ? r.text() : '').then(heroOf).catch(() => {});
  };
  const onIntent = e => { const a = e.target.closest && e.target.closest('a[href]'); if (a) warm(pageUrl(a)); };
  document.addEventListener('pointerenter', onIntent, {capture: true, passive: true});
  document.addEventListener('touchstart', onIntent, {capture: true, passive: true});
  document.addEventListener('focusin', onIntent, true);
  const menu = document.querySelector('.menu');
  const warmMenu = () => menuLinks().forEach(warm);
  if (menu) new MutationObserver(() => { if (menu.classList.contains('open')) warmMenu(); }).observe(menu, {attributes: true, attributeFilter: ['class']});
})();
