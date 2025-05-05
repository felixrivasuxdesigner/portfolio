/**
 * Brands Slider Module
 * Inicializa y configura el carrusel de clientes/marcas
 */

export function initBrandsSlider() {
  const brandsSlider = document.querySelector('.BrandsSlider');

  if (brandsSlider && typeof window.Splide !== 'undefined') {
    new Splide(brandsSlider, {
      perPage: 5,
      gap: 30,
      arrows: false,
      pagination: false,
      autoplay: true,
      interval: 3000,
      type: 'loop',
      drag: true,
      breakpoints: {
        992: {
          perPage: 4,
        },
        768: {
          perPage: 3,
        },
        576: {
          perPage: 2,
        },
      },
    }).mount();
  }
}
