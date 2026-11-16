(() => {
  if (location.search.includes('shot')) document.documentElement.classList.add('shot');
  if (!document.querySelector('meta[name=robots]')) document.head.insertAdjacentHTML('beforeend', '<meta name="robots" content="noindex">');   // student concept: keep it out of search results
  const $ = (s, el = document) => el.querySelector(s), $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const page = $('.page');
  const dark = document.body.dataset.bar === 'dark';
  const waves = '<svg viewBox="0 0 26 26"><path d="M2 10c3-3 5-3 8 0s5 3 8 0 5-3 6-1M2 16c3-3 5-3 8 0s5 3 8 0 5-3 6-1"/></svg>';
  const arrow = '<svg viewBox="0 0 26 26"><path d="M3 13h19M15 6l7 7-7 7"/></svg>';

  page.insertAdjacentHTML('afterbegin', `
  <div class="bar${dark ? ' dark' : ''}">
    <div><button class="pill pill-glass mbtn" data-menu aria-label="Menu">${waves}<span class="mt">Menu</span></button></div>
    <a class="logo" href="home-v3.html"><img class="lw" src="brand/logo-white.svg" alt="Italian Event Planners"><img class="lk" src="brand/logo-brand.svg" alt=""></a>
    <div class="right"><span class="lang" aria-label="Language"><a href="#" aria-current="true">EN</a><a href="#">IT</a><a href="#">DE</a><a href="#">FR</a></span><a class="pill pill-glass plan-cta" href="plan.html">Plan your wedding</a></div>
  </div>`);

  document.body.insertAdjacentHTML('beforeend', `
  <div class="menu" aria-hidden="true">
    <button class="pill pill-line close" data-menu>Close</button>
    <nav>
      <a href="home-v3.html">Home</a><a href="weddings-v3.html">Weddings</a><a href="events-v3.html">Corporate</a>
      <a href="events-v3.html#private">Private celebrations</a><a href="destinations-v3.html">Destinations</a>
      <a href="about-v3.html">About us</a><a href="journal-v3.html">Journal</a><a href="contact.html">Contact</a><a href="plan.html">Start planning</a>
      <div class="m-foot"><span class="m-lang" aria-label="Language"><a href="#" aria-current="true">EN</a><a href="#">IT</a><a href="#">DE</a><a href="#">FR</a></span><span>+39 346 688 2388</span><span>Instagram</span><span>Client login</span></div>
    </nav>
    <div class="m-img"><img src="img/menu.jpg" srcset="img/x900/menu.webp 900w, img/x1600/menu.webp 1600w, img/x2400/menu.webp 1800w" sizes="50vw" alt="" decoding="async"></div>
  </div>
  <a class="wa" href="https://wa.me/393466882388" aria-label="WhatsApp"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-3.3-.8-2.8-1.1-4.5-3.9-4.7-4.1-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.2z"/></svg></a>`);

  page.insertAdjacentHTML('beforeend', `
  <footer>
    <div class="wrap">
      <div class="f-top">
        <div><a class="logo" href="home-v3.html"><img src="brand/logo-white.svg" alt="Italian Event Planners"></a>
          <p style="margin-top:22px;max-width:30ch;color:#BFB09B;font-size:16px">Weddings, corporate events and private celebrations across Italy since 2009.</p></div>
        <div><h5>Celebrate</h5><a href="weddings-v3.html">Weddings</a><a href="events-v3.html">Corporate events</a><a href="events-v3.html#private">Private celebrations</a><a href="destinations-v3.html">Destinations</a></div>
        <div><h5>Studio</h5><a href="about-v3.html">About us</a><a href="journal-v3.html">Journal</a><a href="home-v3.html#stories">Kind words</a></div>
        <div><h5>Say hello</h5><a href="contact.html">Contact</a><a href="tel:+393466882388">+39 346 688 2388</a><a href="https://wa.me/393466882388">WhatsApp</a><a href="https://instagram.com/italianeventplanners">Instagram</a><a href="https://facebook.com/italianeventplanners">Facebook</a></div>
      </div>
      
      <div class="f-bot"><span>© 2026 Italian Event Planners Srl</span></div>
    </div>
  </footer>`);

  const menu = $('.menu');
  $$('[data-menu]').forEach(b => b.addEventListener('click', () => {
    menu.classList.toggle('open'); menu.setAttribute('aria-hidden', !menu.classList.contains('open'));
  }));
  addEventListener('keydown', e => { if (e.key === 'Escape') menu.classList.remove('open'); });

  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), {threshold: .12});
  $$('.reveal').forEach(el => io.observe(el));
  if (location.search.includes('shot')) $$('.reveal').forEach(el => el.classList.add('in'));

  $$('.q-slider').forEach(sl => {
    const qs = $$('.q', sl); let i = 0;
    const img = $('.tp img', sl), cnt = $('.q-count', sl);
    const show = n => { i = (n + qs.length) % qs.length; qs.forEach((q, k) => q.classList.toggle('on', k === i)); if (img && qs[i].dataset.img) img.src = qs[i].dataset.img; if (cnt) cnt.textContent = `0${i+1} / 0${qs.length}`; };
    $('[data-prev]', sl)?.addEventListener('click', () => show(i - 1));
    $('[data-next]', sl)?.addEventListener('click', () => show(i + 1));
    show(0);
  });

  $$('.choice').forEach(g => $$('button', g).forEach(b => b.addEventListener('click', () => {
    $$('button', g).forEach(x => x.setAttribute('aria-pressed', x === b));
    if (b.dataset.go) setTimeout(() => location.href = b.dataset.go, 350);
  })));
})();
(() => { if (!document.body.classList.contains('home')) return;
  const f = () => document.body.classList.toggle('past-hero', scrollY > innerHeight * .8); addEventListener('scroll', f, {passive:true}); f(); })();
