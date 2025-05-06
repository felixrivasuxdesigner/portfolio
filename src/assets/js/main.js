/**
 * Main JavaScript
 * Félix Rivas Portfolio - Modern Version with Eleventy
 */

// Importar módulos
import { initLanguageSelector } from './modules/languageSelector.js';
import { initPreloader } from './modules/preloader.js';
import { initNavigation } from './modules/navigation.js';
import { initScrollEffects } from './modules/scrollEffects.js';
import { initPortfolio } from './modules/portfolio.js';
import { initCounter } from './modules/counter.js';
import { initBackToTop } from './modules/backToTop.js';
import { initForms } from './modules/forms.js';
import { initTestimonials } from './modules/testimonials.js';
import { initModals } from './modules/modals.js';
import { initAccessibility } from './modules/accessibility.js';
import { initBrandsCarousel } from './modules/brandsCarousel.js';
import { fixPaths } from './modules/pathFixer.js';
import { initThemeSwitcher } from './modules/theme-switcher.js';

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  // Corregir rutas para GitHub Pages (debe ejecutarse primero)
  fixPaths();

  // Inicializar módulos
  initPreloader();
  initLanguageSelector();
  initNavigation();
  initScrollEffects();
  initPortfolio();
  initCounter();
  initBackToTop();
  initForms();
  initTestimonials();
  initModals(); // Inicializar modales
  initAccessibility(); // Inicializar mejoras de accesibilidad
  initBrandsCarousel(); // Inicializar el carrusel de marcas moderno
  initThemeSwitcher(); // Inicializar selector de tema claro/oscuro

  // Registrar Service Worker para funcionalidad offline
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/portfolio/assets/js/service-worker.js')
        .then((registration) => {
          console.log(
            'Service Worker registrado con éxito:',
            registration.scope
          );
        })
        .catch((error) => {
          console.error('Error al registrar el Service Worker:', error);
        });
    });
  }

  console.log('Portfolio initialized successfully');
});
