# Lista de verificación para lanzamiento a producción

## Optimizaciones implementadas ✅

- [x] Modernización del CSS (eliminación de Bootstrap)
- [x] Modernización del JavaScript (eliminación de jQuery)
- [x] Implementación de sistema multi-idioma (ES/EN)
- [x] Optimización de componentes específicos
- [x] Lazy loading para imágenes
- [x] Soporte para imágenes WebP
- [x] Optimización de Core Web Vitals
- [x] Metadatos SEO y Open Graph
- [x] Schema.org para mejor representación en búsquedas
- [x] Mejoras de accesibilidad (ARIA, navegación por teclado)
- [x] robots.txt optimizado
- [x] Sitemap XML con soporte multi-idioma

## Antes de desplegar a producción

1. **Verificar imagen Open Graph**:
   - Crear imagen de 1200x630px siguiendo instrucciones en `open-graph-image-instructions.md`
   - Colocarla en `src/assets/img/felix-rivas-og-image.jpg`

2. **Verificar configuración del dominio**:
   - Confirmar que la URL en `src/_data/site.js` es correcta
   - Verificar que el baseUrl está configurado como `/portfolio/` para GitHub Pages
   - Verificar que las URLs en el sitemap.xml son correctas

3. **Ejecutar la compilación final para GitHub Pages**:

   ```bash
   ELEVENTY_ENV=production npm run build
   ```

4. **Verificar el directorio `/docs`**:
   - Confirmar que todos los recursos se han compilado correctamente
   - Revisar las páginas HTML generadas

5. **Subir a GitHub Pages**:
   - Hacer commit de los cambios incluyendo el directorio `/docs`
   - Empujar los cambios a GitHub
   - Configurar GitHub Pages para usar la carpeta `/docs` en la rama principal

## Verificaciones post-lanzamiento

1. **Validar HTML**: Verificar con [W3C Validator](https://validator.w3.org/)
2. **Probar en distintos navegadores**: Chrome, Firefox, Safari, Edge
3. **Probar en dispositivos móviles**: iPhone, Android
4. **Verificar Core Web Vitals**: Usar [PageSpeed Insights](https://pagespeed.web.dev/)
5. **Verificar metadatos Open Graph**: Usar [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
6. **Verificar canonical y hreflang**: Usar [Google Rich Results Test](https://search.google.com/test/rich-results)
7. **Registrar sitio en Google Search Console**

## Próximos pasos (según PROGRESS.md - Fase 6, 7 y 8)

1. **Optimizar Core Web Vitals** más a fondo después de pruebas reales
2. **Añadir funcionalidades adicionales** según necesidades
3. **Configurar CI/CD** para despliegue automático
