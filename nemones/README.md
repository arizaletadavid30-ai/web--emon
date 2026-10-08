# Ñemones Basquet Club

Web del equipo hecha con HTML, CSS y JavaScript puro (sin frameworks ni build step).

## Estructura

```
nemones/
├── index.html        Inicio: hero, próximo partido, accesos rápidos
├── plantilla.html     Quinteto titular, filtro/orden de jugadores y comparador
├── calendario.html    Calendario completo de la temporada y resultados
├── club.html          Sobre el club: historia, cantera, palmarés y cuerpo técnico
├── galeria.html       Galería con filtro por categoría y visor ampliado
├── contacto.html      Formulario de contacto (patrocinio, prensa, cantera)
├── tienda.html         Tienda: buscador, filtro por categoría, tallas y cesta
├── producto.html       Detalle de producto (producto.html?id=...)
├── reservas.html      Mapa de asientos con aforo, formulario validado e histórico "Mis reservas"
├── assets/            favicon.svg (escudo) e og-image.png (imagen al compartir el enlace)
├── css/styles.css     Estilos de todo el sitio (incluye el tema claro y las animaciones)
└── js/
    ├── data.js        Datos: jugadores, productos, calendario, próximo partido, pabellón, historia, cantera, palmarés, staff y galería
    ├── tema.js        Aplica el modo oscuro/claro antes de pintar (se carga en el <head>)
    ├── nav.js         Menú móvil, año del footer, botón de tema, contador de cesta, avisos (toast) y compartir enlaces
    ├── quinteto.js     Quinteto titular (Inicio y Plantilla)
    ├── plantilla.js    Fichas, filtro/orden y comparador de jugadores
    ├── club.js         Historia, cantera, palmarés y cuerpo técnico
    ├── galeria.js      Galería y visor
    ├── contacto.js     Formulario de contacto (demo, se guarda en localStorage)
    ├── calendario.js   Pinta el calendario y filtra entre todos/próximos/resultados
    ├── carrito.js      Cesta compartida (tienda y detalle) y utilidades de tallas/búsqueda
    ├── tienda.js       Catálogo con buscador y filtro por categoría
    ├── producto.js     Página de detalle de producto
    └── reservas.js     Mapa, aforo por sección, validación del formulario e histórico de reservas
```

## Ver el proyecto en local (VS Code)

1. Abre la carpeta `nemones` en VS Code.
2. Instala la extensión **Live Server** (Ritwick Dey) si no la tienes.
3. Clic derecho sobre `index.html` → **Open with Live Server**.

No hace falta Node, ni `npm install`, ni build: es HTML/CSS/JS servido tal cual.

## Subir a GitHub

```bash
cd nemones
git init
git add .
git commit -m "Primera versión de la web de Ñemones BC"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/nemones-bc.git
git push -u origin main
```

## Desplegar en Vercel

1. Entra en [vercel.com](https://vercel.com) → **Add New Project**.
2. Importa el repositorio `nemones-bc` de GitHub.
3. Framework Preset: **Other** (no hay build, es HTML estático).
4. Deja el *Build Command* y el *Output Directory* vacíos y pulsa **Deploy**.

Cada `git push` a `main` volverá a desplegar la web automáticamente.

## Modo oscuro / claro

- El botón ☀ / ☾ de la barra de navegación cambia el tema y lo recuerda en `localStorage` (`nemones_tema`).
- Por defecto se muestra el **oscuro**. Para que arranque según el sistema operativo, cambia en `js/tema.js` el valor inicial `"dark"` por `window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"`.
- Los colores del tema claro están en `css/styles.css`, en el bloque `:root[data-tema="light"]`. Todo el sitio usa variables CSS, así que basta con tocar ahí.

## Cambiar el logo / escudo

El escudo aparece en tres sitios:

1. **Barra de navegación** (en cada `.html`): es el `<svg class="crest">` dentro de `<a class="brand">`. Está repetido en las 9 páginas, así que usa "Buscar y reemplazar en todos los archivos" de VS Code (`Ctrl+Shift+H`). La letra `Ñ` es el `<text>`; si prefieres una imagen, sustituye el `<svg>` por `<img class="crest" src="assets/logo.png" alt="">`.
2. **Icono de la pestaña**: `assets/favicon.svg`.
3. **Imagen al compartir en WhatsApp/redes**: `assets/og-image.png` (1200 × 630 px). Sustitúyela por la tuya manteniendo el nombre y el tamaño.

Para cambiar los colores del club, edita `--accent` (amarillo) y `--accent-2` (grana) en `css/styles.css`.

## Enlaces compartibles

- **Cesta**: en el panel de la cesta, el botón **Compartir cesta** genera un enlace como `tienda.html?cesta=cam-local|M*2,gorra*1`. Quien lo abre ve un aviso para añadirla a su cesta. Los datos de la URL se validan (producto, talla y cantidad).
- **Asientos**: en Reservas, **Compartir selección** genera `reservas.html?asientos=pista-f1-a3,general-f2-a5`. Al abrirlo, esos asientos aparecen preseleccionados (se omiten los ocupados).
- Como todo es de demostración y vive en `localStorage`, la ocupación de asientos es distinta en cada navegador: un asiento libre para ti puede aparecer ocupado para quien abra el enlace.

## Vista previa al compartir (Open Graph)

Cada página lleva meta tags `og:*` y `twitter:*` en el `<head>` para que WhatsApp, Telegram, X, etc. muestren título, descripción e imagen.

**Importante:** `og:url` y `og:image` necesitan una dirección absoluta. Ahora mismo llevan el marcador `https://TU-DOMINIO.vercel.app`; cuando despliegues, reemplázalo en todos los archivos por tu dominio real (en VS Code: `Ctrl+Shift+H`).

Los rastreadores no ejecutan JavaScript, así que `producto.html` muestra siempre el mismo título genérico aunque cada producto tenga el suyo. Para probar el resultado: [opengraph.xyz](https://www.opengraph.xyz) o el depurador de enlaces de Facebook. Las redes guardan en caché la vista previa, así que los cambios pueden tardar en verse.

## Qué es "de demo" y qué es real

- El carrito de la tienda y las reservas de asientos se guardan en `localStorage`, así que persisten al recargar pero solo en tu propio navegador — no hay base de datos ni backend.
- Los datos del equipo (jugadores, partido, productos con `categoria` y `tallas`) están en `js/data.js`: edítalos ahí para personalizarlos.
- El botón "Finalizar pedido" y el formulario de reserva no cobran ni envían nada de verdad; son solo la interacción front-end.

## Próximos pasos posibles

- Sustituir `localStorage` por una API real (por ejemplo con Vercel Serverless Functions) si en algún momento quieres reservas compartidas entre usuarios.
- Añadir imágenes reales de jugadores, productos y galería en una carpeta `assets/` (hoy la galería son ilustraciones SVG de `js/ilustraciones.js`).
- Conectar el formulario de contacto a un servicio real (por ejemplo Formspree o una función serverless de Vercel).