(() => { const hs = document.querySelectorAll('h2.flair'); if (!hs.length) return;
  if (location.search.includes('shot') || matchMedia('(prefers-reduced-motion: reduce)').matches) { hs.forEach(h => h.classList.add('written')); return; }
  const o = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('writing'); o.unobserve(e.target); } }), {threshold: .6}); hs.forEach(h => o.observe(h)); })();

/* Hover arrow (Mark, 16 Nov): the Stripe-style arrow from his IBTrack and Timmark projects.
   At rest a small chevron; on hover or keyboard focus a stem fades in and the arrow slides
   forward. Every right or left arrow icon on the site is upgraded to it automatically,
   including ones added later (the wizard re-renders). The header Plan button is left alone. */
(() => {
  const RIGHT = /^M\d+ \d+h\d+M\d+ 6l\d \d-\d \d$/, LEFT = /^M\d+ \d+H\d+M\d+ 6l-\d \d \d \d$/;
  // Geometry follows Mark's HoverArrow (IBTrack, then timmark): the chevron is 1.06x the label's x-height tall,
  // its stroke 1.05x the label's stem, mitred at 45 degrees, and it sits on the text baseline like a letter.
  // Jost, measured in the browser: x-height 0.469em; stem 0.052em (300), 0.080em (400), 0.109em (500);
  // ascent 1.07em, descent 0.375em. The arrow is only for geometric labels (Jost); next to any other face it is not used.
  const XH = .469, STEM = {300: .052, 400: .08, 500: .109}, BASE = (1.07 - .375) / 2, U = 100;   // U viewBox units per em
  const r = v => Math.round(v * 1000) / 1000;
  let n = 0;
  function geo(fs, wt){
    const k = U / fs, travel = .617 * 1.06 * XH * fs;                 // travel = 0.617x the chevron's height: the original's 5px on an 8.1px chevron (14px label), scaled with the label
    const h = 1.06 * XH * U, w = 1.05 * (STEM[wt] || STEM[400]) * U;
    const d = w / Math.SQRT2, o = d / 2, half = (h - d) / 2, vx = o + half, vy = o + half, tip = vx + d, notch = vx - d, t = travel * k;
    return {h, tip, travel, tu: t, svg: id => `<defs><clipPath id="${id}"><rect x="0" y="${r(-k)}" width="${r(tip + t + k)}" height="${r(h + 2 * k)}"/></clipPath></defs>`
      + `<g clip-path="url(#${id})"><g class="ha-mv"><rect class="ha-bar" x="${r(-t - 2 * k)}" y="${r(vy - w / 2)}" width="${r(notch + t + 2 * k)}" height="${r(w)}"/>`
      + `<path d="M${r(o)} ${r(o)} ${r(vx)} ${r(vy)} ${r(o)} ${r(o + 2 * half)}" stroke="currentColor" stroke-width="${r(w)}" stroke-linecap="butt" stroke-linejoin="miter" fill="none"/></g></g>`};
  }
  function upgrade(root){
    (root.querySelectorAll ? root.querySelectorAll('svg') : []).forEach(s => {
      if (s.classList.contains('ha')) return;
      const p = s.querySelector('path'); if (!p || s.querySelectorAll('path').length !== 1) return;
      const d = (p.getAttribute('d') || '').trim(), right = RIGHT.test(d), left = !right && LEFT.test(d);
      if (!right && !left) return;
      if (s.closest('.bar') && s.closest('a[href$="plan.html"]')) return;   // the main Plan CTA keeps its own treatment
      const host = s.closest('a,button,[role=button],.go,.link,label') || s.parentNode, cs = getComputedStyle(s.parentNode);   // the label's own face, size and weight
      if (!/^\s*"?Jost/i.test(cs.fontFamily)) return;                     // geometric labels only
      // inline text links only (Mark): never inside a solid or outlined button, which keeps its static arrow
      const hs = getComputedStyle(host), bgA = (hs.backgroundColor.match(/[\d.]+/g) || [0, 0, 0, 0])[3];
      if (host.matches('button.go,.pill,.hv-cta,.st-read,.dp-btn') || (hs.backgroundColor !== 'transparent' && bgA !== '0' && bgA !== undefined) || hs.backgroundColor.startsWith('rgb(') || (parseFloat(hs.borderTopWidth) > 0 && parseFloat(hs.borderLeftWidth) > 0 && hs.borderTopStyle !== 'none')) return;
      const fs = parseFloat(cs.fontSize) || 16, wt = Math.min(500, Math.max(300, Math.round((parseInt(cs.fontWeight) || 400) / 100) * 100));
      const g = geo(fs, 400);   // every arrow keeps the proportions of "Read their story" (Jost 400), also beside light labels
      // Sit the arrow on the baseline like a letter (Mark: its foot aligns with the bottoms of a, b, c). When the words before it are
      // a bare text node in a flex row, wrap the two in one inline run, so the arrow is laid out in the same line as the words.
      let prev = s.previousSibling; while (prev && prev.nodeType === 3 && !prev.textContent.trim()) prev = prev.previousSibling;
      if (/flex/.test(getComputedStyle(s.parentNode).display) && prev && prev.nodeType === 3) {
        const run = document.createElement('span'); run.className = 'ha-run'; prev.textContent = prev.textContent.replace(/\s+$/, '');
        s.parentNode.insertBefore(run, prev); run.appendChild(prev); run.appendChild(s);
      }
      const par = getComputedStyle(s.parentNode);
      // In a centred flex row the text's baseline sits (ascent - descent) / 2 below the row's centre; drop the arrow's foot onto it.
      const centred = /flex/.test(par.display) && /center/.test(getComputedStyle(s).alignSelf === 'auto' ? par.alignItems : getComputedStyle(s).alignSelf);
      s.setAttribute('viewBox', `0 0 ${r(g.tip)} ${r(g.h)}`); s.setAttribute('aria-hidden', 'true'); s.setAttribute('focusable', 'false');
      s.removeAttribute('width'); s.removeAttribute('height');
      s.style.setProperty('--ha-w', r(g.tip / U) + 'em'); s.style.setProperty('--ha-h', r(g.h / U) + 'em');
      s.style.setProperty('--ha-y', centred ? r(BASE - g.h / U / 2) + 'em' : '0em'); s.style.setProperty('--ha-t', r(g.tu) + 'px');   // inside the svg a px is one viewBox unit, so travel is given in units
      s.classList.add('ha'); if (left) s.classList.add('ha-left');
      s.innerHTML = g.svg('ha' + (++n));
      host.classList.add('ha-host');
    });
  }
  upgrade(document);
  new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(x => { if (x.nodeType === 1) { if (x.tagName === 'svg') upgrade(x.parentNode); else upgrade(x); } })))
    .observe(document.body, {childList: true, subtree: true});
})();

