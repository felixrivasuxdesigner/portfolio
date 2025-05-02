/**
 * Scroll Effects Module
 * Maneja efectos durante el scroll como parallax y cambios en el header
 */

export function initScrollEffects() {
  const header = document.getElementById('header');
  const languageSelector = document.querySelector('.language-selector');
  const parallaxElements = document.querySelectorAll('[data-parallax-bg-img]');

  // Manejar cambio de estilo del header durante scroll
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.classList.add('fixed');
        if (languageSelector) {
          languageSelector.classList.add('fixed');
        }
      } else {
        header.classList.remove('fixed');
        if (languageSelector) {
          languageSelector.classList.remove('fixed');
        }
      }
    });
  }

  // Efecto parallax simple para fondos
  if (parallaxElements.length > 0) {
    window.addEventListener('scroll', () => {
      parallaxElements.forEach((element) => {
        const scrollPosition = window.scrollY;
        const elementOffset = element.offsetTop;
        const windowHeight = window.innerHeight;

        // Aplicar parallax solo cuando el elemento está visible en la ventana
        if (
          scrollPosition + windowHeight > elementOffset &&
          scrollPosition < elementOffset + element.offsetHeight
        ) {
          // Calcular posición de parallax (velocidad ajustable)
          const speed = 0.5; // Menor número = efecto más suave
          const yPos = -(scrollPosition - elementOffset) * speed;

          // Aplicar transformación
          element.style.backgroundPosition = `center ${yPos}px`;
        }
      });
    });
  }

  // Detectar elementos para animaciones de entrada
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length > 0) {
    // Función para verificar si un elemento es visible
    const isElementInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    };

    // Función para mostrar elementos cuando son visibles
    const handleScrollAnimation = () => {
      fadeElements.forEach((element) => {
        if (isElementInViewport(element)) {
          element.classList.add('visible');
        }
      });
    };

    // Ejecutar al cargar y durante el scroll
    window.addEventListener('load', handleScrollAnimation);
    window.addEventListener('scroll', handleScrollAnimation);
  }
}
