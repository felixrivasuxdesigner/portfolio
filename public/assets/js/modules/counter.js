/**
 * Counter Module
 * Controla la animación de conteo de números
 */

export function initCounter() {
  const counterElements = document.querySelectorAll('.CounterUp');

  if (counterElements.length === 0) return;

  // Opciones para el observador de intersección
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  // Función para animar el contador
  const animateCounter = (element, finalValue) => {
    let startTime = null;
    const duration = 2000; // Duración en ms
    const start = 0;

    // Función de easing para una animación suave
    const easeOutQuad = (t) => t * (2 - t);

    // Función de animación
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutQuad(progress);
      const value = Math.floor(start + (finalValue - start) * easedProgress);
      element.textContent = value;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  // Función callback para el observador
  const handleIntersect = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counterElement = entry.target;
        const finalValue = parseInt(counterElement.textContent, 10);

        // Establecer valor inicial a cero
        counterElement.textContent = '0';

        // Iniciar animación
        animateCounter(counterElement, finalValue);

        // Dejar de observar después de animar
        observer.unobserve(counterElement);
      }
    });
  };

  // Crear observador de intersección
  const observer = new IntersectionObserver(handleIntersect, options);

  // Observar cada elemento contador
  counterElements.forEach((counter) => {
    observer.observe(counter);
  });
}
