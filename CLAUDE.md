# CLAUDE.md — OPTIMAL App Demo

## Qué es este proyecto

Demo interactiva mobile-first de la futura app del cliente de OPTIMAL, un centro de fitness y fisioterapia en Barberà del Vallès (Barcelona). Es un prototipo visual sin backend — todos los datos son mock/hardcoded. El objetivo es que Luis (propietario del centro) la abra en su móvil, la toque como si fuera real, y nos dé feedback visual antes de cerrar requisitos y presupuesto.

**IMPORTANTE:** Esto NO es OPTIMAL-OS (el software de gestión). Es una app separada dirigida a los CLIENTES del centro.

## Stack técnico

- React 18 + Vite + TailwindCSS
- Sin backend, sin Supabase, sin autenticación
- Datos mock hardcoded en el frontend
- PWA básica (manifest.json + meta tags para añadir a pantalla de inicio)
- Deploy en Vercel

## Identidad visual (Brandbook oficial — Sheila Dobón Studio)

### Paleta de colores

| Nombre       | HEX       | Uso principal                                    |
|-------------|-----------|--------------------------------------------------|
| Yellow Snap  | `#E5FA76` | Color primario vibrante, CTAs, acentos principales |
| Core Black   | `#161616` | Fondo principal, textos en fondo claro            |
| Orange Fun   | `#F3AF3E` | Acento cálido secundario, alertas, highlights     |
| Trust Gray   | `#DBD8D2` | Textos secundarios en fondo oscuro, fondos claros |
| Red Pulse    | `#EF3E07` | Acento energético, alertas, badges                |
| Human Gray   | `#C5BDAA` | Textos terciarios, elementos sutiles              |

### Tipografía

- **Neue Haas Grotesk** es la tipografía oficial de la marca.
- Como proxy web usamos **DM Sans** de Google Fonts (grotesca, limpia, similar).
- Mensajes aspiracionales/inspiracionales: usar **italic**.
- Textos informativos: usar **roman** (regular/medium/semibold).
- No usar Instrument Serif, Inter, Plus Jakarta Sans ni ninguna otra.

### Logotipo

Los archivos de logo están en `/public/`:
- `logo-trust-gray.png` → Logo completo (símbolo + OPTIMAL) en Trust Gray — **PARA FONDO OSCURO**
- `logo-core-black.png` → Logo completo en Core Black — **PARA FONDO CLARO**
- `avatar-negative.png` → Solo símbolo en Trust Gray — **PARA FONDO OSCURO (splash, app icon)**
- `avatar-positive.png` → Solo símbolo en Core Black — **PARA FONDO CLARO**
- `imago-trust-gray.png` → Solo texto "OPTIMAL" en Trust Gray
- `imago-core-black.png` → Solo texto "OPTIMAL" en Core Black

El símbolo es un círculo superpuesto a un cuadrado con un arco de separación. Es geométrico y elegante.

### Dirección de diseño

