/**
 * Modern Brands Carousel Module
 * Implementación moderna con JavaScript puro sin dependencias
 * Carrusel con loop infinito super suave
 */

export function initBrandsCarousel() {
  try {
    const carouselContainer = document.querySelector(
      '.brands-carousel-container'
    );
    if (!carouselContainer) {
      console.warn('Brands carousel container not found');
      return;
    }

    const carousel = carouselContainer.querySelector('.brands-carousel');
    const track = carousel.querySelector('.brands-track');
    const prevButton = carouselContainer.querySelector('.prev-button');
    const nextButton = carouselContainer.querySelector('.next-button');

    // Verificar que todos los elementos necesarios existan
    if (!carousel || !track || !prevButton || !nextButton) {
      console.warn('Some carousel elements are missing');
      return;
    }

    // Asegurar que el track esté visible
    track.style.display = 'flex';

    // Obtener elementos iniciales (antes de clonar)
    const items = Array.from(track.querySelectorAll('.brand-item'));
    if (items.length === 0) {
      console.warn('No brand items found in carousel');
      return;
    }

    // Configuración
    const totalItems = items.length;
    let position = 0;
    let animationFrameId = null;
    let autoplayTimeoutId = null;
    let isTransitioning = false;

    // Clonar elementos para crear un bucle infinito y suave
    const cloneItems = () => {
      // Limpiar clones existentes si los hay
      track.querySelectorAll('.clone').forEach((clone) => clone.remove());

      // Añadir clones al final y al principio para loop infinito
      const firstClones = items.slice(0, 3).map((item) => item.cloneNode(true));
      const lastClones = items.slice(-3).map((item) => item.cloneNode(true));

      // Añadir clases para identificarlos
      firstClones.forEach((clone) => clone.classList.add('clone'));
      lastClones.forEach((clone) => clone.classList.add('clone'));

      // Añadirlos al track
      lastClones.forEach((clone) =>
        track.insertBefore(clone, track.firstChild)
      );
      firstClones.forEach((clone) => track.appendChild(clone));

      // Importante: Esperar al siguiente frame para asegurar el render
      requestAnimationFrame(() => {
        // Actualizar posición inicial para mostrar los items reales
        setPositionWithoutAnimation(lastClones.length);
        position = lastClones.length;
      });
    };

    // Inicializar carrusel de manera más robusta
    function initCarousel() {
      // Inicialización con retraso para asegurar que los elementos estén completamente cargados
      setTimeout(() => {
        // Clonar elementos
        cloneItems();

        // Establecer visibilidad después de inicializar
        track.style.opacity = '1';

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
      }, 50); // Retraso de 50ms para asegurar carga de elementos
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

    // Obtener el ancho de un item basado en viewport
    function getItemWidth() {
      const firstItem = track.querySelector('.brand-item');
      if (!firstItem) return 200; // Valor por defecto si no se encuentra ningún elemento

      // Calcular el ancho total incluyendo el padding
      const computedStyle = window.getComputedStyle(firstItem);
      const width = firstItem.offsetWidth;

      // Asegurarse de que el ancho nunca sea 0 o negativo
      return width > 0 ? width : 200;
    }

    // Establecer posición sin animación
    function setPositionWithoutAnimation(pos) {
      if (!track) return; // Verificación adicional

      const itemWidth = getItemWidth();
      const offset = -pos * itemWidth;

      track.style.transition = 'none';
      track.style.transform = `translateX(${offset}px)`;

      // Forzar reflow para aplicar los cambios
      track.offsetHeight;
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
  } catch (error) {
    console.error('Error initializing brands carousel:', error);
  }
}
