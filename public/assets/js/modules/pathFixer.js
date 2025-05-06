/**
 * Path Fixer Module - Versión simplificada
 * Este módulo corrige las rutas de imágenes y otros recursos para GitHub Pages
 */

export function fixPaths() {
  // Solo ejecutar si estamos en GitHub Pages (felixrivasuxdesigner.github.io)
  if (window.location.hostname.includes('github.io')) {
    const baseUrl = '/portfolio/';
    
    // Inyectar un script que se ejecute inmediatamente
    const scriptContent = `
      (function() {
        const baseUrl = '/portfolio/';
        const domain = 'https://felixrivasuxdesigner.github.io';
        
        // Corregir rutas absolutas incorrectas
        function fixUrl(url) {
          if (!url) return url;
          
          // URLs absolutas al dominio pero sin /portfolio/
          if (url.startsWith(domain) && !url.includes('/portfolio/')) {
            return url.replace(domain, domain + '/portfolio');
          }
          
          // URLs que comienzan con / pero no con /portfolio/
          if (url.startsWith('/') && !url.startsWith('/portfolio/')) {
            return baseUrl + url.substring(1);
          }
          
          return url;
        }
        
        // Corregir imágenes al crearse
        const originalCreateElement = document.createElement;
        document.createElement = function(tagName) {
          const element = originalCreateElement.call(document, tagName);
          
          if (tagName.toLowerCase() === 'img') {
            const originalSetAttribute = element.setAttribute;
            element.setAttribute = function(name, value) {
              if (name === 'src') {
                arguments[1] = fixUrl(value);
              }
              return originalSetAttribute.apply(this, arguments);
            };
          }
          
          return element;
        };
        
        // Corregir todas las imágenes existentes
        document.addEventListener('DOMContentLoaded', function() {
          // Corregir imágenes
          document.querySelectorAll('img').forEach(function(img) {
            if (img.src) {
              const newSrc = fixUrl(img.src);
              if (img.src !== newSrc) {
                console.log('Corrigiendo imagen:', img.src, '->', newSrc);
                img.src = newSrc;
              }
            }
          });
          
          // Corregir SVG paths
          document.querySelectorAll('svg path').forEach(function(path) {
            const d = path.getAttribute('d');
            if (d) {
              // Corregir problema común en SVG: falta de espacio antes de comandos
              const fixedD = d.replace(/(\\d+[\\.,]\\d*|\\d+)([MCSLHVZQTA])/gi, '$1 $2');
              if (d !== fixedD) {
                console.log('Corrigiendo SVG path');
                path.setAttribute('d', fixedD);
              }
            }
          });
          
          // Corregir background-images
          document.querySelectorAll('[style*="background-image"]').forEach(function(el) {
            if (el.style && el.style.backgroundImage) {
              const bgImage = el.style.backgroundImage;
              if (bgImage.includes('url(')) {
                const urlMatch = bgImage.match(/url\\\\(['"]?([^'"\\\\)]+)['"]?\\\\)/i);
                if (urlMatch && urlMatch[1]) {
                  const originalUrl = urlMatch[1];
                  const newUrl = fixUrl(originalUrl);
                  if (originalUrl !== newUrl) {
                    console.log('Corrigiendo background:', originalUrl, '->', newUrl);
                    el.style.backgroundImage = bgImage.replace(originalUrl, newUrl);
                  }
                }
              }
            }
          });
        });
      })();
    `;
    
    // Crear e insertar el script al principio del documento
    const script = document.createElement('script');
    script.textContent = scriptContent;
    
    // Insertar al principio para que se ejecute lo antes posible
    if (document.head.firstChild) {
      document.head.insertBefore(script, document.head.firstChild);
    } else {
      document.head.appendChild(script);
    }
    
    // El resto del código original para seguir corrigiendo después
    // ...existing code...
  }
}
