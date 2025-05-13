# Portafolio Personal de Félix Rivas - UX/UI Designer

Este proyecto es el sitio web de portafolio personal de Félix Rivas, diseñador UX/UI. El sitio se ha modernizado para utilizar tecnologías más actuales y eficientes, eliminando dependencias innecesarias como Bootstrap y jQuery.

## Tecnologías Utilizadas

- **Eleventy** - Sistema de generación de sitios estáticos
- **Sass** - Preprocesador CSS con arquitectura modular (metodología 7-1)
- **JavaScript moderno** - ES6+ con estructura modular
- **Nunjucks** - Sistema de plantillas
- **Multi-idioma** - Soporte completo para español e inglés

## Características

- Sistema de grid personalizado basado en Flexbox
- Diseño totalmente responsivo
- Optimizado para rendimiento y SEO
- Componentes modulares y reutilizables
- Tamaño de archivos reducido al eliminar dependencias pesadas
- Soporte para múltiples idiomas (español e inglés)
- Páginas detalladas de estudios de caso para proyectos del portafolio
- Compatibilidad con GitHub Pages

## Requisitos

- Node.js (v14.0.0 o superior)
- npm (v6.0.0 o superior)

## Instalación

```bash
# Clonar el repositorio
git clone https://github.com/felixrivas/portfolio.git
cd portfolio

# Instalar dependencias
npm install
```

## Comandos Disponibles

```bash
# Desarrollo con live reload (sin prefijo /portfolio/)
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
    fonts/            # Fuentes
  _data/              # Datos para plantillas
  _includes/          # Componentes y layouts
  en/                 # Contenido en inglés
    case-studies/     # Estudios de caso en inglés
  es/                 # Contenido en español
    case-studies/     # Estudios de caso en español
docs/                 # Carpeta de salida para GitHub Pages (generada)
```

## Arquitectura CSS

Se ha implementado una arquitectura CSS basada en la metodología 7-1 con Sass:

- **abstracts/** - Variables, mixins, funciones
- **base/** - Estilos base, reset, tipografía
- **components/** - Componentes reutilizables
- **layout/** - Estructuras principales
- **pages/** - Estilos específicos por página
- **themes/** - Temas (si aplica)

## Mejoras Implementadas

- Eliminación de Bootstrap en favor de un sistema CSS personalizado
- Reemplazo de jQuery por JavaScript moderno
- Mejora de rendimiento y tiempos de carga
- Sistema de componentes modular
- Implementación de selector de idioma nativo
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
