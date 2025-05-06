/**
 * Service Worker para Portfolio de Félix Rivas
 * Proporciona funcionalidad offline básica
 */

// Nombre y versión de la caché
const CACHE_NAME = 'felix-portfolio-v1';

// Recursos que queremos cachear para funcionamiento offline
const CACHE_ASSETS = [
  '/portfolio/',
  '/portfolio/index.html',
  '/portfolio/en/index.html',
  '/portfolio/es/index.html',
  '/portfolio/assets/css/main.css',
  '/portfolio/assets/js/main.js',
  '/portfolio/assets/img/logo.webp',
  '/portfolio/assets/img/banner-img/bg.webp',
  '/portfolio/assets/img/gallery-img/belcorp/cover-belcorp.webp',
  '/portfolio/assets/img/gallery-img/security/cover-factoring.webp',
  '/portfolio/assets/img/gallery-img/nomadix/cover-nomadix.webp',
  '/portfolio/assets/resumen/Felix-Rivas-UXUI-Designer-EN.pdf',
  '/portfolio/assets/resumen/Felix-Rivas-UXUI-Designer-ES.pdf',
  // Agrega aquí los iconos de FontAwesome y otros recursos importantes
  'https://use.fontawesome.com/releases/v6.4.0/css/all.css',
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  // Esperar hasta que el caché esté listo
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('Caché abierta');
        return cache.addAll(CACHE_ASSETS);
      })
      .then(() => self.skipWaiting()) // Forzar al SW a activarse inmediatamente
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  // Limpiar cachés anteriores
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== CACHE_NAME) {
              console.log('Limpiando caché antigua:', cache);
              return caches.delete(cache);
            }
          })
        );
      })
      .then(() => self.clients.claim()) // Tomar el control de los clientes inmediatamente
  );
});

// Interceptar solicitudes de red
self.addEventListener('fetch', (event) => {
  // Estrategia Cache First con Network Fallback
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Si el recurso está en caché, devolverlo
      if (response) {
        return response;
      }

      // Si no está en caché, solicitarlo a la red
      return fetch(event.request)
        .then((networkResponse) => {
          // Comprobar si recibimos una respuesta válida
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type !== 'basic'
          ) {
            return networkResponse;
          }

          // Clonar la respuesta para guardarla en caché y devolverla
          const responseToCache = networkResponse.clone();

          caches.open(CACHE_NAME).then((cache) => {
            // Solo cachear solicitudes GET
            if (event.request.method === 'GET') {
              cache.put(event.request, responseToCache);
            }
          });

          return networkResponse;
        })
        .catch(() => {
          // Si falla la red y es una solicitud de página, mostrar página offline
          if (event.request.mode === 'navigate') {
            return caches.match('/portfolio/index.html');
          }

          // Para recursos no críticos, no hacer nada
          return new Response('Sin conexión a Internet');
        });
    })
  );
});

// Gestionar mensajes enviados al Service Worker
self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
