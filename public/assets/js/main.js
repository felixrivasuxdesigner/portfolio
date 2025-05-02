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

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar módulos
  initPreloader();
  initLanguageSelector();
  initNavigation();
  initScrollEffects();
  initPortfolio();
  initCounter();
  initBackToTop();
  initForms();

  console.log('Portfolio initialized successfully');
});
