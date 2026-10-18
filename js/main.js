/**
 * SDN Eventos - Scripts Principais
 * Funcionalidades: Menu Mobile, Carrossel de Fotos, Lightbox, Formulário WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Atualização automática do ano no rodapé
  const anoEl = document.getElementById('ano');
  if (anoEl) {
    anoEl.textContent = new Date().getFullYear();
  }

  // 2. Menu Mobile (Hambúrguer e Drawer)
  const hamburger = document.getElementById('hamburger');
  const navDrawer = document.getElementById('navDrawer');
  const navOverlay = document.getElementById('navOverlay');

  if (hamburger && navDrawer && navOverlay) {
    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !navDrawer.classList.contains('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      navDrawer.classList.toggle('open', isOpen);
      navOverlay.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    hamburger.addEventListener('click', () => toggleMenu());
    navOverlay.addEventListener('click', () => toggleMenu(false));
    navDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => toggleMenu(false));
    });
  }

  // 3. Animação de montagem das tendas (IntersectionObserver)
  document.documentElement.classList.add('js');
  const sizeCards = document.querySelectorAll('.size');
  if (sizeCards.length > 0) {
    const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduz || !('IntersectionObserver' in window)) {
      sizeCards.forEach((c) => c.classList.add('on'));
    } else {
      const io = new IntersectionObserver(
        (lista, obs) => {
          lista.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('on');
              obs.unobserve(e.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      sizeCards.forEach((c) => io.observe(c));
    }
  }

  // 4. Carrossel da Galeria e Lightbox
  const lb = document.getElementById('lightbox');
  const lbImg = lb ? lb.querySelector('img') : null;
  const track = document.getElementById('track');
  const thumbs = document.getElementById('thumbs');
  const count = document.getElementById('count');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');

  if (track) {
    const slides = [...track.querySelectorAll('.slide img')];
    let atual = 0;

    function ir(n) {
      const i = (n + slides.length) % slides.length;
      track.scrollTo({ left: i * track.clientWidth });
    }

    function marcar(i) {
      atual = i;
      if (count) count.textContent = `Foto ${i + 1} de ${slides.length}`;
      if (thumbs) {
        [...thumbs.children].forEach((b, k) => {
          b.setAttribute('aria-current', k === i ? 'true' : 'false');
          if (k === i) {
            thumbs.scrollTo({ left: b.offsetLeft - (thumbs.clientWidth - b.clientWidth) / 2 });
          }
        });
      }
    }

    slides.forEach((img, i) => {
      if (thumbs) {
        const b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', `Ver foto ${i + 1}`);

        const t = document.createElement('img');
        t.src = img.src;
        t.alt = `Miniatura da foto ${i + 1}`;
        t.loading = 'lazy';

        b.appendChild(t);
        b.addEventListener('click', () => ir(i));
        thumbs.appendChild(b);
      }

      if (lb && lbImg) {
        img.addEventListener('click', () => {
          lbImg.src = img.src;
          lbImg.alt = img.alt || `Foto ${i + 1} ampliada`;
          lb.classList.add('on');
        });
      }
    });

    if (prevBtn) prevBtn.addEventListener('click', () => ir(atual - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => ir(atual + 1));

    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        ir(atual - 1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        ir(atual + 1);
      }
    });

    let tmr;
    track.addEventListener('scroll', () => {
      clearTimeout(tmr);
      tmr = setTimeout(() => marcar(Math.round(track.scrollLeft / track.clientWidth)), 60);
    });

    window.addEventListener('resize', () => ir(atual));
    marcar(0);

    if (lb) {
      lb.addEventListener('click', () => lb.classList.remove('on'));
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') lb.classList.remove('on');
      });
    }
  }

  // 5. Formulário de Orçamento (envio direto para WhatsApp)
  const orcForm = document.getElementById('orcForm');
  if (orcForm) {
    orcForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const v = (id) => encodeURIComponent((document.getElementById(id)?.value || '').trim());
      const url =
        'https://wa.me/5514996025928?text=' +
        'Olá! Gostaria de um orçamento de locação de tendas.%0A' +
        'Nome: ' + v('nome') + '%0A' +
        'Telefone: ' + v('tel') + '%0A' +
        'Tamanho: ' + v('tam') + '%0A' +
        'Mensagem: ' + v('obs');

      const msgEl = document.getElementById('msg');
      if (msgEl) msgEl.textContent = 'Abrindo o WhatsApp com os seus dados...';
      window.location.href = url;
    });
  }

  // 6. Proteção contra cópia e inspeção (barreira de dissuasão)
  (function () {
    ['log', 'info', 'warn', 'error', 'debug', 'table', 'dir', 'trace'].forEach((k) => {
      try {
        console[k] = function () {};
      } catch (e) {}
    });

    const noElemento = (n) => n && (n.nodeType === 1 ? n : n.parentElement);
    const livre = (n) => {
      const el = noElemento(n);
      return !!(el && el.closest('input, textarea, select, .selectable'));
    };

    const bloquear = (e) => {
      if (!livre(e.target)) e.preventDefault();
    };

    ['contextmenu', 'dragstart', 'selectstart'].forEach((t) => document.addEventListener(t, bloquear));

    ['copy', 'cut'].forEach((t) =>
      document.addEventListener(
        t,
        (e) => {
          const sel = getSelection();
          if (!livre(e.target) && !livre(sel && sel.anchorNode)) e.preventDefault();
        },
        true
      )
    );

    document.addEventListener(
      'keydown',
      (e) => {
        const k = (e.key || '').toLowerCase();
        const c = e.ctrlKey || e.metaKey;
        const devtools =
          e.key === 'F12' ||
          (c && e.shiftKey && ['i', 'j', 'c', 'k'].includes(k)) ||
          (e.metaKey && e.altKey && ['i', 'j', 'u', 'c'].includes(k));
        const fonte = c && ['u', 's'].includes(k);
        const copiar = c && ['c', 'x', 'a'].includes(k) && !livre(e.target) && !livre(getSelection()?.anchorNode);

        if (devtools || fonte || copiar) e.preventDefault();
      },
      true
    );

    const aberto = () =>
      !matchMedia('(pointer: coarse)').matches &&
      (window.outerWidth - window.innerWidth > 200 || window.outerHeight - window.innerHeight > 200);

    const checar = () => document.documentElement.classList.toggle('bloq', aberto());
    setInterval(checar, 700);
    checar();
  })();
});
