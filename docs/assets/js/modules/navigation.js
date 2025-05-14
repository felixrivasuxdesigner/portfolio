/**
 * Navigation Module
 * Controla la navegación responsiva y el desplazamiento suave
 */

export function initNavigation() {
  const navbarToggle = document.querySelector('.navbar-toggle');
  const headerNav = document.getElementById('headerNav');
  const navLinks = document.querySelectorAll('.AnimateScroll a, .AnimateScrollLink');

  // Toggle para navbar móvil
  if (navbarToggle && headerNav) {
    navbarToggle.addEventListener('click', () => {
      const isCollapsed = headerNav.classList.contains('collapse');

      if (isCollapsed) {
        headerNav.classList.remove('collapse');
        headerNav.classList.add('in');
        navbarToggle.setAttribute('aria-expanded', 'true');
      } else {
        headerNav.classList.add('collapse');
        headerNav.classList.remove('in');
        navbarToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Desplazamiento suave para enlaces de navegación
  if (navLinks.length > 0) {
    navLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        const href = link.getAttribute('href');
        
        // Si es un enlace de anclaje local (comienza con #)
        if (href.startsWith('#')) {
          event.preventDefault();

          const targetId = href;
          const targetElement = document.querySelector(targetId);

          if (targetElement) {
            // Cerrar menú móvil si está abierto
            if (headerNav && headerNav.classList.contains('in')) {
              headerNav.classList.add('collapse');
              headerNav.classList.remove('in');
              navbarToggle.setAttribute('aria-expanded', 'false');
            }

            // Desplazamiento suave
            window.scrollTo({
              top: targetElement.offsetTop - 70, // Ajustar offset según el header
              behavior: 'smooth',
            });
          }
        }
        // Para enlaces que contienen tanto una URL como un hash (ej: /es/#gallery)
        else if (href.includes('#') && !href.endsWith('#')) {
          // No prevenimos el comportamiento predeterminado si estamos yendo a otra página
          // Sólo intervenimos si estamos ya en la página a la que apunta el enlace
          
          const currentPath = window.location.pathname;
          const linkPath = href.split('#')[0];
          
          // Si estamos en la misma página, entonces hacemos scroll suave
          if (currentPath === linkPath || linkPath === '/' || 
              // Para manejar casos específicos en producción con /portfolio/
              (currentPath.includes('/portfolio/') && linkPath.includes('/portfolio/') && 
               currentPath.replace('/portfolio/', '/') === linkPath.replace('/portfolio/', '/'))) {
            event.preventDefault();
            
            const hash = href.split('#')[1];
            const targetElement = document.querySelector('#' + hash);
            
            if (targetElement) {
              // Cerrar menú móvil si está abierto
              if (headerNav && headerNav.classList.contains('in')) {
                headerNav.classList.add('collapse');
                headerNav.classList.remove('in');
                navbarToggle.setAttribute('aria-expanded', 'false');
              }
              
              // Desplazamiento suave
              window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth',
              });
            }
          }
        }
        // Para todos los demás enlaces, dejamos que el navegador los maneje normalmente
      });
    });
  }

  // Cambiar estado activo en la navegación durante el scroll
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    // Obtener todas las secciones
    const sections = document.querySelectorAll('section, div[id]');

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (
        sectionId &&
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        // Remover active de todos los enlaces
        navLinks.forEach((link) => {
          link.parentElement.classList.remove('active');
        });

        // Añadir active al enlace correspondiente
        const activeLink = document.querySelector(
          `.AnimateScroll a[href="#${sectionId}"]`
        );
        if (activeLink) {
          activeLink.parentElement.classList.add('active');
        }
      }
    });
  });
}
