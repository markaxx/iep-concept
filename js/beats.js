// Shared renderer for story pages told in beats. Each story page loads its own data file (window.BEATS) first, then this file.
// Beat types and their fields are documented in /mnt/project-files/stories/STORY-PLAYBOOK.md.
// Type roles (see css/beats.css): the first paragraph of a beat is its lead line, set larger; later paragraphs are body.
(() => {
  const B = window.BEATS, I = n => `img/g/${n.split('|')[0]}.jpg`;
  const F = n => n.includes('|') ? ` style="object-position:${n.split('|')[1]}"` : ''; // optional focal point: 'n/name|50% 75%'
  const arr = a => Array.isArray(a) ? a : [a];
  const P = a => arr(a).map((x, k) => `<p${k ? '' : ' class="lead"'}>${x}</p>`).join('');
  const ch = b => b.ch ? `<h2 class="bt-ch">${b.ch}</h2>` : '';
  const cite = b => `<cite>${b.by}</cite>`;
  const fig = (m, c = '') => `<figure${c ? ` class="${c}"` : ''}><img src="${I(m)}"${F(m)} alt=""></figure>`;
  // real client quotes: the site-wide pink quote (.pq in css/site.css), marks added by CSS; invented spoken lines: large ink type
  const after = b => b.after ? `<p class="after">${b.after}</p>` : '';
  const q = (b, real) => real
    ? `<div class="bt-q"><blockquote class="pq"><p>${b.text}</p><cite>&mdash; ${b.by}</cite></blockquote>${after(b)}</div>`
    : `<blockquote class="spoken"><p>&ldquo;${b.text}&rdquo;</p>${cite(b)}${b.after ? `<p class="after">${b.after}</p>` : ''}</blockquote>`;
  // a message someone sent, set as plain type with who and when beneath it: never a card or box
  const msg = b => `<div class="bt-said"><p class="said">${b.msg}</p><span class="bt-from">${b.from}, ${b.time}</span></div>`;
  const facts = () => B.facts && B.facts.length ? `<dl class="facts">${B.facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>` : ''; // the real/retold note was removed at Mark's request (16 Nov); the record lives in stories/
  let factsShown = false;
  const R = {
    // sticky photo beside 1-3 paragraphs; the photo can change per paragraph; no photos gives a text beat on stone
    split: b => `<section class="bt split ${b.side === 'l' ? 'l' : 'r'}${b.imgs.length ? '' : ' noimg'}"><div class="bt-media">${b.imgs.map((m, k) => `<img src="${I(m)}"${F(m)} alt=""${k ? '' : ' class="on"'}>`).join('')}</div><div class="bt-text">${arr(b.p).map((x, k) => `<div class="bt-step${k ? '' : ' on'}" data-k="${k}">${k ? '' : ch(b)}<p${k ? '' : ' class="lead"'}>${x}</p></div>`).join('')}</div></section>`,
    // a large photograph to one edge of the page, the text in the remaining column on paper (side = where the text sits)
    overlay: b => `<section class="bt overlay ${b.side === 'l' ? 'l' : 'r'}">${fig(b.img)}<div class="panel">${ch(b)}${P(b.p)}</div></section>`,
    // retired as a card (Mark, 16 Nov: no card motif). Older data still renders, as a plain text beat with an optional photo.
    note: b => R.split({imgs: b.img ? [b.img] : [], side: b.side, p: [b.hand, ...arr(b.p)]}),
    // real (q:true) quotes are set in raspberry; invented spoken lines in ink
    quote: b => `<section class="bt quote ${b.side === 'l' ? 'l' : 'r'}${b.small ? ' small' : ''}${b.img ? '' : ' noimg'}${b.q ? ' isreal' : ''}">${q(b, b.q)}${b.img ? fig(b.img) : ''}</section>`,
    // retired (Mark, 16 Nov): numbers and timetable. Kept only so older data files do not break.
    numbers: b => `<section class="bt split noimg"><div class="bt-media"></div><div class="bt-text"><div class="bt-step on">${ch(b)}<p class="lead">${b.p}</p></div></div></section>`,
    timetable: b => `<section class="bt split noimg"><div class="bt-media"></div><div class="bt-text"><div class="bt-step on"><p class="lead">${b.p}</p></div></div></section>`,
    // a message, with an optional photograph beside it (no photo gives a text beat on stone)
    phone: b => `<section class="bt phone${b.img ? ' hasimg' : ''}">${b.img ? fig(b.img) : ''}${msg(b)}<div class="aside">${P(b.p)}</div></section>`,
    // a full-width photograph, then the message and the words beside it on paper
    bleedmsg: b => `<section class="bt bleedmsg"><div class="ph"><div class="im"><img class="bg" src="${I(b.img)}" alt=""></div></div><div class="cap">${msg(b)}${ch(b)}<div>${P(b.p)}</div></div></section>`,
    bleed: b => `<section class="bt bleed"><div class="ph"><img class="bg" src="${I(b.img)}"${F(b.img)} alt=""></div><div class="cap">${b.ch ? `<h2 class="bt-ch">${b.ch}</h2>` : '<span></span>'}<div>${P(b.p)}</div></div></section>`,
    big: b => `<section class="bt big">${fig(b.img)}${q(b, b.q)}</section>`,
    bleedquote: b => `<section class="bt bleedquote"><div class="ph"><img class="bg" src="${I(b.img)}" alt=""></div>${q(b, true)}</section>`,
    // a custom or tradition: photograph, a short title, the explanation (h defaults to Five almonds for Capri)
    five: b => `<section class="bt five">${b.img ? fig(b.img) : ''}<div><h3 class="bt-ch">${b.h || 'Five almonds'}</h3>${P(b.p)}</div></section>`,
    // words written on something (a place card): the photograph, and beside it the words set as type, never a card laid on the photo
    card: b => `<section class="bt card">${fig(b.img)}<div class="aside"><div class="says"><p class="gr" lang="el">${b.greek}</p><p class="en">${b.en}</p></div>${P(b.p)}</div></section>`,
    // the ending: the founders, the couple's last real line, and the facts of the wedding in one composed piece
    closing: b => { factsShown = true; return `<section class="bt closing"><div class="pair">${b.imgs.map(m => `<img src="${I(m)}" alt="">`).join('')}</div><div class="txt">${q(b, true)}${facts()}</div></section>`; }
  };
  const nx = B.next; // {href, cover, title, dek?}
  const body = B.beats.map(b => R[b.t](b)).join('');
  document.getElementById('pg').innerHTML = `
  <header class="bt-cover"><img src="${I(B.cover)}" alt="${B.coverAlt || ''}"><div class="in"><h1>${B.title}</h1><p class="line">${B.line}</p></div></header>
  <section class="bt-lede"><figure><img src="${I(B.ledeImg)}" alt=""></figure><div><p>${B.lede}</p><small>${B.byline}</small></div></section>
  ${body}
  ${factsShown ? '' : `<section class="bt closing nofig"><div class="txt">${facts()}</div></section>`}
  <section class="bt-end">
    ${nx ? `<a class="nx" href="${nx.href}"><figure><img src="${I(nx.cover)}" alt=""></figure><div><b>${nx.title}</b><span>${nx.dek || 'Read the next wedding'} <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></div></a>` : ''}
    <div class="bt-plan"><p>Tell us about yours.</p><a href="plan.html">Start planning</a></div>
  </section>`;

  // two flat text bands of the same colour never touch: a text-only beat takes the other surface
  const flat = s => s.matches('.split.noimg,.quote.noimg,.phone:not(.hasimg)');
  const bg = s => getComputedStyle(s).backgroundColor;
  let prev = null;
  document.querySelectorAll('#pg > section, #pg > header').forEach(s => {
    if (prev && flat(s) && bg(s) === bg(prev)) { s.classList.add('flip-stone'); if (bg(s) === bg(prev)) { s.classList.remove('flip-stone'); s.classList.add('flip-paper'); } }
    prev = s; });
  // a portrait photograph is never forced into a full-width band: the bleed beat turns into photo beside words
  document.querySelectorAll('.bt.bleed img.bg').forEach(im => { const m = () => { if (im.naturalHeight > im.naturalWidth) im.closest('.bt').classList.add('tall'); }; im.complete ? m() : im.addEventListener('load', m); });
  const shot = location.search.includes('shot');
  if (shot) document.querySelectorAll('.bt-step').forEach(x => x.classList.add('on'));
  // split beats: photo swaps as each paragraph reaches the middle of the screen
  const io = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; const st = e.target, s = st.closest('.split'), k = +st.dataset.k;
    s.querySelectorAll('.bt-step').forEach(x => x.classList.toggle('on', x === st));
    const ims = s.querySelectorAll('.bt-media img'); if (ims.length > 1) ims.forEach((im, j) => im.classList.toggle('on', j === Math.min(k, ims.length - 1))); }), {rootMargin: '-45% 0px -45% 0px'});
  if (!shot) document.querySelectorAll('.split:not(.noimg) .bt-step').forEach(x => io.observe(x));

  addEventListener('DOMContentLoaded', () => {   // not 'load': waiting for every photograph let readers see the text, then hid it and faded it in again
    if (shot || !window.gsap || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ease = 'power3.out';
    gsap.utils.toArray('.bt img.bg').forEach(img => gsap.fromTo(img, {yPercent: -4, scale: 1.08}, {yPercent: 4, scale: 1.08, ease: 'none', scrollTrigger: {trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true}}));
    gsap.utils.toArray('.bt figure, .bt .pair img, .bt-end figure').forEach(el => gsap.fromTo(el, {clipPath: 'inset(8% 0 0 0)', opacity: 0}, {clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: 1.4, ease, scrollTrigger: {trigger: el, start: 'top 88%'}}));
    gsap.utils.toArray('.bt blockquote.spoken, .bt .bt-q, .bt .bt-said, .bt .panel, .bt .aside, .bt .cap, .bt.five > div, .bt .facts, .bt-lede p, .split.noimg .bt-text').forEach(el => gsap.from(el, {y: 24, opacity: 0, duration: 1.2, ease, scrollTrigger: {trigger: el, start: 'top 90%'}}));
  });
})();
