/**
 * Modals Module
 * Sistema de modales nativo sin depender de Bootstrap
 */

export function initModals() {
  initHireMeModal();
}

function initHireMeModal() {
  const modal = document.getElementById('hireMeModal');
  // Seleccionar botones tanto por clase como por atributo href
  const hireButtons = document.querySelectorAll(
    '.hire-me-btn, a[href="#hireMeModal"]'
  );
  const closeButton = modal?.querySelector('.close');

  if (!modal) {
    console.error('Modal hireMeModal no encontrado');
    return;
  }

  if (hireButtons.length === 0) {
    console.error('No se encontraron botones para abrir el modal hireMeModal');
    return;
  }

  console.log(`Encontrados ${hireButtons.length} botones para el modal`);

  // Abrir modal al hacer clic en los botones "Contrátame"
  hireButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      console.log('Botón Contrátame clickeado');
      openModal();
    });
  });

  // Función para abrir el modal
  function openModal() {
    console.log('Abriendo modal');
    // Mostrar modal con animación
    document.body.style.overflow = 'hidden'; // Prevenir scroll
    modal.style.display = 'block'; // Cambiado a 'block' para evitar problemas de alineación

    // Añadir la clase show después de un pequeño retraso para permitir la animación
    setTimeout(() => {
      modal.classList.add('show');
    }, 10);
  }

  // Cerrar modal con el botón X
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      console.log('Botón cerrar clickeado');
      closeModal();
    });
  } else {
    console.error('No se encontró el botón para cerrar el modal');
  }

  // Cerrar modal al hacer clic fuera del contenido
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      console.log('Click fuera del contenido del modal');
      closeModal();
    }
  });

  // Tecla Escape para cerrar modal
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('show')) {
      console.log('Tecla Escape presionada');
      closeModal();
    }
  });

  function closeModal() {
    console.log('Cerrando modal');
    modal.classList.remove('show');

    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Restaurar scroll
    }, 300);
  }
}
