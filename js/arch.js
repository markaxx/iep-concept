(() => {
  const shot = location.search.includes('shot'), still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (shot || still) return;
  const h = document.documentElement; h.classList.add('arch-ready');
  document.querySelector('.page')?.addEventListener('animationend', e => { if (e.animationName === 'archopen') { h.classList.remove('arch-ready'); document.querySelector('.page').style.clipPath = 'none'; } });
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href]'); if (!a || e.metaKey || e.ctrlKey || a.target === '_blank') return;
    const u = new URL(a.href, location.href); if (u.origin !== location.origin || (u.pathname === location.pathname && u.hash)) return;
    e.preventDefault(); e.stopImmediatePropagation(); h.classList.add('arch-leave'); setTimeout(() => location.href = a.href, 650);
  }, true);
})();
