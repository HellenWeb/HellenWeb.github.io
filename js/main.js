(() => {
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById('year').textContent = new Date().getFullYear();

  // 1. Заголовок: разбиваем на буквы, каждая выезжает из-под маски
  const h1 = document.querySelector('h1');
  const text = h1.textContent;
  h1.setAttribute('aria-label', text);
  h1.textContent = '';
  [...text].forEach((ch, i) => {
    const mask = document.createElement('span');
    const letter = document.createElement('span');
    mask.className = 'ch';
    mask.setAttribute('aria-hidden', 'true');
    letter.textContent = ch;
    letter.style.setProperty('--d', `${250 + i * 90}ms`);
    mask.append(letter);
    h1.append(mask);
  });

  // 2. Появление при скролле + очередь внутри каждой сетки
  document.querySelectorAll('.grid').forEach(g =>
    [...g.children].forEach((c, i) => c.style.setProperty('--i', i)));
  const items = document.querySelectorAll('.card, [data-reveal]');
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: .15, rootMargin: '0px 0px -60px 0px' });
    items.forEach(el => io.observe(el));
  }

  // 3. Плавающая «капля» в навигации
  const nav = document.getElementById('pills');
  const glide = nav.querySelector('.glide');
  const links = [...nav.querySelectorAll('[data-nav]')];
  let active = null;
  const move = el => {
    if (!el) { glide.style.opacity = 0; return; }
    glide.style.opacity = 1;
    glide.style.width = el.offsetWidth + 'px';
    glide.style.transform = `translateX(${el.offsetLeft}px)`;
  };
  links.forEach(l => {
    l.addEventListener('mouseenter', () => move(l));
    l.addEventListener('focus', () => move(l));
  });
  nav.addEventListener('mouseleave', () => move(active));
  nav.addEventListener('focusout', () => move(active));
  addEventListener('resize', () => move(active));
  const spy = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) {
      active = links.find(l => l.dataset.nav === e.target.id) || null;
      move(active);
    }
  }), { rootMargin: '-45% 0px -50% 0px' });
  ['work', 'about', 'contact'].forEach(id => spy.observe(document.getElementById(id)));
  addEventListener('scroll', () => { if (scrollY < 200) { active = null; move(null); } }, { passive: true });

  // 4. Параллакс фона с инерцией (lerp), цикл останавливается, когда всё устоялось
  if (reduced) return;
  let target = scrollY, current = scrollY, running = false;
  const tick = () => {
    current += (target - current) * .08;
    root.style.setProperty('--sy', current.toFixed(1));
    if (Math.abs(target - current) > .1) requestAnimationFrame(tick);
    else running = false;
  };
  addEventListener('scroll', () => {
    target = scrollY;
    if (!running) { running = true; requestAnimationFrame(tick); }
  }, { passive: true });
})();