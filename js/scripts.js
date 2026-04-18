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
  const arrowLeft = lightbox?.querySelector('.lightbox__arrow--left');
  const arrowRight = lightbox?.querySelector('.lightbox__arrow--right');

  if (!lightbox || !lightboxImg || !closeBtn) return;

  // MINDEN képet összegyűjtünk (lapozáshoz)
  const images = [...document.querySelectorAll('.test-img')];
  let currentIndex = 0;

  document.body.addEventListener('click', (e) => {
    const img = e.target.closest('.test-img');
    if (!img) return;

    // aktuális kép indexe
    currentIndex = images.indexOf(img);

    openLightbox();
  });

  function openLightbox() {
    const img = images[currentIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    lightboxImg.alt = '';
  }

  closeBtn.addEventListener('click', closeLightbox);

  arrowLeft.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    openLightbox();
  });

  arrowRight.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    openLightbox();
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }

    if (e.key === 'ArrowLeft' && lightbox.classList.contains('is-open')) {
      arrowLeft.click();
    }

    if (e.key === 'ArrowRight' && lightbox.classList.contains('is-open')) {
      arrowRight.click();
    }
  });
});