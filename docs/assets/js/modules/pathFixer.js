/**
 * Path Fixer Module
 * Este módulo corrige las rutas de imágenes y otros recursos para GitHub Pages
 */

export function fixPaths() {
  // Solo ejecutar si estamos en GitHub Pages (felixrivasuxdesigner.github.io)
  const isGithubPages = window.location.hostname.includes('github.io');
  if (isGithubPages) {
    const baseUrl = '/portfolio/';
    const fullDomain = 'https://felixrivasuxdesigner.github.io';

    // Función para corregir una URL
    function fixUrl(url) {
      if (!url) return url;

      // Si ya tiene la estructura correcta con /portfolio/, no hacemos nada
      if (url.includes('/portfolio/')) {
        return url;
      }

      // Corregir URLs absolutas que apuntan al dominio pero sin /portfolio/
      if (url.startsWith(fullDomain)) {
        return url.replace(fullDomain, fullDomain + '/portfolio');
      }

      // Si la URL comienza con una barra, la reemplazamos con la base URL
      if (url.startsWith('/')) {
        return baseUrl + url.substring(1);
      }

      // URL relativa, añadir baseUrl
      return baseUrl + url;
    }
    
    // Función para corregir srcset
    function fixSrcSet(srcset) {
      if (!srcset) return srcset;
      
      return srcset.split(',')
        .map(src => {
          const [url, size] = src.trim().split(' ');
          return `${fixUrl(url)} ${size || ''}`.trim();
        })
        .join(', ');
    }

    // Inyectar un script que se ejecute lo antes posible
    const script = document.createElement('script');
    script.textContent = `
      (function() {
        const baseUrl = '/portfolio/';
        const fullDomain = 'https://felixrivasuxdesigner.github.io';
        
        // Función para corregir una URL
        function fixUrl(url) {
          if (!url) return url;
          
          // Si ya tiene la estructura correcta con /portfolio/, no hacemos nada
          if (url.includes('/portfolio/')) {
            return url;
          }
          
          // Corregir URLs absolutas que apuntan al dominio pero sin /portfolio/
          if (url.startsWith(fullDomain)) {
            return url.replace(fullDomain, fullDomain + '/portfolio');
          }
          
          // Si la URL comienza con una barra, la reemplazamos con la base URL
          if (url.startsWith('/')) {
            return baseUrl + url.substring(1);
          }
          
          // URL relativa, añadir baseUrl
          return baseUrl + url;
        }

        // Pre-interceptar solicitudes de imágenes
        const originalCreateElement = document.createElement;
        document.createElement = function(tagName) {
          const element = originalCreateElement.call(document, tagName);
          
          if (tagName.toLowerCase() === 'img') {
            const originalSetAttribute = element.setAttribute;
            element.setAttribute = function(name, value) {
              if (name === 'src' && value && !value.startsWith('data:') && !value.startsWith('http')) {
                arguments[1] = fixUrl(value);
              }
              return originalSetAttribute.apply(this, arguments);
            };
          }
          
          return element;
        };
      })();
    `;
    document.head.appendChild(script);

    // CORRECCIÓN INMEDIATA: Corregir todas las imágenes de inmediato
    const allImages = document.querySelectorAll('img');
    allImages.forEach((img) => {
      if (img.src) {
        const newSrc = fixUrl(img.src);
        if (img.src !== newSrc) {
          console.log(`[URGENTE] Corrigiendo imagen: ${img.src} -> ${newSrc}`);
          // Usar setAttribute para evitar que el navegador intente cargar la imagen antes
          img.setAttribute('src', newSrc);
        }
      }
    });

    // Corregir todos los elementos con background-image de inmediato
    document.querySelectorAll('[style*="background-image"]').forEach((el) => {
      const bgImage = el.style.backgroundImage;
      if (bgImage && bgImage.includes('url(')) {
        const urlMatch = bgImage.match(/url\(['"]?([^'")]+)['"]?\)/i);
        if (urlMatch && urlMatch[1]) {
          const originalUrl = urlMatch[1];
          const newUrl = fixUrl(originalUrl);
          if (originalUrl !== newUrl) {
            console.log(
              `[URGENTE] Corrigiendo background: ${originalUrl} -> ${newUrl}`
            );
            el.style.backgroundImage = `url('${newUrl}')`;
          }
        }
      }
    });

    // Corregir errores de SVG inmediatamente
    document.querySelectorAll('svg path').forEach((path) => {
      const d = path.getAttribute('d');
      if (d) {
        try {
          // El patrón común en errores es cuando hay números seguidos directamente por comandos SVG sin espacio
          const fixedD = d
            .replace(/(\d+[\.,]\d*|\d+)\s*C/g, '$1 C')
            .replace(/(\d+[\.,]\d*|\d+)\s*c/g, '$1 c')
            .replace(/(\d+[\.,]\d*|\d+)\s*M/g, '$1 M')
            .replace(/(\d+[\.,]\d*|\d+)\s*m/g, '$1 m')
            .replace(/(\d+[\.,]\d*|\d+)\s*L/g, '$1 L')
            .replace(/(\d+[\.,]\d*|\d+)\s*l/g, '$1 l')
            .replace(/(\d+[\.,]\d*|\d+)\s*H/g, '$1 H')
            .replace(/(\d+[\.,]\d*|\d+)\s*h/g, '$1 h')
            .replace(/(\d+[\.,]\d*|\d+)\s*V/g, '$1 V')
            .replace(/(\d+[\.,]\d*|\d+)\s*v/g, '$1 v')
            .replace(/(\d+[\.,]\d*|\d+)\s*S/g, '$1 S')
            .replace(/(\d+[\.,]\d*|\d+)\s*s/g, '$1 s')
            .replace(/(\d+[\.,]\d*|\d+)\s*Q/g, '$1 Q')
            .replace(/(\d+[\.,]\d*|\d+)\s*q/g, '$1 q')
            .replace(/(\d+[\.,]\d*|\d+)\s*T/g, '$1 T')
            .replace(/(\d+[\.,]\d*|\d+)\s*t/g, '$1 t')
            .replace(/(\d+[\.,]\d*|\d+)\s*A/g, '$1 A')
            .replace(/(\d+[\.,]\d*|\d+)\s*a/g, '$1 a');

          if (d !== fixedD) {
            console.log('[URGENTE] Corrigiendo SVG path');
            path.setAttribute('d', fixedD);
          }
        } catch (e) {
          console.warn('Error al corregir SVG:', e);
        }
      }
    });

    // Agregar correcciones adicionales cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', () => {
      // Corregir imágenes precargadas
      const preloadedImages = document.querySelectorAll(
        'img:not([src^="http"]):not([src^="data:"]), source:not([srcset^="http"]):not([srcset^="data:"])'
      );

      preloadedImages.forEach((img) => {
        // Corregir srcset
        if (img.srcset) {
          const newSrcset = fixSrcSet(img.srcset);
          if (img.srcset !== newSrcset) {
            console.log(`Pre-corrección de srcset: ${img.srcset} -> ${newSrcset}`);
            img.srcset = newSrcset;
          }
        }

        // Corregir src
        if (img.src && !img.src.startsWith('data:') && !img.src.startsWith('http')) {
          const originalSrc = img.getAttribute('src');
          const newSrc = fixUrl(originalSrc);
          if (originalSrc !== newSrc) {
            console.log(`Pre-corrección de imagen: ${originalSrc} -> ${newSrc}`);
            img.src = newSrc;
          }
        }
      });

      // Verificación de background-images que no se corrigieron
      document.querySelectorAll('[data-bg], [data-parallax-bg-img], [style*="background-image"]').forEach((el) => {
        // Corregir data-bg
        if (el.hasAttribute('data-bg')) {
          const bgUrl = el.getAttribute('data-bg');
          if (bgUrl && !bgUrl.startsWith('http') && !bgUrl.startsWith(baseUrl)) {
            const newBgUrl = fixUrl(bgUrl);
            el.setAttribute('data-bg', newBgUrl);
            console.log(`Corrigiendo data-bg: ${bgUrl} -> ${newBgUrl}`);
          }
        }

        // Corregir data-parallax-bg-img
        if (el.hasAttribute('data-parallax-bg-img')) {
          const bgUrl = el.getAttribute('data-parallax-bg-img');
          if (bgUrl && !bgUrl.startsWith('http') && !bgUrl.startsWith(baseUrl)) {
            const newBgUrl = fixUrl(bgUrl);
            el.setAttribute('data-parallax-bg-img', newBgUrl);
            console.log(`Corrigiendo parallax bg: ${bgUrl} -> ${newBgUrl}`);
          }
        }
      });
    });

    // Esperar a que la página se cargue completamente
    window.addEventListener('load', () => {
      // Corrección final de todas las imágenes
      document.querySelectorAll('img').forEach((img) => {
        if (img.src && !img.src.startsWith('data:')) {
          const originalSrc = img.getAttribute('src');
          const newSrc = fixUrl(originalSrc);
          if (originalSrc !== newSrc) {
            console.log(`Corrección final de imagen: ${originalSrc} -> ${newSrc}`);
            img.src = newSrc;
          }
        }
        
        // También verificar srcset
        if (img.srcset) {
          const originalSrcset = img.getAttribute('srcset');
          const newSrcset = fixSrcSet(originalSrcset);
          if (originalSrcset !== newSrcset) {
            console.log(`Corrección final de srcset: ${originalSrcset} -> ${newSrcset}`);
            img.srcset = newSrcset;
          }
        }
      });

      // Corregir rutas en fuentes de imágenes (en picture elements)
      document.querySelectorAll('source').forEach((source) => {
        if (source.srcset) {
          const originalSrcset = source.getAttribute('srcset');
          const newSrcset = fixSrcSet(originalSrcset);
          if (originalSrcset !== newSrcset) {
            console.log(`Corrigiendo ruta de source: ${originalSrcset} -> ${newSrcset}`);
            source.srcset = newSrcset;
          }
        }
      });

      // Verificar si hay errores en las rutas después de la corrección
      const images = document.querySelectorAll('img');
      images.forEach((img) => {
        if (img.complete && img.naturalWidth === 0) {
          console.warn('Imagen no cargada después de corrección:', img.src);
        }
      });

      console.log('Path Fixer ejecutado completamente');
    });
  }
}
