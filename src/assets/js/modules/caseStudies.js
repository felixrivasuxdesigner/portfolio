/**
 * Case Studies Module
 * Funcionalidad específica para las páginas de estudios de caso
 */

export function initCaseStudies() {
  initCaseStudyNavigation();
  enhanceCaseStudyBanner();
}

// Inicializar la navegación específica para case studies
function initCaseStudyNavigation() {
  // Enlaces del banner
  const caseStudyBanner = document.getElementById('case-study-banner');
  
  if (caseStudyBanner) {
    const bannerLinks = caseStudyBanner.querySelectorAll('a.btn');
    
    bannerLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        // Si contiene un hash, navegar suavemente
        if (link.getAttribute('href').includes('#')) {
          // Solo prevenir default si estamos desarrollando localmente
          // En producción, permitir la navegación normal
          const isLocalhost = window.location.hostname === 'localhost' || 
                            window.location.hostname === '127.0.0.1' ||
                            window.location.hostname.includes('192.168.');
          
          if (isLocalhost) {
            event.preventDefault();
            const href = link.getAttribute('href');
            const baseUrl = href.split('#')[0];
            const hash = '#' + href.split('#')[1];
            
            // Navegar a la página base primero
            window.location.href = baseUrl;
            
            // Esperar a que la página cargue y luego desplazarse al ancla
            window.onload = function() {
              const targetElement = document.querySelector(hash);
              if (targetElement) {
                window.scrollTo({
                  top: targetElement.offsetTop - 70,
                  behavior: 'smooth'
                });
              }
            };
          }
        }
      });
    });
  }
}

// Mejorar el banner de case studies
function enhanceCaseStudyBanner() {
  const caseStudyBanner = document.getElementById('case-study-banner');
  
  if (caseStudyBanner) {
    // Hacer que la altura sea dinámica basada en el contenido
    const resizeBanner = () => {
      const header = document.getElementById('header');
      const headerHeight = header ? header.offsetHeight : 80;
      const bannerContent = caseStudyBanner.querySelector('.banner--content');
      
      if (bannerContent) {
        const contentHeight = bannerContent.offsetHeight + 160; // Añadir margen
        const minHeight = Math.max(400, contentHeight);
        caseStudyBanner.style.height = `${minHeight}px`;
        
        // Ajustar el padding superior para compensar el header transparente
        bannerContent.style.paddingTop = `${headerHeight}px`;
      }
    };
    
    // Ejecutar al cargar
    resizeBanner();
    
    // Ejecutar al cambiar el tamaño de la ventana
    window.addEventListener('resize', resizeBanner);
  }
}
