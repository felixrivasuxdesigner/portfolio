# Sistema de Diseño: Radio DAO

## 01. Colores
### Colores base
- **Naranja Ladrillo (#E65100)** - Primario. Usado en CTAs principales, identidad de marca y estados activos.
- **Azul Noche (#1A237E)** - Secundario. Usado en fondos de cabecera, navegación y elementos de gobernanza.
- **Gris Piedra (#37474F)** - Texto principal y bordes de componentes inactivos.
- **Blanco Puro (#FFFFFF)** - Fondos de tarjetas y superficies elevadas.
- **Crema Papel (#F5F5F6)** - Fondo general de la aplicación.

### Colores de marca
- **Amarillo Sol (#FBC02D)** - Acentos y destacados (ej. "En vivo").
- **Verde Esperanza (#388E3C)** - Indicador de éxito y votos positivos.

### Colores de indicación
- **Rojo Alerta (#D32F2F)** - Errores, estados de "Desconectado" o votos negativos.
- **Azul Info (#1976D2)** - Enlaces informativos y notificaciones del sistema.

## 02. Tipografía
### Fuente principal
**Inter** (Google Fonts). Seleccionada por su excelente legibilidad en pantallas pequeñas y su neutralidad moderna.

### Escalas tipográficas
- **H1 (Titular):** Bold, 32px (Mobile) / 40px (Desktop).
- **H2 (Subtítulo):** SemiBold, 24px / 28px.
- **H3 (Sección):** Medium, 20px / 24px.
- **Body 1 (Texto Principal):** Regular, 16px / 1.5 line-height.
- **Body 2 (Secundario/Metadatos):** Regular, 14px / 1.4 line-height.
- **Caption (Etiquetas):** Medium, 12px / Uppercase tracking 1px.

## 03. Espaciado
Sistema base de 8px (Grid de 8pt).
- **XS (4px):** Espacio mínimo entre iconos y texto.
- **S (8px):** Separación interna en botones y chips.
- **M (16px):** Padding estándar de tarjetas y contenedores.
- **L (24px):** Separación entre secciones de contenido.
- **XL (32px):** Márgenes de pantalla y separación de bloques mayores.
- **XXL (48px+):** Espaciado para secciones de aterrizaje.

## 04. Componentes
### Navegación
- **Barra de Navegación Inferior (Mobile):** 4 items (Inicio, Radio, Votar, Perfil). Iconos outline, filled en estado activo.
- **Header:** Sticky, contiene el logo y el estado de conexión (En vivo/Offline).

### Botones (Votar, Escuchar, Participar)
- **Primario:** Fondo Naranja Ladrillo, texto Blanco, bordes redondeados (8px). Sombra suave.
- **Secundario:** Borde Azul Noche, texto Azul Noche, fondo transparente.
- **Botón de Reproducción (FAB):** Flotante, circular, gradiente Naranja a Amarillo, sombra elevada.

### Tarjetas (Propuestas, Noticias)
- **Tarjeta de Propuesta:** Contiene título, estado (Abierta/Cerrada), barra de progreso de votación y botón de acción. Borde sutil, fondo blanco.
- **Tarjeta de Programa:** Imagen de portada cuadrada, título del show, hora de emisión.

### Elementos especiales (Reproductor, Gráficos de Votación)
- **Mini Reproductor:** Barra persistente en la parte inferior con controles básicos (Play/Pause) y visualizador de onda de audio simplificado.
- **Gráfico de Dona:** Para visualizar resultados de votaciones (Si/No/Abstención) con colores de indicación.

## 05. Iconografía
Set de iconos **Phosphor Icons** o similar (estilo Lineal).
Grosor de trazo consistente (2px).
Iconos clave: Micrófono (Radio), Urna/Ticket (Votar), Usuarios (Comunidad), Play/Pause.

## 06. Imágenes
- **Fotografía:** Estilo documental, alto contraste, mostrando personas reales de la comunidad y equipos de radio. Filtro cálido sutil.
- **Ilustraciones:** Estilo lineal simple para estados vacíos (empty states) u onboarding.

## 07. Principios UX
- **Inmediatez:** El audio debe comenzar a sonar en menos de 2 segundos.
- **Transparencia:** El estado de las votaciones y la gobernanza debe ser comprensible para usuarios no técnicos.
- **Pertenencia:** El usuario siempre debe ver su impacto (ej. "Tu voto fue registrado").

## 08. Responsive
Diseño *Mobile-First*.
Adaptación fluida a tablets y desktop mediante grid flexible.
En desktop, el reproductor y el chat se fijan en una barra lateral persistente (sidebar).

## 09. Microcopy
- **Tono:** Cercano, inclusivo, motivador.
- **Ejemplos:**
    - Botón Play: "Sintonizar ahora"
    - Votar: "Haz oír tu voz"
    - Error: "La señal esta débil, intentemos de nuevo."

## 10. Accesibilidad
- Cumplimiento WCAG AA.
- Alto contraste en todos los textos de lectura.
- Soporte completo para lectores de pantalla (VoiceOver/TalkBack), especialmente en los flujos de votación.
- Áreas de toque mínimas de 44x44px.
