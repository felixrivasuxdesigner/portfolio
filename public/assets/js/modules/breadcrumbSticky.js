/**
 * Module for Breadcrumb Sticky Functionality
 */

export function initBreadcrumbSticky() {
  const breadcrumb = document.querySelector('.case-study-breadcrumb');
  const header = document.querySelector('#header');

  // Si no existe el breadcrumb, retornar
  if (!breadcrumb) return;

  // Obtener la posición inicial del breadcrumb
  const breadcrumbOffset = breadcrumb.offsetTop;

  // Función para manejar el scroll
  function handleScroll() {
    if (window.pageYOffset > breadcrumbOffset) {
      breadcrumb.classList.add('sticky');

      // Agregar margen al contenido para evitar saltos
      const breadcrumbHeight = breadcrumb.offsetHeight;
      const caseStudy = document.querySelector('.case-study');
      if (caseStudy) {
        caseStudy.style.paddingTop = `${breadcrumbHeight}px`;
      }
    } else {
      breadcrumb.classList.remove('sticky');

      // Restaurar el padding del contenido
      const caseStudy = document.querySelector('.case-study');
      if (caseStudy) {
        caseStudy.style.paddingTop = '0';
      }
    }
  }

  // Agregar evento de scroll
  window.addEventListener('scroll', handleScroll);

  // Llamar al inicio para configurar correctamente
  handleScroll();
}
