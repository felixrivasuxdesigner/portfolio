/**
 * Portfolio Module
<<<<<<< HEAD
 * Maneja la funcionalidad de filtro de la galería de proyectos
=======
 * Maneja la funcionalidad de filtro y navegación de la galería de proyectos
>>>>>>> c130d01d57a0783168a577d1225df5219c76b02b
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
        const galleryLink = item.closest('.gallery-item-link'); // Obtener el enlace padre

        if (filter === '*' || itemCategory === filter) {
          if (galleryLink) galleryLink.style.display = 'block';
          else item.style.display = 'block';

          // Animación de aparición
          setTimeout(() => {
            if (galleryLink) {
              galleryLink.style.opacity = '1';
              galleryLink.style.transform = 'scale(1)';
            } else {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }
          }, 50);
        } else {
          if (galleryLink) {
            galleryLink.style.opacity = '0';
            galleryLink.style.transform = 'scale(0.8)';
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
          }

          // Ocultar después de la animación
          setTimeout(() => {
            if (galleryLink) galleryLink.style.display = 'none';
            else item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}
<<<<<<< HEAD

// Utilidades para obtener traducciones
function getTranslation(key) {
  const locale = document.documentElement.lang || 'es';
  const translations = window.siteTranslations?.[locale] || {};
  
  // Dividir la clave por puntos para acceder a objetos anidados
  return key.split('.').reduce((obj, k) => obj?.[k], translations) || '';
}

// Utilidad para ajustar rutas de imágenes (para GitHub Pages)
function getFixedImagePath(path) {
  if (window.isGitHubPages) {
    return window.basePath + path;
  }
  return path;
}

// Inicializar modales de proyectos
function initProjectModals() {
  const modal = document.getElementById('projectModal');
  const modalButtons = document.querySelectorAll('.gallery--window');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const closeButton = modal?.querySelector('.modal-close');

  // Datos de proyectos
  const projectsData = {
    wallet: {
      title:
        document
          .querySelector('[data-project="wallet"]')
          ?.closest('.gallery-item')
          .querySelector('h2').textContent || '',
      categories: getTranslation('portfolio.projects.wallet.categories'),
      imageSrc: getFixedImagePath(
        '/assets/img/gallery-img/wallet/cover-wallet.webp'
      ),
      description: getTranslation('portfolio.projects.wallet.description'),
    },
    factoring: {
      title:
        document
          .querySelector('[data-project="factoring"]')
          ?.closest('.gallery-item')
          .querySelector('h2').textContent || '',
      categories: getTranslation('portfolio.projects.factoring.categories'),
      imageSrc: getFixedImagePath(
        '/assets/img/gallery-img/factoring/cover-factoring.webp'
      ),
      description: getTranslation('portfolio.projects.factoring.description'),
    },
    nomadix: {
      title:
        document
          .querySelector('[data-project="nomadix"]')
          ?.closest('.gallery-item')
          .querySelector('h2').textContent || '',
      categories: getTranslation('portfolio.projects.nomadix.categories'),
      imageSrc: getFixedImagePath(
        '/assets/img/gallery-img/nomadix/cover-nomadix.webp'
      ),
      description: getTranslation('portfolio.projects.nomadix.description'),
    },
  };

  // Función para corregir rutas de imágenes según el entorno
  function getFixedImagePath(path) {
    // Si estamos en GitHub Pages, añadir el prefijo /portfolio/
    if (window.location.hostname.includes('github.io')) {
      if (path.startsWith('/')) {
        return '/portfolio' + path;
      } else {
        return '/portfolio/' + path;
      }
    }
    return path;
  }

  if (!modal || modalButtons.length === 0) return;

  // Hacer que toda la tarjeta sea clickeable
  galleryItems.forEach((item) => {
    item.addEventListener('click', (event) => {
      // Evitar que se active si se hizo clic específicamente en el botón
      // (para evitar disparar dos veces el evento)
      if (event.target.closest('.gallery--window')) {
        return;
      }

      const projectButton = item.querySelector('.gallery--window');
      if (projectButton) {
        const projectKey = projectButton.getAttribute('data-project');
        openProjectModal(projectKey);
      }
    });
  });

  // Abrir modal al hacer clic en los botones
  modalButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();

      const projectKey = button.getAttribute('data-project');
      openProjectModal(projectKey);
    });
  });

  // Función para abrir el modal con datos del proyecto
  function openProjectModal(projectKey) {
    const projectData = projectsData[projectKey];

    if (projectData) {
      // Actualizar contenido del modal
      modal.querySelector('.modal-title').textContent = projectData.title;
      modal.querySelector('.modal-categories').textContent =
        projectData.categories;

      const projectImage = modal.querySelector('.project-image');
      projectImage.src = projectData.imageSrc;
      projectImage.alt = projectData.title;

      // Cargar la imagen detallada correcta para cada proyecto
      // usando la función getFixedImagePath para ajustar la ruta según el entorno
      if (projectKey === 'nomadix') {
        // Reemplazar la imagen del modal con la versión detallada
        projectImage.src = getFixedImagePath('/assets/img/gallery-img/nomadix/Nomadix.webp');
      } else if (projectKey === 'wallet') {
        // Reemplazar la imagen del modal con la versión detallada
        projectImage.src = getFixedImagePath('/assets/img/gallery-img/wallet/wallet.webp');
      } else if (projectKey === 'factoring') {
        // Reemplazar la imagen del modal con la versión detallada
        projectImage.src = getFixedImagePath('/assets/img/gallery-img/factoring/factoring.webp');
      }

      modal.querySelector('.project-description').textContent =
        projectData.description;

      // Mostrar modal
      document.body.style.overflow = 'hidden';
      modal.style.display = 'flex';

      setTimeout(() => {
        modal.classList.add('show');
      }, 10);
    }
  }

  // Cerrar modal
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      closeModal();
    });
  }

  // Cerrar modal al hacer clic fuera del contenido
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Tecla Escape para cerrar modal
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove('show');

    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 300);
  }
}
=======
>>>>>>> c130d01d57a0783168a577d1225df5219c76b02b
