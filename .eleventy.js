const sass = require('sass');
const fs = require('fs');
const path = require('path');

module.exports = function (eleventyConfig) {
  // Passthroughs: Copy static assets directly to output
  eleventyConfig.addPassthroughCopy('src/assets/css');
  eleventyConfig.addPassthroughCopy('src/assets/js');
  eleventyConfig.addPassthroughCopy('src/assets/img');
  eleventyConfig.addPassthroughCopy('src/assets/fonts');
  eleventyConfig.addPassthroughCopy('src/assets/resumen');

  // Watch for changes - no observamos la carpeta CSS para evitar el bucle infinito
  eleventyConfig.addWatchTarget('src/assets/scss/');
  eleventyConfig.addWatchTarget('src/assets/js/');

  // Base configuration
  return {
    dir: {
      input: 'src',
      output: 'public',
      includes: '_includes',
      data: '_data',
    },
    templateFormats: ['html', 'njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
