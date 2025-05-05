/**
 * Accesibilidad - Mejoras para navegación por teclado y lectores de pantalla
 */

export function initAccessibility() {
  // Añadir roles ARIA a elementos clave
  addAriaAttributes();

  // Mejorar la navegación por teclado
  enhanceKeyboardNavigation();

  // Inicializar tooltips accesibles
  initAccessibleTooltips();
}

function addAriaAttributes() {
  // Añadir etiquetas ARIA a la navegación
  const nav = document.querySelector('.header--nav');
  if (nav) {
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', 'Navegación principal');
  }

  // Añadir etiquetas a los formularios
  const forms = document.querySelectorAll('form');
  forms.forEach((form, index) => {
    if (!form.getAttribute('aria-label')) {
      form.setAttribute('aria-label', `Formulario ${index + 1}`);
    }
  });

  // Añadir etiquetas a los botones sin texto
  const buttonsWithoutText = document.querySelectorAll(
    'button:not(:has(span)), a.btn--default:not(:has(span))'
  );
  buttonsWithoutText.forEach((button) => {
    if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
      // Si tiene un icono, intentamos usar eso para la etiqueta
      const icon = button.querySelector('i.fa, i.fas, i.fab');
      if (icon) {
        const iconClass = Array.from(icon.classList).find((cls) =>
          cls.startsWith('fa-')
        );

        if (iconClass) {
          const iconName = iconClass.replace('fa-', '');
          button.setAttribute('aria-label', iconName);
        }
      }
    }
  });
}

function enhanceKeyboardNavigation() {
  // Mejorar la navegación con teclado para el modal
  const modal = document.getElementById('hireMeModal');
  if (modal) {
    // Atrapar el foco dentro del modal cuando está abierto
    modal.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' && modal.classList.contains('show')) {
        const focusableElements = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // Si se presiona Shift+Tab y estamos en el primer elemento, vamos al último
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
        // Si se presiona Tab y estamos en el último elemento, vamos al primero
        else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  }

  // Mejorar la accesibilidad de las imágenes en la galería
  const galleryItems = document.querySelectorAll('.gallery--item');
  galleryItems.forEach((item) => {
    item.setAttribute('tabindex', '0');

    // Permitir activar la galería con la tecla Enter
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
        });

        this.dispatchEvent(clickEvent);
      }
    });
  });
}

function initAccessibleTooltips() {
  // Implementar tooltips accesibles para iconos y botones que los necesiten
  const elementsWithTooltips = document.querySelectorAll('[data-tooltip]');

  elementsWithTooltips.forEach((element) => {
    const tooltipText = element.getAttribute('data-tooltip');
    if (tooltipText) {
      element.setAttribute('aria-label', tooltipText);
      element.setAttribute('role', 'button');

      // Si no tiene tabindex, añadirlo
      if (!element.hasAttribute('tabindex')) {
        element.setAttribute('tabindex', '0');
      }
    }
  });
}
