/**
 * Portfolio Module
 * Maneja la funcionalidad de filtro y navegación de la galería de proyectos
 */

export function initPortfolio() {
  // Gestión de filtros para la galería
  initFilterGallery();
}

// Inicializar el sistema de filtrado de la galería
function initFilterGallery() {
  const filterMenu = document.querySelector('.gallery-filter-menu');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!filterMenu || galleryItems.length === 0) return;

  const filterButtons = filterMenu.querySelectorAll('a');

  filterButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();

      // Remover clase active de todos los botones
      filterButtons.forEach((btn) => {
        btn.parentElement.classList.remove('active');
      });

      // Añadir active al botón actual
      button.parentElement.classList.add('active');

      // Obtener el filtro
      const filter = button.getAttribute('href').replace('#', '');

      // Mostrar/ocultar elementos según el filtro
      galleryItems.forEach((item) => {
        const itemCategory = item.getAttribute('data-cat');

        if (filter === '*' || itemCategory === filter) {
          item.style.display = 'block';

          // Animación de aparición
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';

          // Ocultar después de la animación
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}
