# Sistema de Diseño: IntelliResearch

## 01. Colores
### Colores base
- **Azul Cobalto Profundo (#0D47A1)** - Identidad corporativa, fondos de navegación lateral y encabezados principales.
- **Cian Eléctrico (#00E5FF)** - Color de acento primario. Indica interacción, selección y resultados de IA.
- **Blanco Hielo (#F0F4F8)** - Fondo general del contenido (Light Mode).
- **Gris Pizarra (#263238)** - Texto principal y elementos de UI en Dark Mode.
- **Negro Carbón (#121212)** - Fondo principal en Dark Mode.

### Colores de marca
- **Violeta Inteligencia (#7C4DFF)** - Usado específicamente para denotar características o sugerencias generadas por IA.
- **Plata Meticuloso (#B0BEC5)** - Bordes, líneas divisorias y textos secundarios.

### Colores de indicación (Semáforo de Severidad)
- **Rojo Crítico (#FF1744)** - Pain Points severos, errores de sistema.
- **Naranja Alto (#FF9100)** - Problemas de usabilidad importantes, advertencias.
- **Verde Validación (#00C853)** - Hipótesis validadas, feedback positivo, éxito del sistema.

## 02. Tipografía
### Fuente principal
**Roboto** (Google Fonts). Elegida por su naturaleza mecánica pero amigable, estandarte de interfaces de productividad. Opcionalmente **Inter** para mayor modernidad.

### Escalas tipográficas
- **Display 1:** Light, 96px / -1.5px tracking. (Marketing/Landing).
- **H1 (Título de Pagina):** Medium, 34px / 40px.
- **H2 (Sección):** Regular, 24px / 32px.
- **Subtitle 1:** Regular, 16px / 24px.
- **Body 1 (Contenido largo):** Regular, 16px / 1.6 line-height (optimo para lectura de transcripciones).
- **Body 2 (UI):** Medium, 14px / 20px.
- **Button:** Medium, 14px / Uppercase.
- **Caption:** Regular, 12px / 0.4px tracking.

## 03. Espaciado
Sistema base de 4px (Grid denso).
- **2px:** Espaciado micro dentro de componentes complejos.
- **4px:** Separación estándar entre elementos relacionados.
- **8px:** Padding interno de botones y inputs.
- **16px:** Margen estándar entre columnas.
- **24px:** Separación de bloques lógicos.
- **64px+:** Espaciado en layouts de marketing.

## 04. Componentes
### Navegación
- **Sidebar Colapsable:** Iconos claros con tooltips. Maximiza el espacio de trabajo para el análisis.
- **Breadcrumbs:** Esenciales para la navegación profunda entre Proyectos > Estudios > Sesiones.

### Botones (Analizar, Exportar, Filtrar)
- **Primario (CTA):** Fondo Azul Cobalto, texto Blanco. Borde redondeado sutil (4px).
- **Acción IA:** Fondo gradiente Violeta a Cian, icono de "chispas" (sparkles).
- **Terciario/Ghost:** Sin fondo, texto en Gris Pizarra, hover con fondo gris muy claro.

### Tarjetas (Insights, Citas)
- **Insight Card:** Diseño compacto. Borde izquierdo de color según severidad. Contiene título, fragmento de texto y etiquetas. Acciones al hover.
- **Quote Card:** Estilo "burbuja de chat" formal. Fondo blanco con sombra suave. Identificador del hablante.

### Elementos especiales (Timeline, Filtros)
- **Timeline de Video:** Barra de progreso rica, con marcadores de colores superpuestos indicando momentos clave. Zoomable.
- **Matriz de Validación:** Tabla interactiva con celdas que cambian de estado/color según la evidencia vinculada.

## 05. Iconografía
Set de iconos **Material Symbols Rounded**.
Estilo sólido (Filled) para estados activos, contorno (Outlined) para inactivos.
Iconos clave: Robot/IA, Cerebro (Insights), Gráfica de barras, Play, Bandera (Pain Point).

## 06. Imágenes
- **Abstractas Tecnológicas:** Patrones de redes neuronales, ondas de sonido estilizadas en tonos de marca.
- **Capturas de Producto:** Mockups de alta fidelidad mostrando la interfaz en acción, con énfasis en la visualización de datos.

## 07. Principios UX
- **Eficiencia:** Atajos de teclado para todas las acciones de etiquetado y reproducción (J, K, L, Espacio, Ctrl+S).
- **Claridad:** La distinción entre lo que dijo el usuario y lo que interpretó la IA debe ser siempre obvia.
- **Prevención de Errores:** Confirmaciones para acciones destructivas, autoguardado constante.

## 08. Responsive
Diseño *Desktop-First*.
La experiencia de análisis profundo está optimizada para pantallas grandes.
La versión móvil es complementaria, enfocada en la consulta rápida de resultados y notificaciones ("View-only" o "Review mode").

## 09. Microcopy
- **Tono:** Profesional, directo, técnico pero accesible.
- **Ejemplos:**
    - AI Action: "Generando síntesis..."
    - Empty State: "No hay entrevistas aún. Sube un video o inicia una grabación para comenzar."
    - Éxito: "Análisis completado. Se encontraron 5 puntos críticos."

## 10. Accesibilidad
- Soporte para navegación completa por teclado.
- Modos de alto contraste disponibles.
- Transcripciones editables para corrección manual, asegurando fidelidad de los datos.
- Indicadores de estado redundantes (Color + Icono + Texto).
