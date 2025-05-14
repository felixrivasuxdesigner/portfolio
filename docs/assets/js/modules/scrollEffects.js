/**
 * Scroll Effects Module
 * Maneja efectos durante el scroll como parallax y cambios en el header
 */

export function initScrollEffects() {
  const header = document.getElementById('header');
  const languageSelector = document.querySelector('.language-selector');
  const breadcrumbs = document.getElementById('breadcrumb');
  const parallaxElements = document.querySelectorAll('[data-parallax-bg-img]');
  const progressBars = document.querySelectorAll('.progress-bar');

  // Manejar cambio de estilo del header durante scroll
  const handleScroll = () => {
    if (window.scrollY > 100) {
      if (header) header.classList.add('fixed');
      if (languageSelector) languageSelector.classList.add('fixed');
      if (breadcrumbs) breadcrumbs.classList.add('is-sticky');
    } else {
      if (header) header.classList.remove('fixed');
      if (languageSelector) languageSelector.classList.remove('fixed');
      if (breadcrumbs) breadcrumbs.classList.remove('is-sticky');
    }
  };
  
  // Asegurarse de que el header comience como transparente
  if (header) header.classList.remove('fixed');
  if (languageSelector) languageSelector.classList.remove('fixed');
  if (breadcrumbs) breadcrumbs.classList.remove('is-sticky');
  
  // Aplicar durante el scroll
  window.addEventListener('scroll', handleScroll);

  // Animar barras de progreso cuando son visibles
  if (progressBars.length > 0) {
    // Restablecer todas las barras a ancho 0 inicialmente
    progressBars.forEach(bar => {
      bar.style.width = '0%';
    });
    
    // Función para verificar si un elemento es visible
    const isElementInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
      );
    };

    // Función para animar las barras de progreso
    const animateProgressBars = () => {
      progressBars.forEach((bar) => {
        if (isElementInViewport(bar) && !bar.classList.contains('animated')) {
          const progressValue = bar.getAttribute('data-progress');
          setTimeout(() => {
            bar.style.width = `${progressValue}%`;
          }, 100); // Pequeño retraso para asegurar que la transición funcione
          bar.classList.add('animated');
        }
      });
    };

    // Ejecutar al cargar y durante el scroll
    window.addEventListener('load', animateProgressBars);
    window.addEventListener('scroll', animateProgressBars);
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
