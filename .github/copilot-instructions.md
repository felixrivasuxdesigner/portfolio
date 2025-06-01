# Instrucciones para GitHub Copilot

## Descripción del Proyecto
Este es un portfolio personal para Felix Rivas, un diseñador UX/UI. El sitio web está construido utilizando:
- Nunjucks (njk) para plantillas
- SCSS para estilos
- JavaScript para interactividad
- Estructura multilingüe (español e inglés)

## Estructura del Proyecto
- `/src`: Archivos fuente
  - `/_data`: Datos del sitio y traducciones
  - `/_includes`: Componentes y layouts de Nunjucks
  - `/assets`: Recursos estáticos (imágenes, CSS, JS)
  - `/en` y `/es`: Páginas específicas por idioma
- `/docs`: Carpeta de compilación para el sitio publicado

## Convenciones de Codificación
- Usar 2 espacios para indentación
- Nombres de variables en camelCase para JavaScript
- Nombres de clases CSS en kebab-case
- Comentarios en español o inglés dependiendo del contexto

## Traducciones
- Las cadenas de texto deben ser extraídas a los archivos de traducción en `/_data/translations/`
- Siempre mantener sincronizadas las versiones en español e inglés

## Preferencias de Estilo
- Diseño moderno y minimalista
- Accesibilidad como prioridad
- Rendimiento optimizado (imágenes WebP, CSS y JS minificados)
- Responsive design para todos los componentes

## UX Writing
- Texto claro y conciso, centrado en el usuario
- Tono conversacional pero profesional
- Consistencia en la terminología
- Evitar jerga técnica innecesaria
- Priorizar información importante al inicio (pirámide invertida)
- Microcopy que guíe claramente al usuario en formularios y CTA
- Usar voz activa en lugar de pasiva
- Mensajes de error constructivos y útiles
- Adaptar el tono según el contexto cultural (español/inglés)

## Otros Requisitos
- Mantener el SEO optimizado
- Asegurar que los enlaces internos respeten la estructura de idiomas
- Los estudios de caso deben seguir un formato consistente

## Flujo de Trabajo Git
- Utilizar GitFlow como metodología de control de versiones
- Mantener las siguientes ramas principales:
  - `main`: Versión de producción estable
  - `development`: Rama de integración para nuevas características
- Para nuevas características:
  1. Crear rama `feature/nombre-caracteristica` desde `development`
  2. Desarrollar y probar la característica en esta rama
  3. Hacer merge a `development` cuando esté completa
  4. Hacer merge a `main` después de verificar estabilidad en `development`
- Seguir este flujo asegura que `development` siempre esté actualizada con todas las características más recientes
- Usar mensajes de commit descriptivos en español que expliquen claramente los cambios realizados
