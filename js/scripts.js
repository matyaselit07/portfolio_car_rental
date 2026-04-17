document.addEventListener('DOMContentLoaded', () => {
  const STEP = 700;

  document.querySelectorAll('.gallery').forEach(gallery => {
    const films = gallery.querySelector('.films');
    const back  = gallery.querySelector('.js-backward');
    const fwd   = gallery.querySelector('.js-forward');

    if (!films) return;

    const clamp = (v) => Math.max(0, Math.min(v, films.scrollWidth - films.clientWidth));

    if (back) {
      back.addEventListener('click', (e) => {
        e.preventDefault();
        films.scrollTo({ left: clamp(films.scrollLeft - STEP), behavior: 'smooth' });
      });
    }

    if (fwd) {
      fwd.addEventListener('click', (e) => {
        e.preventDefault();
        films.scrollTo({ left: clamp(films.scrollLeft + STEP), behavior: 'smooth' });
      });
    }
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox?.querySelector('.lightbox__img');
  const closeBtn = lightbox?.querySelector('.lightbox__close');

  if (!lightbox || !lightboxImg || !closeBtn) return;

  document.body.addEventListener('click', (e) => {
    const img = e.target.closest('.test-img');
    if (!img) return;

    lightboxImg.src = img.src;           
    lightboxImg.alt = img.alt || '';     
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    closeBtn.focus();                    
  });

  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    lightboxImg.alt = '';
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeBtn.click();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeBtn.click();
    }
  });
});