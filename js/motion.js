(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !window.gsap) { document.querySelectorAll('.reveal').forEach(e => e.classList.add('in')); return; }
  gsap.registerPlugin(ScrollTrigger);
  const shot = location.search.includes('shot');
  if (window.Lenis && !shot) { const l = new Lenis({lerp: .09}); l.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => l.raf(t * 1000)); gsap.ticker.lagSmoothing(0); }
  const ease = 'expo.out';
  document.querySelectorAll('.reveal').forEach(e => e.classList.add('in'));
  if (shot) return;
  // hero text
  if (document.querySelector('.hero-copy')) gsap.from('.hero-copy > *, .phero .hero-copy > *', {y: 18, opacity: 0, duration: 1.6, ease, stagger: .12, delay: .2});
  // image reveals: clip from bottom, slow settle
  document.querySelectorAll('.arch, .round, .dest, .tcard .tp, .hello .ph, .stack-img .small').forEach(el => {
    const img = el.querySelector('img');
    gsap.fromTo(el, {clipPath: 'inset(12% 0 0 0)'}, {clipPath: 'inset(0% 0 0 0)', duration: 1.6, ease, scrollTrigger: {trigger: el, start: 'top 88%'}});
    if (img) gsap.fromTo(img, {scale: 1.12}, {scale: 1, duration: 2.2, ease, scrollTrigger: {trigger: el, start: 'top 88%'}});
  });
  // text fade up
  gsap.utils.toArray('h2, .lead, .body-copy, .hw > div, .press, .featured, .link').filter(el => !el.closest('#pg.page > section, #pg.page > header')).forEach(el => {   // story beats animate their own text (js/beats.js); never fade it twice
    gsap.from(el, {y: 22, opacity: 0, duration: 1.3, ease, scrollTrigger: {trigger: el, start: 'top 90%'}});
  });
  // gentle parallax on full-bleed photos
  gsap.utils.toArray('.band img, .phero img').forEach(img => {
    gsap.fromTo(img, {yPercent: -6}, {yPercent: 6, ease: 'none', scrollTrigger: {trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true}});
  });
})();
