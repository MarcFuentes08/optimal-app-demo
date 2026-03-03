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
- `avatar-negative.png` → Solo símbolo en Trust Gray — **PARA FONDO OSCURO (splash, onboarding, app icon)**
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

## Flujo de la app

Onboarding (3 slides, solo primera vez) → Splash Screen → Home

El onboarding se guarda en localStorage (`optimal_onboarding_seen`). Una vez visto, la app abre directamente con el splash.

## Estructura de la app — 4 tabs + bottom sheets

### Onboarding (src/components/Onboarding.jsx)
- 3 slides con swipe/botón: Bienvenida, Features, Equipo
- Dots indicator, botón "Saltar", "Empezar" en último slide
- Se muestra solo la primera vez (localStorage)

### Splash Screen (src/components/SplashScreen.jsx)
- Fondo Core Black (#161616)
- Logo avatar-negative.png centrado con animación de entrada (scale + fade)
- Tagline "Human approach. To sport, to life."
- Duración: ~2 segundos, luego transición suave al Home

### Tab Bar (src/components/TabBar.jsx)
- Fondo: Core Black con borde superior sutil
- 4 tabs: Inicio, Clases, Entreno, Perfil
- Tab activo: Yellow Snap. Tab inactivo: Human Gray
- Haptic feedback visual al tocar (scale 0.85 + opacity)
- Safe area bottom para móviles con notch

### Pantalla 1: INICIO (src/pages/Home.jsx)

**Header:**
- Saludo: "Hola, Carlos 👋" (text-2xl, Trust Gray)
- Subtítulo: fecha actual formateada en español
- Icono campana a la derecha → abre Notificaciones (badge rojo dinámico)

**Próxima sesión:** Card con borde izquierdo Yellow Snap, datos de la sesión.

**Accesos rápidos (grid 2×2):**
- Reservar Clase → navega a tab Clases
- Mi Entreno → navega a tab Entreno
- Nutrición → abre bottom sheet de Nutrición (contacto con Pau por WhatsApp)
- Progreso → abre bottom sheet de Progreso

**Bonos activos:** Barras de progreso animadas Yellow Snap.

**Nuestros Servicios:** Cards de Fisioterapia, Readaptación, Nutrición, Entrenamiento con botones de WhatsApp y teléfono (datos reales).

**Novedades del centro:** Cards informativas.

**Pull to refresh:** Simulado con spinner Yellow Snap (1s).

### Pantalla 2: CLASES GRUPALES (src/pages/Classes.jsx)

**Selector de día:** Lun-Dom (7 días). Domingo muestra estado vacío ("No hay clases programadas. Disfruta del descanso 💤").

**Cards de clase:** Tocar la zona de info abre detalle de clase (bottom sheet). Botón reservar funciona independientemente.

**Detalle de clase (ClassDetail):** Bottom sheet con descripción de la clase, info de sesión (hora, duración, entrenador, plazas), y botón reservar.

**Tipos de clase:** OpTraining (alta), Functional (media), Strong (alta), Hybrid (media).

**Pull to refresh:** Simulado.

### Pantalla 3: MI ENTRENAMIENTO (src/pages/Training.jsx)

**Enfoque: deportes de resistencia** (triatlón, running, ciclismo). NO ejercicios de gimnasio.

**Cabecera:** "Preparación Media Maratón — Fase de Carga", Semana 6 de 12, barra 50%.

**Métricas de sesión:** Badges de distancia (12 km), duración (~55 min), zona (Z3-Z4).

**Sesión del día en 4 bloques:**
- Calentamiento (icono flame, Orange Fun): trote Z1, movilidad, progresivos
- Parte Principal (icono rayo, Yellow Snap): series umbral 5×1km
- Vuelta a la calma (Trust Gray): trote suave, estiramientos
- Fuerza complementaria (Human Gray, opcional): sentadilla, peso muerto, gemelo

Cada ítem con checkbox funcional. Notas del entrenador en italic Orange Fun.

**Semana completa:** Mini-calendario con plan multideporte (descanso, series, natación, rodaje, fuerza, tirada larga, bici). Día activo con borde Yellow Snap. Sesión clave con badge "Clave" en Orange Fun.

### Pantalla 4: PERFIL (src/pages/Profile.jsx)

**Cabecera:** Avatar "CF" en Yellow Snap, nombre, "Cliente desde 2023".

**Stats:** 3 mini-cards (Sesiones, Bonos activos, Asistencia).

**Menú — TODOS los ítems son funcionales y abren bottom sheets:**
- Mis Citas → Appointments.jsx
- Mi Entrenamiento → navega a tab Entreno
- Nutrición → NutricionSheet (en Home.jsx)
- Progreso → Progress.jsx
- Mis Bonos → Bonos.jsx
- Historial → History.jsx
- Notificaciones → Notifications.jsx
- Configuración → Settings.jsx

## Bottom Sheets (src/pages/)

Todos los bottom sheets siguen el mismo patrón:
- `position: fixed; inset: 0; z-index: 50`
- Backdrop: `fixed inset-0` con opacity animada
- Sheet: slide-up desde `translateY(100%)` a `translateY(0)`, 95dvh de altura
- Drag indicator, botón cerrar (X), contenido scrollable
- Animación de entrada con `requestAnimationFrame` (double rAF en Notifications)

### Notifications.jsx
- Lista de notificaciones con estados leída/no leída
- Tocar alterna estado. "Marcar todo como leído" oculta badge en Home.

### Progress.jsx
- Resumen actividad (38 sesiones, 12.4 media, 94% asistencia)
- Gráfico barras vertical (8 semanas, animado)
- Volumen semanal km (barras horizontales)
- Marcas personales (5K, 10K, media maratón)
- Últimas sesiones

### Bonos.jsx
- Bonos activos con barras progreso, fechas, profesional, precio, estado pago
- Bonos completados con opacity reducida
- Resumen: totales, activos, invertido

### Appointments.jsx
- Tabs "Próximas" / "Pasadas"
- Próximas con badge "Confirmada" verde + botón "Cancelar" en Red Pulse
- Pasadas con opacity reducida, badge "Completada"

### History.jsx
- Selector de mes con flechas (Marzo / Febrero 2026)
- Sesiones agrupadas por semana
- Badge "Completada" verde / "Ausencia" rojo
- Notas de PRs en italic Yellow Snap
- Resumen del mes (sesiones, ausencias, % asistencia)

### Settings.jsx
- Toggles funcionales de notificaciones (switch pill animado)
- Cuenta: idioma, unidades, zona horaria
- Legal: privacidad, términos, licencias
- Info app: logo, versión, copyright

## Componentes compartidos (src/components/)

- **TabBar.jsx**: Navegación inferior con haptic feedback
- **SplashScreen.jsx**: Pantalla de carga inicial
- **Onboarding.jsx**: 3 slides de bienvenida (primera vez)
- **WhatsAppFAB.jsx**: Botón flotante WhatsApp con menú de 3 contactos + overlay para cerrar
- **PullToRefresh.jsx**: Simulación pull-to-refresh con spinner (usado en Home y Classes)
- **Skeleton.jsx**: Skeleton loading para transición entre tabs (300ms)
- **ProgressBar.jsx**: Barra de progreso reutilizable

## UX implementada

- **Skeleton loading**: 300ms de skeletons al cambiar de tab
- **Pull to refresh**: Simulado en Home y Classes con spinner Yellow Snap
- **Haptic feedback**: scale + opacity en botones, cards y tabs
- **Estado vacío**: Domingo en Clases muestra estado vacío
- **Scroll contenido**: Body fijo, contenido scrollable con overscroll-behavior: contain
- **Animaciones**: page-in (fade+translate), card-in (stagger), check-pop, spin para refresh
- **IMPORTANTE CSS**: La animación page-in usa `transform: none` (NO `translateY(0)`) en el estado final para no crear containing block que rompa `position: fixed` de los modales

## Datos de contacto reales

- **Luis**: 613 01 51 02 — wa.me/34613015102
- **Andreu**: 606 72 82 57 — wa.me/34606728257
- **Pau**: 613 00 79 15 — wa.me/34613007915
- **Email**: info@optimalbarbera.com

## Profesionales del centro (datos reales)

- **Luis**: Entrenamiento personal, preparación física, clases grupales (propietario)
- **Andreu**: Fisioterapia, readaptación de lesiones
- **Pau**: Nutrición y dietética

## Convenciones de código

- Componentes funcionales con hooks
- Componentes separados por pantalla en `src/pages/`, compartidos en `src/components/`
- Bottom sheets: componente propio en `src/pages/`, patrón fixed+overlay+slide-up
- Tailwind para todos los estilos. Estilos inline solo para valores dinámicos (transform, delays)
- Animaciones con CSS keyframes en index.css
- Mobile-first: diseñar para 375px, que escale bien hasta 428px
- Colores configurados en tailwind.config.js con los nombres de la marca
- Todos los modales/bottom sheets DEBEN usar `position: fixed` (nunca `absolute` para el contenedor principal ni el backdrop)

## Estructura de archivos

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
│   │   ├── Profile.jsx
│   │   ├── Progress.jsx
│   │   ├── Bonos.jsx
│   │   ├── Appointments.jsx
│   │   ├── Notifications.jsx
│   │   ├── History.jsx
│   │   └── Settings.jsx
│   └── components/
│       ├── TabBar.jsx
│       ├── SplashScreen.jsx
│       ├── Onboarding.jsx
│       ├── WhatsAppFAB.jsx
│       ├── PullToRefresh.jsx
│       ├── Skeleton.jsx
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
