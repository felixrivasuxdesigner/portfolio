/**
 * Path Fixer Module
 * Este módulo corrige las rutas de imágenes y otros recursos para GitHub Pages
 */

export function fixPaths() {
  // Determinar si estamos en GitHub Pages o en desarrollo local
  const isLocalhost = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1' ||
                      window.location.hostname.includes('192.168.');
  
  // La variable isGithubPages ahora detecta cualquier entorno que no sea local
  const isGithubPages = !isLocalhost;
  
  if (isGithubPages) {
    const baseUrl = '/portfolio/';
    const fullDomain = 'https://felixrivasuxdesigner.github.io';

    // Función para corregir una URL
    function fixUrl(url) {
      if (!url) return url;

      // Si es una URL de datos o absoluta con http, no hacemos nada
      if (url.startsWith('data:') || url.startsWith('http://') || url.startsWith('https://')) {
        // Excepto si es una URL que apunta a nuestro dominio sin /portfolio/
        if (url.startsWith(fullDomain) && !url.includes('/portfolio/')) {
          return url.replace(fullDomain, fullDomain + '/portfolio');
        }
        return url;
      }

      // Si ya tiene la estructura correcta con /portfolio/, no hacemos nada
      if (url.includes('/portfolio/')) {
        return url;
      }

      // Si la URL comienza con una barra, la reemplazamos con la base URL
      if (url.startsWith('/')) {
        return baseUrl + url.substring(1);
      }

      // URL relativa, añadir baseUrl si no comienza con baseUrl
      if (!url.startsWith(baseUrl)) {
        return baseUrl + url;
      }

      return url;
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
          
          // Si es una URL de datos o absoluta con http, no hacemos nada
          if (url.startsWith('data:') || url.startsWith('http://') || url.startsWith('https://')) {
            // Excepto si es una URL que apunta a nuestro dominio sin /portfolio/
            if (url.startsWith(fullDomain) && !url.includes('/portfolio/')) {
              return url.replace(fullDomain, fullDomain + '/portfolio');
            }
            return url;
          }
          
          // Si ya tiene la estructura correcta con /portfolio/, no hacemos nada
          if (url.includes('/portfolio/')) {
            return url;
          }
          
          // Si la URL comienza con una barra, la reemplazamos con la base URL
          if (url.startsWith('/')) {
            return baseUrl + url.substring(1);
          }
          
          // URL relativa, añadir baseUrl si no comienza con baseUrl
          if (!url.startsWith(baseUrl)) {
            return baseUrl + url;
          }
          
          return url;
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
        const originalSrc = img.getAttribute('src');
        if (originalSrc && !originalSrc.startsWith('data:') && !originalSrc.startsWith('http')) {
          const newSrc = fixUrl(originalSrc);
          if (originalSrc !== newSrc) {
            console.log(`[PathFixer] Corrigiendo imagen: ${originalSrc} -> ${newSrc}`);
            // Usar setAttribute para evitar que el navegador intente cargar la imagen antes
            img.setAttribute('src', newSrc);
          }
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
          if (!originalUrl.startsWith('data:') && !originalUrl.startsWith('http')) {
            const newUrl = fixUrl(originalUrl);
            if (originalUrl !== newUrl) {
              console.log(`[PathFixer] Corrigiendo background: ${originalUrl} -> ${newUrl}`);
              el.style.backgroundImage = `url('${newUrl}')`;
            }
          }
        }
      }
    });

    // Corregir rutas en atributos data-*
    document.querySelectorAll('[data-bg], [data-parallax-bg-img]').forEach((el) => {
      // Corregir data-bg
      if (el.hasAttribute('data-bg')) {
        const bgUrl = el.getAttribute('data-bg');
        if (bgUrl && !bgUrl.startsWith('data:') && !bgUrl.startsWith('http')) {
          const newBgUrl = fixUrl(bgUrl);
          if (bgUrl !== newBgUrl) {
            console.log(`[PathFixer] Corrigiendo data-bg: ${bgUrl} -> ${newBgUrl}`);
            el.setAttribute('data-bg', newBgUrl);
          }
        }
      }

      // Corregir data-parallax-bg-img
      if (el.hasAttribute('data-parallax-bg-img')) {
        const bgUrl = el.getAttribute('data-parallax-bg-img');
        if (bgUrl && !bgUrl.startsWith('data:') && !bgUrl.startsWith('http')) {
          const newBgUrl = fixUrl(bgUrl);
          if (bgUrl !== newBgUrl) {
            console.log(`[PathFixer] Corrigiendo parallax bg: ${bgUrl} -> ${newBgUrl}`);
            el.setAttribute('data-parallax-bg-img', newBgUrl);
          }
        }
      }
    });

    // Esperar a que la página se cargue completamente
    window.addEventListener('load', () => {
      // Corrección final de todas las imágenes
      document.querySelectorAll('img').forEach((img) => {
        if (img.src) {
          const originalSrc = img.getAttribute('src');
          if (originalSrc && !originalSrc.startsWith('data:') && !originalSrc.startsWith('http')) {
            const newSrc = fixUrl(originalSrc);
            if (originalSrc !== newSrc) {
              console.log(`[PathFixer] Corrección final de imagen: ${originalSrc} -> ${newSrc}`);
              img.src = newSrc;
            }
          }
        }
        
        // También verificar srcset
        if (img.srcset) {
          const originalSrcset = img.getAttribute('srcset');
          if (originalSrcset && !originalSrcset.startsWith('data:') && !originalSrcset.startsWith('http')) {
            const newSrcset = fixSrcSet(originalSrcset);
            if (originalSrcset !== newSrcset) {
              console.log(`[PathFixer] Corrección final de srcset: ${originalSrcset} -> ${newSrcset}`);
              img.srcset = newSrcset;
            }
          }
        }
      });

      // Corregir rutas en fuentes de imágenes (en picture elements)
      document.querySelectorAll('source').forEach((source) => {
        if (source.srcset) {
          const originalSrcset = source.getAttribute('srcset');
          if (originalSrcset && !originalSrcset.startsWith('data:') && !originalSrcset.startsWith('http')) {
            const newSrcset = fixSrcSet(originalSrcset);
            if (originalSrcset !== newSrcset) {
              console.log(`[PathFixer] Corrigiendo ruta de source: ${originalSrcset} -> ${newSrcset}`);
              source.srcset = newSrcset;
            }
          }
        }
      });

      // Verificar si hay errores en las rutas después de la corrección
      const images = document.querySelectorAll('img');
      images.forEach((img) => {
        if (img.complete && img.naturalWidth === 0) {
          console.warn('[PathFixer] Imagen no cargada después de corrección:', img.src);
          
          // Intento final de corrección para imágenes que no se cargaron
          if (!img.src.includes('/portfolio/') && !img.src.startsWith('data:') && !img.src.startsWith('http')) {
            const correctedSrc = '/portfolio/' + img.src.replace(/^\//, '');
            console.log(`[PathFixer] Intento final de corrección: ${img.src} -> ${correctedSrc}`);
            img.src = correctedSrc;
          }
        }
      });

      console.log('[PathFixer] ejecutado completamente');
    });
  } else {
    console.log('[PathFixer] No se ejecuta en entorno local');
  }
}
