document.addEventListener('DOMContentLoaded', () => {

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      nav.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !nav.contains(e.target)) {
        toggle.classList.remove('open');
        nav.classList.remove('open');
      }
    });

    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        toggle.classList.remove('open');
        nav.classList.remove('open');
      });
    });
  }

  const cards = document.querySelectorAll('.proj-card');
  cards.forEach(card => {
    card.addEventListener('touchstart', () => {
      cards.forEach(c => { if (c !== card) c.classList.remove('card-on'); });
      card.classList.toggle('card-on');
    }, { passive: true });
  });

});