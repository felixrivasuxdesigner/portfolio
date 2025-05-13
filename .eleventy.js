const sass = require('sass');
const fs = require('fs');
const path = require('path');
const { parseHTML } = require('linkedom');

module.exports = function (eleventyConfig) {
  // Passthroughs: Copy static assets directly to output
  eleventyConfig.addPassthroughCopy('src/assets/css');
  eleventyConfig.addPassthroughCopy('src/assets/js');
  eleventyConfig.addPassthroughCopy('src/assets/img');
  eleventyConfig.addPassthroughCopy('src/assets/fonts');
  eleventyConfig.addPassthroughCopy('src/assets/resumen');
  eleventyConfig.addPassthroughCopy('src/robots.txt');
  eleventyConfig.addPassthroughCopy('src/sitemap.xml');
  eleventyConfig.addPassthroughCopy('src/site.webmanifest');
  eleventyConfig.addPassthroughCopy('src/_headers'); // Añadir el archivo _headers

  // Watch for changes - no observamos la carpeta CSS para evitar el bucle infinito
  eleventyConfig.addWatchTarget('src/assets/scss/');
  eleventyConfig.addWatchTarget('src/assets/js/');

  // Transformación para añadir lazy loading a imágenes
  eleventyConfig.addTransform('lazyImages', function (content, outputPath) {
    if (outputPath && outputPath.endsWith('.html')) {
      try {
        const { document } = parseHTML(content);
        const images = document.querySelectorAll('img:not([loading])');

        // No aplicar lazy loading a imágenes en el primer viewport (ej. logo, hero banner)
        images.forEach((img) => {
          // Verificar si la imagen está en el primer viewport o es crítica
          const parentClass = img.parentElement
            ? img.parentElement.className
            : '';
          const imgClass = img.className || '';

          // Si la imagen tiene estas clases o está en estos contenedores, no aplicamos lazy loading
          const criticalImages = ['logo', 'banner', 'hero', 'header'];

          // Verificar si la imagen es crítica basado en su clase o la de su contenedor
          const isCritical = criticalImages.some(
            (cls) => parentClass.includes(cls) || imgClass.includes(cls)
          );

          if (!isCritical) {
            img.setAttribute('loading', 'lazy');
          } else {
            // Para imágenes críticas, podemos añadir fetchpriority=high
            img.setAttribute('fetchpriority', 'high');
          }
        });

        return document.toString();
      } catch (error) {
        console.warn('Error procesando imágenes para lazy loading:', error);
        return content;
      }
    }
    return content;
  });

  // Filtro para generar el marcado de imagen moderno con soporte para WebP
  eleventyConfig.addShortcode(
    'imageWithWebP',
    function (src, alt, className = '', widthAttr = '', heightAttr = '') {
      // Detectar si la imagen ya es WebP
      const isAlreadyWebP = src.toLowerCase().endsWith('.webp');

      if (isAlreadyWebP) {
        // Si ya es WebP, simplemente devolvemos la imagen con lazy loading
        return `<img src="${src}" alt="${alt}" class="${className}" ${
          widthAttr ? `width="${widthAttr}"` : ''
        } ${heightAttr ? `height="${heightAttr}"` : ''} loading="lazy">`;
      }

      // Obtener la extensión del archivo original
      const ext = path.extname(src).toLowerCase();
      // Crear la ruta para la versión WebP
      const webpSrc = src.replace(ext, '.webp');

      // Crear el marcado para picture con los diferentes formatos
      return `
      <picture>
        <source srcset="${webpSrc}" type="image/webp">
        <source srcset="${src}" type="image/${ext.replace('.', '')}">
        <img src="${src}" alt="${alt}" class="${className}" ${
        widthAttr ? `width="${widthAttr}"` : ''
      } ${heightAttr ? `height="${heightAttr}"` : ''} loading="lazy">
      </picture>
    `;
    }
  );

  // Base configuration
  return {
    dir: {
      input: 'src',
      output: 'docs',
      includes: '_includes',
      data: '_data',
    },
    templateFormats: ['html', 'njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
