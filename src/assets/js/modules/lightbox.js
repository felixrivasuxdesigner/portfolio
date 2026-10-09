/**
 * Unified Lightbox Module
 * Sistema de visualización modal tipo Lightbox para galerías y capturas en casos de estudio.
 * Diseñado con estética Apple HIG (glassmorphism, animaciones suaves, navegación por teclado y gestos táctiles).
 */

export function initLightbox() {
  const lightbox = document.getElementById('case-study-lightbox');
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('#lightbox-img');
  const lightboxTitle = lightbox.querySelector('#lightbox-title');
  const lightboxCaption = lightbox.querySelector('#lightbox-caption');
  const counterCurrent = lightbox.querySelector('.lightbox-counter-current');
  const counterTotal = lightbox.querySelector('.lightbox-counter-total');
  const prevBtn = lightbox.querySelector('[data-lightbox-prev]');
  const nextBtn = lightbox.querySelector('[data-lightbox-next]');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const loader = lightbox.querySelector('.lightbox-loader');
  const stage = lightbox.querySelector('.lightbox-stage');

  let currentGroup = [];
  let currentIndex = 0;
  let isOpen = false;
  let lastActiveElement = null;

  // 1. Detectar y registrar todos los grupos de galerías
  // Cada contenedor de pantallas o galería funciona como su propio grupo contextual
  const groupContainers = document.querySelectorAll('.case-study-screens, .prototype-gallery, [data-lightbox-group]');

  if (groupContainers.length > 0) {
    groupContainers.forEach((container, groupIndex) => {
      // Buscar disparadores dentro de este contenedor
      const triggers = container.querySelectorAll(
        '[data-lightbox="gallery"], .screen-item__trigger, .gallery-item'
      );

      const items = [];

      triggers.forEach((trigger, itemIndex) => {
        const itemData = extractItemData(trigger);
        items.push(itemData);

        // Asociar evento de clic
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          lastActiveElement = trigger;
          open(items, itemIndex);
        });

        // Soporte de accesibilidad por teclado en elementos no-botón (Enter / Espacio)
        if (trigger.tagName !== 'BUTTON' && trigger.tagName !== 'A') {
          trigger.setAttribute('tabindex', '0');
          trigger.setAttribute('role', 'button');
          trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              lastActiveElement = trigger;
              open(items, itemIndex);
            }
          });
        }
      });
    });
  } else {
    // Si no hay contenedores de grupo, registrar triggers sueltos
    const standaloneTriggers = document.querySelectorAll('[data-lightbox="gallery"], .screen-item__trigger');
    if (standaloneTriggers.length > 0) {
      const items = Array.from(standaloneTriggers).map(extractItemData);
      standaloneTriggers.forEach((trigger, itemIndex) => {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          lastActiveElement = trigger;
          open(items, itemIndex);
        });
      });
    }
  }

  function extractItemData(el) {
    // Extraer ruta de imagen completa
    const src = el.getAttribute('data-src') ||
                el.getAttribute('href') ||
                el.querySelector('img')?.getAttribute('src') || '';

    // Extraer título
    const title = el.getAttribute('data-title') ||
                  el.closest('.screen-item')?.querySelector('h3')?.textContent?.trim() ||
                  el.querySelector('img')?.getAttribute('alt') || '';

    // Extraer pie de foto / descripción
    const caption = el.getAttribute('data-caption') ||
                    el.closest('.screen-item')?.querySelector('p')?.textContent?.trim() || '';

    const alt = el.querySelector('img')?.getAttribute('alt') || title || 'Vista ampliada';

    return { src, title, caption, alt };
  }

  function open(items, index) {
    if (!items || items.length === 0) return;
    currentGroup = items;
    currentIndex = index;
    isOpen = true;

    // Actualizar atributos de accesibilidad y visibilidad
    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.classList.add('active');

    // Bloquear scroll del documento sin saltos de layout
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';

    updateView();

    // Enfocar botón de cierre por accesibilidad
    if (closeBtn) {
      setTimeout(() => closeBtn.focus(), 50);
    }
  }

  function updateView() {
    if (!isOpen || !currentGroup[currentIndex]) return;

    const currentItem = currentGroup[currentIndex];

    // Mostrar spinner de carga si la imagen tarda en cargar
    if (loader) loader.classList.add('visible');
    lightboxImg.style.opacity = '0';

    // Precargar imagen
    const tempImg = new Image();
    tempImg.src = currentItem.src;
    tempImg.onload = () => {
      lightboxImg.src = currentItem.src;
      lightboxImg.alt = currentItem.alt;
      lightboxImg.style.opacity = '1';
      if (loader) loader.classList.remove('visible');
    };
    tempImg.onerror = () => {
      lightboxImg.src = currentItem.src;
      lightboxImg.alt = currentItem.alt;
      lightboxImg.style.opacity = '1';
      if (loader) loader.classList.remove('visible');
    };

    // Actualizar metadatos
    if (lightboxTitle) {
      if (currentItem.title) {
        lightboxTitle.textContent = currentItem.title;
        lightboxTitle.style.display = 'block';
      } else {
        lightboxTitle.style.display = 'none';
      }
    }

    if (lightboxCaption) {
      if (currentItem.caption) {
        lightboxCaption.textContent = currentItem.caption;
        lightboxCaption.style.display = 'block';
      } else {
        lightboxCaption.style.display = 'none';
      }
    }

    // Actualizar contador
    if (counterCurrent) counterCurrent.textContent = (currentIndex + 1).toString();
    if (counterTotal) counterTotal.textContent = currentGroup.length.toString();

    // Si solo hay una imagen, ocultar botones de navegación y contador
    const isSingle = currentGroup.length <= 1;
    if (prevBtn) prevBtn.style.display = isSingle ? 'none' : 'flex';
    if (nextBtn) nextBtn.style.display = isSingle ? 'none' : 'flex';
    const counterEl = lightbox.querySelector('.lightbox-counter');
    if (counterEl) counterEl.style.display = isSingle ? 'none' : 'block';

    // Precargar imágenes adyacentes para navegación instantánea
    preloadAdjacent();
  }

  function preloadAdjacent() {
    if (currentGroup.length <= 1) return;
    const nextIdx = (currentIndex + 1) % currentGroup.length;
    const prevIdx = (currentIndex - 1 + currentGroup.length) % currentGroup.length;

    const imgNext = new Image();
    imgNext.src = currentGroup[nextIdx].src;

    const imgPrev = new Image();
    imgPrev.src = currentGroup[prevIdx].src;
  }

  function next() {
    if (!isOpen || currentGroup.length <= 1) return;
    currentIndex = (currentIndex + 1) % currentGroup.length;
    updateView();
  }

  function prev() {
    if (!isOpen || currentGroup.length <= 1) return;
    currentIndex = (currentIndex - 1 + currentGroup.length) % currentGroup.length;
    updateView();
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;

    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');

    // Restaurar scroll
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';

    // Limpiar imagen tras transición para evitar parpadeos
    setTimeout(() => {
      if (!isOpen && lightboxImg) {
        lightboxImg.src = '';
      }
    }, 400);

    // Devolver foco al elemento disparador
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  }

  // 2. Controladores de eventos de la interfaz
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      close();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prev();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      next();
    });
  }

  // Cerrar al hacer clic en el backdrop o fuera del contenido
  lightbox.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-lightbox-close') || e.target === lightbox) {
      close();
    }
  });

  // 3. Soporte de teclado (Escape, Flechas)
  document.addEventListener('keydown', (e) => {
    if (!isOpen) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    }
  });

  // 4. Soporte para gestos táctiles (Swipe en móviles / tabletas)
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  if (stage) {
    stage.addEventListener('touchstart', (e) => {
      if (e.changedTouches.length === 1) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      }
    }, { passive: true });

    stage.addEventListener('touchend', (e) => {
      if (e.changedTouches.length === 1) {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
      }
    }, { passive: true });
  }

  function handleSwipe() {
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;

    // Solo considerar si el deslizamiento es predominantemente horizontal
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX < 0) {
        next(); // Swipe hacia la izquierda -> siguiente
      } else {
        prev(); // Swipe hacia la derecha -> anterior
      }
    }
  }

  // Exponer API global opcionalmente por compatibilidad
  window.PortfolioLightbox = {
    open,
    close,
    next,
    prev
  };
}
