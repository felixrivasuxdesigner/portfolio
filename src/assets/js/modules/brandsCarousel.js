/**
 * Modern Brands Carousel Module
 * Implementación moderna con JavaScript puro sin dependencias
 * Carrusel con loop infinito super suave
 */

export function initBrandsCarousel() {
  const carouselContainer = document.querySelector(
    '.brands-carousel-container'
  );
  if (!carouselContainer) return;

  const carousel = carouselContainer.querySelector('.brands-carousel');
  const track = carousel.querySelector('.brands-track');
  const items = Array.from(track.querySelectorAll('.brand-item'));
  const prevButton = carouselContainer.querySelector('.prev-button');
  const nextButton = carouselContainer.querySelector('.next-button');

  if (!track || items.length === 0 || !prevButton || !nextButton) return;

  // Configuración
  const totalItems = items.length;
  let position = 0;
  let animationFrameId = null;
  let autoplayTimeoutId = null;
  let isTransitioning = false;

  // Clonar elementos para crear un bucle infinito y suave
  const cloneItems = () => {
    // Añadir clones al final y al principio para loop infinito
    const firstClones = items.slice(0, 3).map((item) => item.cloneNode(true));
    const lastClones = items.slice(-3).map((item) => item.cloneNode(true));

    // Añadir clases para identificarlos
    firstClones.forEach((clone) => clone.classList.add('clone'));
    lastClones.forEach((clone) => clone.classList.add('clone'));

    // Añadirlos al track
    lastClones.forEach((clone) => track.insertBefore(clone, track.firstChild));
    firstClones.forEach((clone) => track.appendChild(clone));

    // Actualizar posición inicial para mostrar los items reales
    setPositionWithoutAnimation(lastClones.length);
    position = lastClones.length;
  };

  // Inicializar carrusel
  function initCarousel() {
    // Clonar elementos
    cloneItems();

    // Event listeners para los botones - con debounce para prevenir clics rápidos
    let clickTimeout;

    prevButton.addEventListener('click', function () {
      if (clickTimeout) clearTimeout(clickTimeout);
      movePrev();
      clickTimeout = setTimeout(() => {
        clickTimeout = null;
      }, 600);
    });

    nextButton.addEventListener('click', function () {
      if (clickTimeout) clearTimeout(clickTimeout);
      moveNext();
      clickTimeout = setTimeout(() => {
        clickTimeout = null;
      }, 600);
    });

    // Pausar al pasar el ratón
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // Los botones también deberían pausar el autoplay
    prevButton.addEventListener('mouseenter', stopAutoplay);
    nextButton.addEventListener('mouseenter', stopAutoplay);
    prevButton.addEventListener('mouseleave', startAutoplay);
    nextButton.addEventListener('mouseleave', startAutoplay);

    // Actualizar en cambio de tamaño con debounce
    let resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 100);
    });

    // Iniciar animación automática
    startAutoplay();
  }

  // Funciones de movimiento
  function moveNext() {
    if (isTransitioning) return;

    isTransitioning = true;
    position++;

    updateCarousel(() => {
      // Cuando llegamos al final, reiniciamos sin animación
      if (position >= totalItems + 3) {
        setPositionWithoutAnimation(3);
        position = 3;
      }
      isTransitioning = false;
    });
  }

  function movePrev() {
    if (isTransitioning) return;

    isTransitioning = true;
    position--;

    updateCarousel(() => {
      // Cuando llegamos al inicio, reiniciamos sin animación
      if (position < 3) {
        setPositionWithoutAnimation(totalItems + position);
        position = totalItems + position;
      }
      isTransitioning = false;
    });
  }

  // Actualizar carrusel con animación suave
  function updateCarousel(callback) {
    const itemWidth = getItemWidth();
    const offset = -position * itemWidth;

    // Transición suave
    track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
    track.style.transform = `translateX(${offset}px)`;

    // Asegurarse de que el callback se ejecute incluso si el evento transitionend es interrumpido
    const safeCallback = () => {
      track.removeEventListener('transitionend', safeCallback);
      if (callback && typeof callback === 'function') callback();
    };

    track.addEventListener('transitionend', safeCallback, { once: true });

    // Safety timeout - ejecutar callback si por alguna razón el evento transitionend no se dispara
    const safetyClearTimeout = setTimeout(() => {
      track.removeEventListener('transitionend', safeCallback);
      if (callback && typeof callback === 'function' && isTransitioning)
        callback();
    }, 700); // Ligeramente más largo que la duración de la transición
  }

  // Establecer posición sin animación
  function setPositionWithoutAnimation(pos) {
    const itemWidth = getItemWidth();
    const offset = -pos * itemWidth;

    track.style.transition = 'none';
    track.style.transform = `translateX(${offset}px)`;

    // Forzar reflow para aplicar los cambios
    track.offsetHeight;
  }

  // Obtener el ancho de un item basado en viewport
  function getItemWidth() {
    const firstItem = track.querySelector('.brand-item');
    return firstItem.offsetWidth;
  }

  // Autoplay con requestAnimationFrame para animación más suave
  function startAutoplay() {
    // Si ya está corriendo, no iniciar otro
    if (animationFrameId) return;

    stopAutoplay();

    let lastTime = 0;
    // Intervalo para el autoplay - un poco más largo para darle espacio a las transiciones
    const interval = 3000;

    function animate(currentTime) {
      if (!lastTime) lastTime = currentTime;

      const deltaTime = currentTime - lastTime;

      if (deltaTime > interval) {
        // Solo avanzar si no está en transición
        if (!isTransitioning) {
          moveNext();
        }
        lastTime = currentTime;
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  function stopAutoplay() {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }

    if (autoplayTimeoutId) {
      clearTimeout(autoplayTimeoutId);
      autoplayTimeoutId = null;
    }
  }

  function handleResize() {
    // Detener animación durante el resize
    stopAutoplay();

    // Establecer valor de transición a false para prevenir problemas
    isTransitioning = false;

    // Actualizar posición
    setPositionWithoutAnimation(position);

    // Reiniciar autoplay después de un breve retraso
    autoplayTimeoutId = setTimeout(startAutoplay, 500);
  }

  // Inicializar carrusel
  initCarousel();
}
