/**
 * Path Fixer Module
 * Este módulo corrige las rutas de imágenes y otros recursos para GitHub Pages
 */

export function fixPaths() {
  // Solo ejecutar si estamos en GitHub Pages (felixrivasuxdesigner.github.io)
  const isGithubPages = window.location.hostname.includes('github.io');
  const baseUrl = '/portfolio/';

  // Función para corregir una URL
  function fixUrl(url) {
    if (!url) return url;

    // Si la URL ya comienza con http/https o con la base URL, no la modificamos
    if (url.startsWith('http') || url.startsWith(baseUrl)) {
      return url;
    }

    // Si la URL comienza con una barra, la reemplazamos con la base URL
    if (url.startsWith('/')) {
      return baseUrl + url.substring(1);
    }

    // De lo contrario, simplemente añadimos la base URL
    return baseUrl + url;
  }

  // Función para corregir srcset
  function fixSrcSet(srcset) {
    if (!srcset) return srcset;

    return srcset
      .split(',')
      .map((src) => {
        const [url, size] = src.trim().split(' ');
        return `${fixUrl(url)} ${size || ''}`.trim();
      })
      .join(', ');
  }

  // Ejecutar antes de que las imágenes se carguen usando un script precargado
  if (isGithubPages) {
    // Inyectar un script que se ejecute lo antes posible
    const script = document.createElement('script');
    script.textContent = `
      (function() {
        const baseUrl = '/portfolio/';
        
        // Función para corregir una URL
        function fixUrl(url) {
          if (!url) return url;
          
          // Si la URL ya comienza con http/https o con la base URL, no la modificamos
          if (url.startsWith('http') || url.startsWith(baseUrl)) {
            return url;
          }

          // Si la URL comienza con una barra, la reemplazamos con la base URL
          if (url.startsWith('/')) {
            return baseUrl + url.substring(1);
          }

          // De lo contrario, simplemente añadimos la base URL
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

    // Agregamos una corrección inicial para las imágenes que se cargan antes de que el script se ejecute
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

        // Corregir background-image inline
        if (el.style && el.style.backgroundImage) {
          const bgImage = el.style.backgroundImage;
          if (bgImage.includes('url(') && !bgImage.includes('data:')) {
            const urlMatch = bgImage.match(/url\(['"]?([^'")]+)['"]?\)/i);
            if (urlMatch && urlMatch[1]) {
              const originalUrl = urlMatch[1];
              if (!originalUrl.startsWith('http') && !originalUrl.includes(baseUrl)) {
                const newUrl = fixUrl(originalUrl);
                if (originalUrl !== newUrl) {
                  console.log(`Corrigiendo ruta de fondo inline: ${originalUrl} -> ${newUrl}`);
                  el.style.backgroundImage = `url('${newUrl}')`;
                }
              }
            }
          }
        }
      });

      // Corregir SVG paths problemáticos
      fixSvgPaths();
    });

    // Esperar a que la página se cargue completamente
    window.addEventListener('load', () => {
      // Corregir rutas en imágenes
      document.querySelectorAll('img').forEach((img) => {
        if (img.src && !img.src.startsWith('data:') && !img.src.startsWith('http')) {
          const originalSrc = img.getAttribute('src');
          const newSrc = fixUrl(originalSrc);
          if (originalSrc !== newSrc) {
            console.log(`Corrigiendo ruta de imagen: ${originalSrc} -> ${newSrc}`);
            img.src = newSrc;
          }
        }

        // También verificar srcset
        if (img.srcset) {
          const originalSrcset = img.getAttribute('srcset');
          const newSrcset = fixSrcSet(originalSrcset);
          if (originalSrcset !== newSrcset) {
            console.log(`Corrigiendo srcset: ${originalSrcset} -> ${newSrcset}`);
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

      // Corregir URLs en estilos inline con background-image
      document.querySelectorAll('[style*="background-image"]').forEach((el) => {
        const style = el.getAttribute('style');
        if (style) {
          const urlMatch = style.match(/url\(['"]?([^'")]+)['"]?\)/i);
          if (urlMatch && urlMatch[1]) {
            const originalUrl = urlMatch[1];
            const newUrl = fixUrl(originalUrl);
            if (originalUrl !== newUrl) {
              console.log(`Corrigiendo ruta de fondo: ${originalUrl} -> ${newUrl}`);
              el.style.backgroundImage = `url('${newUrl}')`;
            }
          }
        }
      });

      // Corregir URLs en elementos <a>
      document.querySelectorAll('a').forEach((link) => {
        // No modificar enlaces a secciones internas, teléfonos, correos o URLs externas
        if (
          link.href &&
          !link.href.startsWith('#') &&
          !link.href.startsWith('tel:') &&
          !link.href.startsWith('mailto:') &&
          !link.href.startsWith('http')
        ) {
          const originalHref = link.getAttribute('href');
          // No corregir URLs que ya incluyen la base URL o que son rutas relativas al directorio actual (./)
          if (!originalHref.includes(baseUrl) && !originalHref.startsWith('./')) {
            const newHref = fixUrl(originalHref);
            if (originalHref !== newHref) {
              console.log(`Corrigiendo ruta de enlace: ${originalHref} -> ${newHref}`);
              link.href = newHref;
            }
          }
        }
      });

      // Corregir URLs en hojas de estilo
      Array.from(document.styleSheets).forEach((styleSheet) => {
        try {
          // Solo procesar hojas de estilo del mismo origen
          if (styleSheet.href && !styleSheet.href.startsWith(window.location.origin)) {
            return;
          }

          const rules = styleSheet.cssRules || styleSheet.rules;
          if (!rules) {
            return;
          }

          for (let i = 0; i < rules.length; i++) {
            const rule = rules[i];
            if (rule.style && rule.style.backgroundImage) {
              const bgImage = rule.style.backgroundImage;
              if (bgImage.includes('url(') && !bgImage.includes('data:')) {
                const urlMatch = bgImage.match(/url\(['"]?([^'")]+)['"]?\)/i);
                if (urlMatch && urlMatch[1]) {
                  const originalUrl = urlMatch[1];
                  // No corregir URLs que ya incluyen http, https, o la base URL
                  if (!originalUrl.startsWith('http') && !originalUrl.includes(baseUrl)) {
                    const newUrl = fixUrl(originalUrl);
                    if (originalUrl !== newUrl) {
                      console.log(`Corrigiendo ruta en CSS: ${originalUrl} -> ${newUrl}`);
                      rule.style.backgroundImage = bgImage.replace(originalUrl, newUrl);
                    }
                  }
                }
              }
            }
          }
        } catch (e) {
          // Ignorar errores de CORS o de acceso a hojas de estilo externas
          console.warn('No se pudo procesar hoja de estilo:', e);
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

// Función para corregir los problemas en paths SVG
function fixSvgPaths() {
  document.querySelectorAll('svg path').forEach((path) => {
    const d = path.getAttribute('d');
    if (d && d.includes('C')) {
      try {
        // Corregir el problema del formato en los paths de SVG
        // El error ocurre cuando hay comandos como "22.416,10. C22.512,9.90..."
        // Necesitamos asegurarnos de que hay un espacio antes de la C
        const fixedD = d.replace(/(\d+\.\d*|\d+)\s*C/g, '$1 C');
        if (d !== fixedD) {
          path.setAttribute('d', fixedD);
          console.log('SVG path corregido');
        }
      } catch (e) {
        console.warn('Error al corregir SVG:', e);
      }
    }
  });
}
