/**
 * GitHub Pages Helper
 * Este script soluciona problemas específicos cuando el sitio se despliega en GitHub Pages
 */

// Ejecutar inmediatamente
(function() {
  // Solo si estamos en GitHub Pages
  if (window.location.hostname.includes('github.io')) {
    // Constantes
    const BASE_URL = '/portfolio/';
    const DOMAIN = 'https://felixrivasuxdesigner.github.io';
    
    /**
     * Corrige URLs para que funcionen correctamente en GitHub Pages
     */
    function fixUrl(url) {
      if (!url) return url;
      
      // Ya tiene la estructura correcta
      if (url.includes('/portfolio/')) return url;
      
      // URLs absolutas que apuntan al dominio sin /portfolio/
      if (url.startsWith(DOMAIN)) {
        return url.replace(DOMAIN, DOMAIN + '/portfolio');
      }
      
      // URLs absolutas que comienzan con /
      if (url.startsWith('/')) {
        return BASE_URL + url.substring(1);
      }
      
      // URLs relativas
      return BASE_URL + url;
    }
    
    /**
     * Corrige todas las imágenes del documento
     */
    function fixAllImages() {
      // Imágenes
      document.querySelectorAll('img').forEach(img => {
        if (img.src && !img.src.includes('/portfolio/')) {
          const originalSrc = img.src;
          const newSrc = fixUrl(originalSrc);
          if (originalSrc !== newSrc) {
            console.log(`Corrigiendo imagen: ${originalSrc} → ${newSrc}`);
            img.src = newSrc;
          }
        }
      });
      
      // Sources en picture
      document.querySelectorAll('source[srcset]').forEach(source => {
        if (source.srcset && !source.srcset.includes('/portfolio/')) {
          const originalSrcset = source.srcset;
          // Dividir por comas para manejar varias URLs en srcset
          const newSrcset = originalSrcset.split(',')
            .map(part => {
              const [url, descriptor] = part.trim().split(/\s+/);
              return `${fixUrl(url)} ${descriptor || ''}`.trim();
            })
            .join(', ');
          
          if (originalSrcset !== newSrcset) {
            console.log(`Corrigiendo srcset: ${originalSrcset} → ${newSrcset}`);
            source.srcset = newSrcset;
          }
        }
      });
    }
    
    /**
     * Corrige los fondos de imágenes en estilos inline
     */
    function fixBackgroundImages() {
      document.querySelectorAll('[style*="background-image"]').forEach(el => {
        const style = el.getAttribute('style');
        if (style) {
          const urlMatch = style.match(/url\(['"]?([^'")]+)['"]?\)/i);
          if (urlMatch && urlMatch[1] && !urlMatch[1].includes('/portfolio/')) {
            const originalUrl = urlMatch[1];
            const newUrl = fixUrl(originalUrl);
            if (originalUrl !== newUrl) {
              console.log(`Corrigiendo fondo: ${originalUrl} → ${newUrl}`);
              const newStyle = style.replace(originalUrl, newUrl);
              el.setAttribute('style', newStyle);
            }
          }
        }
      });
    }
    
    /**
     * Corrige los problemas con SVG paths
     */
    function fixSvgPaths() {
      document.querySelectorAll('svg path').forEach(path => {
        const d = path.getAttribute('d');
        if (d) {
          // Asegurar espacios entre números y comandos SVG
          const commands = 'MLHVCSQTAZmlhvcsqtaz';
          let fixedD = d;
          
          // Para cada comando SVG, asegurar que hay un espacio antes
          for (let i = 0; i < commands.length; i++) {
            const cmd = commands[i];
            fixedD = fixedD.replace(new RegExp(`(\\d+\\.\\d*|\\d+)${cmd}`, 'g'), `$1 ${cmd}`);
          }
          
          if (d !== fixedD) {
            console.log('Corrigiendo SVG path');
            path.setAttribute('d', fixedD);
          }
        }
      });
    }
    
    // Ejecutar correcciones varias veces para asegurar que se aplican
    // 1. Inmediatamente
    fixAllImages();
    fixBackgroundImages();
    fixSvgPaths();
    
    // 2. Cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', function() {
      fixAllImages();
      fixBackgroundImages();
      fixSvgPaths();
      console.log('Correcciones para GitHub Pages aplicadas (DOMContentLoaded)');
    });
    
    // 3. Cuando la página esté completamente cargada
    window.addEventListener('load', function() {
      fixAllImages();
      fixBackgroundImages();
      fixSvgPaths();
      
      // Verificar si hay imágenes que fallaron
      document.querySelectorAll('img').forEach(img => {
        if (img.complete && img.naturalWidth === 0) {
          console.warn('Imagen no cargada después de corrección:', img.src);
        }
      });
      
      console.log('Correcciones para GitHub Pages aplicadas (load)');
    });
  }
})();
