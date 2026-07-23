// HellenWeb Portfolio - Beautiful JS
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu
  const burger = document.getElementById('burger');
  const navLinks = document.querySelector('.nav__links');
  
  if (burger) {
    burger.addEventListener('click', () => {
      document.body.classList.toggle('menu-open');
      const isExpanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', !isExpanded);
    });
  }

  // Close mobile menu on link click
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        document.body.classList.remove('menu-open');
        if (burger) burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll navbar effect
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (nav) {
      if (currentScroll > 50) {
        nav.classList.add('is-scrolled');
      } else {
        nav.classList.remove('is-scrolled');
      }

      if (currentScroll > lastScroll && currentScroll > 300) {
        nav.style.transform = 'translateY(-100%)';
      } else {
        nav.style.transform = 'translateY(0)';
      }
    }
    lastScroll = currentScroll;
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(reveal => revealObserver.observe(reveal));

  // Beautiful Terminal Typing Effect
  const termBody = document.getElementById('termBody');
  if (termBody) {
    const commands = [
      { text: 'whoami', delay: 800, type: 'cmd' },
      { text: 'HellenWeb — fullstack dev', delay: 400, type: 'out' },
      { text: '', delay: 300 },
      { text: 'ls projects/', delay: 600, type: 'cmd' },
      { text: 'potolok_dekokhv-info  mern-app', delay: 500, type: 'out' },
      { text: '', delay: 200 },
      { text: 'echo "Programming as the meaning of life."', delay: 700, type: 'cmd' },
      { text: 'Programming as the meaning of life.', delay: 400, type: 'accent' },
      { text: '', delay: 600 },
      { text: 'git status', delay: 500, type: 'cmd' },
      { text: 'On branch main — ready for new projects 🚀', delay: 450, type: 'out' }
    ];

    let i = 0;

    function typeLine() {
      if (i >= commands.length) {
        setTimeout(() => {
          termBody.innerHTML = '';
          i = 0;
          typeLine();
        }, 4500);
        return;
      }

      const cmd = commands[i];
      const line = document.createElement('div');
      line.className = `tok-${cmd.type || 'out'}`;
      termBody.appendChild(line);

      if (cmd.text === '') {
        line.innerHTML = '&nbsp;';
        i++;
        setTimeout(typeLine, cmd.delay || 300);
        return;
      }

      let charIndex = 0;
      const text = cmd.text;

      function typeChar() {
        if (charIndex < text.length) {
          line.textContent += text.charAt(charIndex);
          charIndex++;
          setTimeout(typeChar, 20 + Math.random() * 35);
        } else {
          i++;
          setTimeout(typeLine, cmd.delay || 400);
        }
      }
      typeChar();
    }

    setTimeout(typeLine, 1000);
  }

  // To Top Button
  const toTop = document.getElementById('toTop');
  if (toTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        toTop.classList.add('is-visible');
      } else {
        toTop.classList.remove('is-visible');
      }
    });

    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  console.log('%cHellenWeb Portfolio loaded with love ❤️', 'color:#c9a227; font-family:monospace;');
});
