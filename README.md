# Portafolio Personal de Félix Rivas - UX/UI Designer

Este repositorio contiene mi sitio web personal de portafolio como diseñador UX/UI. Este es un proyecto **personal** que está público únicamente para aprovechar las capacidades de alojamiento de GitHub Pages, pero no está diseñado para recibir contribuciones externas.

> **Nota**: La rama `main` está protegida y requiere pull requests para cualquier cambio, debido a que es un sitio web profesional en producción.

## Sobre Este Portafolio

Este sitio web ha sido completamente renovado desde su versión original para utilizar tecnologías modernas y eficientes, eliminando dependencias innecesarias como Bootstrap y jQuery.

## Tecnologías Utilizadas

- **Eleventy** - Sistema de generación de sitios estáticos
- **Sass** - Preprocesador CSS con arquitectura modular (metodología 7-1)
- **JavaScript moderno** - ES6+ con estructura modular
- **Nunjucks** - Sistema de plantillas
- **Multi-idioma** - Soporte completo para español e inglés

## Características Principales

- Diseño totalmente responsivo y optimizado para todos los dispositivos
- Sistema de grid personalizado basado en Flexbox
- Optimizado para rendimiento y SEO
- Componentes modulares y reutilizables
- Tamaño de archivos reducido al eliminar dependencias pesadas
- Soporte para múltiples idiomas (español e inglés)
- Páginas detalladas de estudios de caso para proyectos del portafolio
- Compatible con GitHub Pages y optimizado para su despliegue automático

## Desarrollo Local

> **Nota**: Este repositorio no está diseñado para recibir contribuciones externas. Esta información es únicamente para mi referencia personal.

### Requisitos

- Node.js (v14.0.0 o superior)
- npm (v6.0.0 o superior)

### Comandos Disponibles

```bash
# Desarrollo con live reload
npm run dev
# o
npm start

# Compilar solo Sass
npm run sass

# Compilar Sass y vigilar cambios
npm run sass:watch

# Generar build de producción (con prefijo /portfolio/)
npm run build:prod
# o
ELEVENTY_ENV=production npm run build

# Simular GitHub Pages localmente (navegar a http://localhost:8000/portfolio/)
npm run serve:prod

# Limpiar carpeta de distribución
npm run clean
```

## Estructura del Proyecto

```text
src/                  # Código fuente
  assets/             # Recursos estáticos
    scss/             # Archivos Sass (estructura 7-1)
    js/               # JavaScript modular
    img/              # Imágenes
  _data/              # Datos y traducciones para plantillas
  _includes/          # Componentes y layouts
  en/                 # Contenido en inglés
    case-studies/     # Estudios de caso en inglés
  es/                 # Contenido en español
    case-studies/     # Estudios de caso en español
docs/                 # Carpeta de salida para GitHub Pages (generada)
```

## Estructura del Sistema de Diseño

El portafolio incluye presentaciones de sistemas de diseño para diferentes proyectos. Cada proyecto tiene su propio estilo visual diferenciado:

### Organización de Archivos

```
src/
  _data/
    translations/
      case-studies/
        designSystem/         # Sistemas de diseño organizados por proyecto
          journeylaw/         # Sistema de diseño específico para el proyecto JourneyLaw
            en.json           # Versión en inglés
            es.json           # Versión en español
          nomadix/            # Sistema de diseño específico para el proyecto Nomadix
            en.json           # Versión en inglés
            es.json           # Versión en español
```

### Estructura de Estilos

```
src/
  assets/
    scss/
      pages/
        _journeylaw.scss      # Estilos específicos para Journey Law
        _nomadix.scss         # Estilos específicos para Nomadix 
```

### Implementación

Cada sistema de diseño se construye usando:

1. **Datos JSON**: Estructura con información de colores, tipografía, componentes, etc.
2. **Plantillas Nunjucks**: Componente compartido (`design-system-showcase.njk`) que visualiza el sistema
3. **Estilos SCSS**: Archivos dedicados que aplican la identidad visual específica de cada proyecto

El sistema determina qué estilos aplicar basándose en el `projectKey` del estudio de caso actual.

### Ejemplo de un Sistema de Diseño

Para el proyecto **JourneyLaw**, el sistema de diseño se encuentra en:

- Archivos JSON: `src/_data/translations/case-studies/designSystem/journeylaw/`
- Estilos SCSS: `src/assets/scss/pages/_journeylaw.scss`

## Arquitectura del Proyecto

### Arquitectura CSS

Implementé una arquitectura CSS basada en la metodología 7-1 con Sass:

- **abstracts/** - Variables, mixins y funciones
- **base/** - Estilos base, reset y tipografía
- **components/** - Componentes reutilizables
- **layout/** - Estructuras principales
- **pages/** - Estilos específicos por página
- **themes/** - Configuración para modo claro/oscuro

### Arquitectura JavaScript

Organización modular con responsabilidades separadas:

- **modules/** - Módulos independientes con funcionalidad específica
- **main.js** - Punto de entrada que importa los módulos necesarios
- **service-worker.js** - Para funcionalidades offline y mejor rendimiento

## Contacto

Para contactar conmigo sobre este proyecto o cualquier oportunidad profesional:

- **Email**: [hi@felixrivas.co](mailto:hi@felixrivas.co)
- **Sitio Web**: [felixrivas.co](https://felixrivas.co)
- **LinkedIn**: [Felix Rivas](https://www.linkedin.com/in/felixrivasuxdesigner/)

---

© 2025 Félix Rivas - Todos los derechos reservados

- Mejora de accesibilidad
- Conversión de modales a páginas dedicadas de estudios de caso
- Configuración para despliegue en GitHub Pages

## Mantenimiento

Para modificar el tema o personalizar estilos:

1. Editar variables en `src/assets/scss/abstracts/_variables.scss`
2. Ejecutar `npm run dev` para ver cambios en tiempo real

## Despliegue a GitHub Pages

Para configurar el despliegue a GitHub Pages, consulta las instrucciones detalladas en [DEPLOY-TO-GITHUB-PAGES.md](DEPLOY-TO-GITHUB-PAGES.md).

## Autor

- **Félix Rivas** - UX/UI Designer

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para más detalles.