- Profesional, limpio, cálido, no genérico de gym.
- Estilo: dark mode con fondo Core Black (#161616), acentos en Yellow Snap.
- Personalidad de marca: 45% Sabio, 40% Bufón, 15% Compañero.
- Tagline: "Human approach. To sport, to life."
- Tono: cercano pero profesional, nunca corporativo frío.

## Estructura de la app — 4 pantallas + splash

### Splash Screen
- Fondo Core Black (#161616)
- Logo avatar-negative.png centrado con animación de entrada (scale + fade)
- Debajo: texto "OPTIMAL" o usar logo-trust-gray.png
- Duración: ~2 segundos, luego transición suave al Home
- Opcional: tagline "Human approach. To sport, to life." debajo en Human Gray

### Tab Bar (navegación inferior)
- Fondo: Core Black con borde superior sutil (1px rgba white 0.08)
- 4 tabs: Inicio, Clases, Entreno, Perfil
- Tab activo: icono en Yellow Snap + label en Yellow Snap
- Tab inactivo: icono en Human Gray + label en Human Gray
- Safe area bottom para móviles con notch
- Efecto haptic visual al tocar (scale 0.95 momentáneo)

### Pantalla 1: INICIO (Home)

**Header:**
- Saludo: "Hola, Carlos 👋" (texto grande, Trust Gray)
- Subtítulo: fecha actual formateada en español ("Lunes, 3 de marzo")
- Icono de campana (notificaciones) a la derecha con badge rojo

**Próxima sesión (card destacada):**
- Card con borde izquierdo Yellow Snap o fondo sutil
- Servicio: "Entrenamiento Personal"
- Hora: "Hoy, 17:30h"
- Profesional: "Luis"
- Ubicación: "OPTIMAL — Barberà del Vallès"
- Iconos pequeños para cada dato (reloj, persona, ubicación)

**Accesos rápidos (grid 2×2):**
- Reservar Clase → navega a tab Clases
- Mi Entreno → navega a tab Entreno
- Nutrición → (solo visual, no navega)
- Progreso → (solo visual, no navega)
- Cada card: icono + texto, fondo #1E1E1E o similar oscuro, bordes redondeados

**Bonos activos:**
- Card por cada bono activo del usuario demo
- Ejemplo: "Entrenamiento 1h" — "5/8 sesiones" con barra de progreso
- Barra: fondo Human Gray, relleno Yellow Snap, animada al montar
- Segundo bono ejemplo: "Nutrición" — "2/3 sesiones"

**Novedades del centro:**
- 1-2 cards tipo aviso
- Ejemplo: "🔥 Nuevos horarios OpTraining" con fecha
- Ejemplo: "Descubre nuestro servicio de Nutrición deportiva"

### Pantalla 2: CLASES GRUPALES (sustituye Aimharder)

**Selector de día:**
- Fila horizontal de días: Lun, Mar, Mié, Jue, Vie, Sáb
- Día seleccionado: fondo Yellow Snap, texto Core Black
- Otros días: fondo transparente, texto Trust Gray
- Hoy tiene un punto indicator debajo

**Listado de clases del día seleccionado:**
- Cada clase es una card con:
  - Nombre de la clase (OpTraining, Functional, Strong, Hybrid)
  - Hora (ej: "07:00")
  - Entrenador: "Luis"
  - Plazas: "3/14 plazas" con indicador visual (verde si hay, naranja si pocas, rojo si llena)
  - Botón "Reservar" → al tocar cambia a "✓ Reservado" con fondo Yellow Snap
  - Si plazas = 0: texto "Completa" + botón "Lista de espera" en Orange Fun
- Animación stagger al cambiar de día (las cards aparecen secuencialmente)

**Tipos de clase (datos reales del centro):**
- **OpTraining**: CrossTraining a nuestra manera (intensidad alta)
- **Functional**: Entrenamiento funcional (intensidad media)
- **Strong**: Fuerza pura (intensidad alta)
- **Hybrid**: Mezcla funcional + fuerza (intensidad media)
- NO incluir "Posparto" — no existe.

**Datos mock:** Generar horarios realistas para cada día (07:00, 09:30, 12:00, 17:30, 19:00). Sábados solo mañana. El entrenador de todas las grupales es Luis. Plazas entre 10-14 max.

### Pantalla 3: MI ENTRENAMIENTO (sustituye Trainer Plan)

**Cabecera del plan:**
- Nombre del plan: "Fase de Fuerza"
- Semana actual: "Semana 3 de 6"
- Barra de progreso general (50% = semana 3/6)
- Entrenador asignado: "Luis"

**Sesión del día:**
- Título: "Sesión A — Tren Superior + Core"
- Lista de ejercicios, cada uno con:
  - Nombre del ejercicio (realistas: Sentadilla Búlgara, Press Banca, Hip Thrust, etc.)
  - Series × Reps: "4 × 10"
  - Peso sugerido: "60kg"
  - Notas del entrenador (si hay): "Controlar bajada 3s"
  - Checkbox para marcar completado → al tocar: check con animación, texto se atenúa
  - Input para registrar peso usado (aparece al marcar completado)
- Barra de progreso de la sesión que se actualiza con cada ejercicio completado

**Datos mock:** 5-6 ejercicios realistas con pesos, series, reps y alguna nota.

### Pantalla 4: PERFIL

**Cabecera:**
- Avatar con iniciales "CF" (Carlos Fernández) en círculo con fondo Yellow Snap y texto Core Black
- Nombre: "Carlos Fernández"
- Subtítulo: "Cliente desde 2023"

**Estadísticas (fila de 3 cards):**
- Sesiones este mes: "12"
- Bonos activos: "2"
- Asistencia: "94%"

**Menú de opciones (lista vertical):**
- Mis Citas
- Mi Entrenamiento
- Nutrición
- Progreso
- Mis Bonos
- Historial
- Notificaciones
- Configuración
- Cada opción: icono a la izquierda, texto, chevron a la derecha
- Al tocar: efecto ripple/press visual (no navegan a ningún sitio)

## Extras globales

- **Splash screen** con logo al abrir
- **Transiciones suaves** entre pantallas (fade + translateY)
- **Datos dummy realistas** con nombres de clases reales, servicios reales, profesionales reales
- **100% mobile-first** — debe verse perfecto en iPhone/Android de 375px+
- **Botones funcionales**: tocar reservar, marcar ejercicios, cambiar día, etc. cambian estado visual
- **PWA**: manifest.json + meta tags apple-mobile-web-app para añadir a pantalla de inicio
- **No hay login** — se abre directa al Home

## Profesionales del centro (datos reales)

- **Luis**: Entrenamiento personal, preparación física, clases grupales (propietario)
- **Andreu**: Fisioterapia, readaptación de lesiones
- **Pau**: Nutrición y dietética

## Convenciones de código

- Componentes funcionales con hooks
- Un solo archivo App.jsx con todo (demo simple) O componentes separados por pantalla — lo que sea más limpio
- Tailwind para todos los estilos, cero estilos inline
- Animaciones con CSS (keyframes en index.css) o transiciones de Tailwind
- Mobile-first: diseñar para 375px, que escale bien hasta 428px (iPhone Pro Max)
- Colores configurados en tailwind.config.js con los nombres de la marca

## Estructura de archivos esperada

```
optimal-app-demo/
├── public/
│   ├── manifest.json
│   ├── logo-trust-gray.png
│   ├── logo-core-black.png
│   ├── avatar-negative.png
│   ├── avatar-positive.png
│   ├── imago-trust-gray.png
│   └── imago-core-black.png
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Classes.jsx
│   │   ├── Training.jsx
│   │   └── Profile.jsx
│   └── components/
│       ├── TabBar.jsx
│       ├── SplashScreen.jsx
│       └── ProgressBar.jsx
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── CLAUDE.md
```

## Comandos

```bash
npm install          # Instalar dependencias
npm run dev          # Dev server en localhost:5173
npm run build        # Build producción (dist/)
npm run preview      # Preview del build
```
