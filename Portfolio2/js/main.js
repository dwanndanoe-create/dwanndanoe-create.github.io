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

  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('vis');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    reveals.forEach(el => obs.observe(el));
  }

  const tlItems = document.querySelectorAll('.tl-item');
  tlItems.forEach(item => {
    item.addEventListener('touchstart', () => {
      tlItems.forEach(i => { if (i !== item) i.classList.remove('tl-active'); });
      item.classList.toggle('tl-active');
    }, { passive: true });
  });

  const cards = document.querySelectorAll('.proj-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--gx', `${e.clientX - r.left}px`);
      card.style.setProperty('--gy', `${e.clientY - r.top}px`);
    });

    card.addEventListener('touchstart', () => {
      cards.forEach(c => { if (c !== card) c.classList.remove('card-on'); });
      card.classList.toggle('card-on');
    }, { passive: true });
  });

  const form = document.getElementById('contactForm');
  if (form) {
    const fields = {
      name: {
        el: document.getElementById('f-name'),
        err: document.getElementById('e-name'),
        check(v) {
          if (!v.trim()) return 'Vul je naam in.';
          if (v.trim().length < 2) return 'Minimaal 2 tekens.';
          return '';
        }
      },
      email: {
        el: document.getElementById('f-email'),
        err: document.getElementById('e-email'),
        check(v) {
          if (!v.trim()) return 'Vul je e-mail in.';
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Ongeldig e-mailadres.';
          return '';
        }
      },
      subject: {
        el: document.getElementById('f-subject'),
        err: document.getElementById('e-subject'),
        check(v) {
          if (!v.trim()) return 'Vul een onderwerp in.';
          return '';
        }
      },
      message: {
        el: document.getElementById('f-message'),
        err: document.getElementById('e-message'),
        check(v) {
          if (!v.trim()) return 'Vul een bericht in.';
          if (v.trim().length < 10) return 'Minimaal 10 tekens.';
          return '';
        }
      }
    };

    Object.keys(fields).forEach(key => {
      const f = fields[key];
      f.el.addEventListener('input', () => {
        const msg = f.check(f.el.value);
        f.err.textContent = msg;
        f.el.classList.remove('err', 'ok');
        if (f.el.value.trim() === '') return;
        f.el.classList.add(msg ? 'err' : 'ok');
      });
      f.el.addEventListener('blur', () => {
        const msg = f.check(f.el.value);
        f.err.textContent = msg;
        if (f.el.value.trim() !== '') {
          f.el.classList.add(msg ? 'err' : 'ok');
        }
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let fail = false;
      Object.keys(fields).forEach(key => {
        const f = fields[key];
        const msg = f.check(f.el.value);
        f.err.textContent = msg;
        f.el.classList.remove('err', 'ok');
        if (msg) { f.el.classList.add('err'); fail = true; }
        else { f.el.classList.add('ok'); }
      });
      if (fail) {
        const first = form.querySelector('.form-input.err');
        if (first) { first.style.animation = 'shake 0.4s ease'; setTimeout(() => first.style.animation = '', 400); first.focus(); }
        return;
      }

      const btn = form.querySelector('.btn');
      const orig = btn.textContent;
      btn.textContent = 'Versturen...';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = orig;
        btn.disabled = false;
        form.reset();
        Object.keys(fields).forEach(key => {
          fields[key].el.classList.remove('err', 'ok');
          fields[key].err.textContent = '';
        });
        const ok = document.querySelector('.form-success');
        if (ok) { ok.style.display = 'flex'; ok.style.animation = 'fadeUp 0.4s ease'; }
        setTimeout(() => { if (ok) ok.style.display = 'none'; }, 4000);
      }, 1200);
    });
  }

});