/* Page transition, "blinds" (16 Nov). CSS in css/site.css "Blinds".
   Leaving: on the click the blinds close at once (over the open menu too), and the next page is fetched while they close.
   Arriving after such a click: a one-line script in the <head> holds the page fully closed before the first paint; once the page is
   ready to show (fonts and the opening photo, at most ~0.9s), the blinds open. Back/Forward always restores the page open with the
   menu closed; a click on a link to the current page scrolls to the top; a CSS fallback opens the page even if this script fails. */
(() => {
  const h = document.documentElement, page = document.querySelector('.page');
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches, shot = location.search.includes('shot');
  const on = getComputedStyle(h).getPropertyValue('--arch').trim() === '1' && !still && !shot;
  try { sessionStorage.removeItem('iep-arch'); } catch (e) {}
  let leaving = false;
  const open = () => h.classList.remove('arch-ready', 'arch-go', 'arch-leave');
  const reset = () => { open(); leaving = false; const m = document.querySelector('.menu'); if (m) { m.classList.remove('open'); m.setAttribute('aria-hidden', 'true'); } };
  if (page) page.addEventListener('animationend', e => { if (e.animationName === 'archopen') h.classList.remove('arch-ready', 'arch-go'); });
  addEventListener('pageshow', e => { if (e.persisted) reset(); });
  const arrive = () => {
    // open when the visible part is ready: fonts and the first photo on screen, never later than 900ms
    const go = () => { if (h.classList.contains('arch-go')) return; requestAnimationFrame(() => requestAnimationFrame(() => h.classList.add('arch-go'))); };
    const img = [...document.querySelectorAll('.page img')].find(i => { const r = i.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight && r.width > 80; });
    Promise.all([document.fonts ? document.fonts.ready : 0, img && !img.complete ? (img.decode ? img.decode().catch(() => {}) : new Promise(r => img.addEventListener('load', r, {once: true}))) : 0]).then(go);
    setTimeout(go, 900);
    setTimeout(() => h.classList.remove('arch-ready', 'arch-go'), 2600);   // never leave the page clipped
  };
  if (h.classList.contains('arch-ready')) arrive();
  // a page prerendered by js/prefetch.js ran its head check before the click: close it as it is shown, then open as usual
  if (document.prerendering && on) document.addEventListener('prerenderingchange', () => { h.classList.add('arch-ready'); arrive(); }, {once: true});
  if (!on) { open(); return; }
  const prefetched = new Set();
  const prefetch = href => { if (prefetched.has(href)) return; prefetched.add(href); const l = document.createElement('link'); l.rel = 'prefetch'; l.href = href; document.head.appendChild(l); };
  document.addEventListener('click', e => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a[href]'); if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
    const u = new URL(a.href, location.href);
    if (!/^(https?|file):$/.test(u.protocol) || u.origin !== location.origin) return;
    if (u.pathname === location.pathname && u.search === location.search) {
      if (!u.hash) { e.preventDefault(); const m = document.querySelector('.menu.open'); if (m) { m.classList.remove('open'); m.setAttribute('aria-hidden', 'true'); } scrollTo({top: 0, behavior: 'smooth'}); }
      return;
    }
    e.preventDefault(); if (leaving) return; leaving = true;
    if (u.protocol !== 'file:') prefetch(a.href);                          // fetch the next page while the blinds close
    try { sessionStorage.setItem('iep-arch', '1'); } catch (er) {}
    h.classList.remove('arch-ready', 'arch-go'); h.classList.add('arch-leave');
    setTimeout(() => { location.href = a.href; setTimeout(reset, 3000); }, 620);   // if the browser never leaves, open the page again
  }, true);
})();

