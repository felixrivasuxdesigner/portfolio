/**
 * Testimonials Module
 * Maneja la funcionalidad del carrusel de testimonios y el acordeón de FAQ
 */

export function initTestimonials() {
  // Inicializar carrusel de testimonios
  initTestimonialsCarousel();

  // Inicializar acordeón de preguntas frecuentes
  initFaqAccordion();
}

// Manejar el carrusel de testimonios
function initTestimonialsCarousel() {
  const navButtons = document.querySelectorAll('.testimonial-nav-btn');
  const testimonialItems = document.querySelectorAll('.testimonial-item');

  if (!navButtons.length || !testimonialItems.length) return;

  // Configurar el auto-rotación
  let currentIndex = 0;
  let testimonialInterval;

  // Iniciar el intervalo de rotación automática
  startAutoRotation();

  // Configurar manejadores de eventos para los botones de navegación
  navButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');

      // Ocultar todos los testimonios y desactivar todos los botones
      testimonialItems.forEach((item) => {
        item.classList.remove('active');
      });

      navButtons.forEach((btn) => {
        btn.classList.remove('active');
      });

      // Mostrar el testimonio seleccionado y activar el botón correspondiente
      document.getElementById(targetId).classList.add('active');
      button.classList.add('active');

      // Actualizar el índice actual para la rotación automática
      currentIndex = Array.from(navButtons).indexOf(button);

      // Reiniciar el intervalo de rotación automática
      stopAutoRotation();
      startAutoRotation();
    });
  });

  // Función para iniciar la rotación automática
  function startAutoRotation() {
    testimonialInterval = setInterval(() => {
      // Incrementar el índice actual
      currentIndex = (currentIndex + 1) % navButtons.length;

      // Simular clic en el botón de navegación correspondiente
      const nextButton = navButtons[currentIndex];
      nextButton.click();
    }, 5000); // Cambiar cada 5 segundos
  }

  // Función para detener la rotación automática
  function stopAutoRotation() {
    clearInterval(testimonialInterval);
  }

  // Pausar la rotación automática al pasar el cursor por encima de los testimonios
  document
    .querySelector('.testimonials-container')
    .addEventListener('mouseenter', stopAutoRotation);
  document
    .querySelector('.testimonials-container')
    .addEventListener('mouseleave', startAutoRotation);
}

// Manejar el acordeón de preguntas frecuentes
function initFaqAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  
  if (!accordionItems.length) return;
  
  // Ocultar todos los paneles excepto el primero
  let activePanel = null;
  let activeButton = null;
  
  // Configurar el estado inicial: abrir solo el primer panel
  if (accordionItems.length > 0) {
    const firstPanel = accordionItems[0].querySelector('.accordion-collapse');
    const firstButton = accordionItems[0].querySelector('.accordion-button');
    
    if (firstPanel && firstButton) {
      // Asegurarse de que el primer panel esté visible
      firstPanel.classList.add('show');
      
      // Actualizar referencias activas
      activePanel = firstPanel;
      activeButton = firstButton;
    }
    
    // Ocultar el resto de paneles
    for (let i = 1; i < accordionItems.length; i++) {
      const panel = accordionItems[i].querySelector('.accordion-collapse');
      const button = accordionItems[i].querySelector('.accordion-button');
      if (panel && button) {
        panel.classList.remove('show');
        button.classList.add('collapsed');
      }
    }
  }
  
  // Agregar listeners a los botones
  accordionItems.forEach(item => {
    const button = item.querySelector('.accordion-button');
    const panel = item.querySelector('.accordion-collapse');
    
    if (!button || !panel) return;
    
    button.addEventListener('click', () => {
      // Si este panel ya está activo, no hacemos nada (siempre debe haber uno abierto)
      if (panel === activePanel) return;
      
      // Animación para cerrar el panel activo actual con un ligero retraso
      if (activePanel) {
        if (activeButton) {
          activeButton.classList.add('collapsed');
        }
        
        activePanel.classList.remove('show');
        
        // Retraso leve para que no se vea abrupto
        setTimeout(() => {
          // Mostrar el nuevo panel con animación
          panel.classList.add('show');
          button.classList.remove('collapsed');
          
          // Actualizar las referencias activas
          activePanel = panel;
          activeButton = button;
        }, 100);
      } else {
        // Si no hay panel activo (caso improbable)
        panel.classList.add('show');
        button.classList.remove('collapsed');
        
        activePanel = panel;
        activeButton = button;
      }
    });
  });
}
