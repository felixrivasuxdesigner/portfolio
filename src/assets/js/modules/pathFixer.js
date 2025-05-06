/**
 * Path Fixer Module
 * Este módulo corrige las rutas de imágenes y otros recursos para GitHub Pages
 */

export function fixPaths() {
  // Solo ejecutar si estamos en GitHub Pages (felixrivasuxdesigner.github.io)
  if (window.location.hostname.includes('github.io')) {
    const baseUrl = '/portfolio/';

    // Agregamos una corrección inicial para las imágenes que se cargan antes de que el script se ejecute
    document.addEventListener('DOMContentLoaded', () => {
      const preloadedImages = document.querySelectorAll(
        'img[srcset], img:not([src^="http"]):not([src^="data:"]), source[srcset]'
      );
      preloadedImages.forEach((img) => {
        if (img.srcset) {
          const newSrcset = fixUrl(img.srcset);
          if (img.srcset !== newSrcset) {
            console.log(
              `Pre-corrección de srcset: ${img.srcset} -> ${newSrcset}`
            );
            img.srcset = newSrcset;
          }
        }

        if (
          img.src &&
          !img.src.startsWith('data:') &&
          !img.src.startsWith('http')
        ) {
          const originalSrc = img.getAttribute('src');
          const newSrc = fixUrl(originalSrc);
          if (originalSrc !== newSrc) {
            console.log(
              `Pre-corrección de imagen: ${originalSrc} -> ${newSrc}`
            );
            img.src = newSrc;
          }
        }
      });

      // Verificación de background-images que no se corrigieron
      document
        .querySelectorAll('[data-bg], [data-parallax-bg-img]')
        .forEach((el) => {
          if (el.hasAttribute('data-bg')) {
            const bgUrl = el.getAttribute('data-bg');
            if (
              bgUrl &&
              !bgUrl.startsWith('http') &&
              !bgUrl.startsWith(baseUrl)
            ) {
              const newBgUrl = fixUrl(bgUrl);
              el.setAttribute('data-bg', newBgUrl);
              console.log(`Corrigiendo data-bg: ${bgUrl} -> ${newBgUrl}`);
            }
          }

          if (el.hasAttribute('data-parallax-bg-img')) {
            const bgUrl = el.getAttribute('data-parallax-bg-img');
            if (
              bgUrl &&
              !bgUrl.startsWith('http') &&
              !bgUrl.startsWith(baseUrl)
            ) {
              const newBgUrl = fixUrl(bgUrl);
              el.setAttribute('data-parallax-bg-img', newBgUrl);
              console.log(`Corrigiendo parallax bg: ${bgUrl} -> ${newBgUrl}`);
            }
          }
        });
    });

    // Función para corregir una URL
    function fixUrl(url) {
      // Si la URL ya comienza con http/https o con la base URL, no la modificamos
      if (!url || url.startsWith('http') || url.startsWith(baseUrl)) {
        return url;
      }

      // Si la URL comienza con una barra, la reemplazamos con la base URL
      if (url.startsWith('/')) {
        return baseUrl + url.substring(1);
      }

      // De lo contrario, simplemente añadimos la base URL
      return baseUrl + url;
    }

    // Corregir rutas en imágenes
    document.querySelectorAll('img').forEach((img) => {
      if (img.src && !img.src.startsWith('data:')) {
        const originalSrc = img.getAttribute('src');
        const newSrc = fixUrl(originalSrc);
        if (originalSrc !== newSrc) {
          console.log(
            `Corrigiendo ruta de imagen: ${originalSrc} -> ${newSrc}`
          );
          img.src = newSrc;
        }
      }
    });

    // Corregir rutas en fuentes de imágenes (en picture elements)
    document.querySelectorAll('source').forEach((source) => {
      if (source.srcset) {
        const originalSrcset = source.getAttribute('srcset');
        const newSrcset = fixUrl(originalSrcset);
        if (originalSrcset !== newSrcset) {
          console.log(
            `Corrigiendo ruta de source: ${originalSrcset} -> ${newSrcset}`
          );
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
            console.log(
              `Corrigiendo ruta de fondo: ${originalUrl} -> ${newUrl}`
            );
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
            console.log(
              `Corrigiendo ruta de enlace: ${originalHref} -> ${newHref}`
            );
            link.href = newHref;
          }
        }
      }
    });

    // Corregir URLs en hojas de estilo
    Array.from(document.styleSheets).forEach((styleSheet) => {
      try {
        // Solo procesar hojas de estilo del mismo origen
        if (
          styleSheet.href &&
          !styleSheet.href.startsWith(window.location.origin)
        ) {
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
                if (
                  !originalUrl.startsWith('http') &&
                  !originalUrl.includes(baseUrl)
                ) {
                  const newUrl = fixUrl(originalUrl);
                  if (originalUrl !== newUrl) {
                    console.log(
                      `Corrigiendo ruta en CSS: ${originalUrl} -> ${newUrl}`
                    );
                    rule.style.backgroundImage = bgImage.replace(
                      originalUrl,
                      newUrl
                    );
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

    console.log('Path Fixer ejecutado correctamente');
  }
}