/* Fixed bar and Home's travelling logo (16 Nov). CSS in css/site.css "Fixed bar".
   The bar never changes size and has no fill: a soft, masked backdrop blur everywhere. Its text is light over photographs and ink over
   paper, decided by what is under the bar (with hysteresis, so no scroll position can flicker) and crossfaded.
   On Home the big hero logo moves to a fixed layer: it stays put for the first stretch of scroll, then travels and shrinks into the bar's
   logo slot, docking just before "Long tables under late Italian light." would reach it; that line fades out as it docks.
   Scroll-linked, so scrolling back reverses it exactly; it turns raspberry over the last quarter of the travel. */
(() => {
  const bar = document.querySelector('.bar'), page = document.querySelector('.page'); if (!bar || !page) return;
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hl = document.querySelector('.hero-logo'), slot = bar.querySelector('.logo .lw'), line = document.querySelector('.hv-line');
  let fly = null, fw, fb;
  if (hl && slot) {
    fly = document.createElement('a'); fly.className = 'fly-logo'; fly.href = 'home-v3.html'; fly.tabIndex = -1;
    fly.setAttribute('aria-label', 'Italian Event Planners, home');
    fly.innerHTML = '<img class="fw" src="brand/logo-white.svg" alt=""><img class="fb" src="brand/logo-brand.svg" alt="" style="opacity:0">';
    page.appendChild(fly); fw = fly.children[0]; fb = fly.children[1];
    hl.style.visibility = 'hidden'; bar.querySelector('.logo').style.visibility = 'hidden';
  }
  const clamp = v => Math.max(0, Math.min(1, v)), lerp = (a, b, t) => a + (b - a) * t;
  // what is under the bar: a photograph or dark surface (light text) or paper (ink text)
  const skip = e => e.closest('.bar,.fly-logo,.wa,.menu');
  const lum = c => { const m = c.match(/[\d.]+/g); if (!m || (m[3] !== undefined && +m[3] < .5)) return null; return (.2126 * m[0] + .7152 * m[1] + .0722 * m[2]) / 255; };
  function darkAt(x, y){
    for (const e of document.elementsFromPoint(x, y)) {                         // top to bottom: the first opaque surface decides
      if (skip(e) || e === document.documentElement) continue;
      if (/^(IMG|VIDEO|PICTURE|CANVAS)$/.test(e.tagName)) return true;
      const cs = getComputedStyle(e);
      if (cs.backgroundImage !== 'none' && !/gradient/.test(cs.backgroundImage)) return true;
      const l = lum(cs.backgroundColor); if (l !== null) return l < .45;
    }
    return false;
  }
  let dark = null, queued = false;
  const zones = [...bar.children];
  function frame(){
    queued = false;
    const y = scrollY;
    if (fly) {
      const N = hl.getBoundingClientRect(), D = slot.getBoundingClientRect();
      const s0 = Math.round(innerHeight * .1);                                    // linger before it starts to move
      const s1 = line ? Math.max(s0 + 1, line.getBoundingClientRect().top + y - D.bottom - 14) : Math.max(s0 + 1, N.top + y - D.top);
      let p = clamp((y - s0) / (s1 - s0)); if (still) p = p >= 1 ? 1 : 0;
      const k = lerp(1, D.width / N.width, p);
      const cx = lerp(N.left + N.width / 2, D.left + D.width / 2, p), cy = lerp(N.top + N.height / 2, D.top + D.height / 2, p);
      fly.style.width = N.width + 'px'; fly.style.height = N.height + 'px';
      fly.style.transform = `translate(${cx - k * N.width / 2}px,${cy - k * N.height / 2}px) scale(${k})`;
      const c = clamp((p - .75) / .25); fb.style.opacity = c; fw.style.opacity = 1 - c;
      const d = p >= 1; fly.classList.toggle('docked', d); fly.tabIndex = d ? 0 : -1;
      if (line) { const f = clamp((y - (s1 - 110)) / 110); if (f > 0 || line.dataset.f) { line.style.opacity = 1 - f; line.dataset.f = f > 0 ? '1' : ''; if (!f) line.style.opacity = ''; } }
    }
    // each part of the bar (menu, logo, languages + plan) reads what is under itself: light over a photograph, ink over paper.
    // Sampled at the part's left, middle and right; nothing here changes the bar's size, so no position can oscillate.
    let photos = 0;
    zones.forEach(z => {
      const r = z.getBoundingClientRect(), yy = Math.min(innerHeight - 1, r.top + r.height / 2);
      const n = [.1, .5, .9].reduce((s, f) => s + (darkAt(r.left + r.width * f, yy) ? 1 : 0), 0), on = n >= 2;
      if (z._on !== on) { z._on = on; z.classList.toggle('z-photo', on); z.classList.toggle('z-paper', !on); }
      photos += on;
    });
    const want = photos >= 2;
    if (want !== dark) { dark = want; bar.classList.toggle('dark', !dark); bar.classList.toggle('over-photo', dark); }
  }
  const req = () => { if (!queued) { queued = true; requestAnimationFrame(frame); } };
  addEventListener('scroll', req, {passive: true}); addEventListener('resize', req); addEventListener('load', req);
  if (document.fonts) document.fonts.ready.then(req);
  frame();
})();
