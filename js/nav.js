/* ============================================================
   ÑEMONES BASQUET CLUB — navegación y utilidades compartidas
   Se carga en TODAS las páginas, así que aquí viven las cosas comunes:
   menú móvil, año del footer, botón de tema, contador de la cesta,
   avisos (toast) y compartir enlaces.
   ============================================================ */

/* ✨ NUEVO: aviso flotante reutilizable → mostrarToast("texto")
   Lo usan la cesta ("Añadido…"), compartir enlaces y reservas. */
window.mostrarToast = function (texto) {
  let zona = document.querySelector(".toast-zona");
  if (!zona) {
    zona = document.createElement("div");
    zona.className = "toast-zona";
    zona.setAttribute("role", "status"); // los lectores de pantalla lo anuncian
    zona.setAttribute("aria-live", "polite");
    document.body.appendChild(zona);
  }
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = texto;
  zona.appendChild(toast);
  setTimeout(() => toast.remove(), 2800); // la animación CSS lo desvanece antes
};

/* ✨ NUEVO: compartir un enlace → compartirEnlace(url, titulo)
   - En móvil abre el menú nativo de compartir (WhatsApp, etc.).
   - En ordenador copia el enlace al portapapeles. */
window.compartirEnlace = async function (url, titulo) {
  if (navigator.share && window.matchMedia("(pointer: coarse)").matches) {
    try {
      await navigator.share({ title: titulo, url });
      return;
    } catch (err) {
      if (err.name === "AbortError") return; // la persona canceló: no hacemos nada más
    }
  }
  try {
    await navigator.clipboard.writeText(url);
    window.mostrarToast("Enlace copiado al portapapeles");
  } catch {
    window.prompt("Copia este enlace:", url); // último recurso si el navegador bloquea el portapapeles
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".navtoggle");
  const links = document.querySelector(".navlinks");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- ✨ NUEVO: botón de modo oscuro / claro ---------- */
  const barra = document.querySelector(".topnav .wrap");
  if (barra) {
    const btnTema = document.createElement("button");
    btnTema.type = "button";
    btnTema.className = "themetoggle";
    barra.appendChild(btnTema);

    const pintarBotonTema = () => {
      const claro = document.documentElement.getAttribute("data-tema") === "light";
      btnTema.textContent = claro ? "☾" : "☀";
      btnTema.setAttribute("aria-label", claro ? "Cambiar a modo oscuro" : "Cambiar a modo claro");
      btnTema.title = btnTema.getAttribute("aria-label");
    };
    pintarBotonTema();

    btnTema.addEventListener("click", () => {
      const nuevo = document.documentElement.getAttribute("data-tema") === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-tema", nuevo);
      try { localStorage.setItem("nemones_tema", nuevo); } catch { /* sin persistencia, pero funciona */ }
      pintarBotonTema();
    });
  }

  /* ---------- ✨ NUEVO: contador de artículos junto a "Tienda" ----------
     Lee directamente localStorage ("nemones_carrito"), así funciona en TODAS
     las páginas aunque no carguen carrito.js. */
  const enlaceTienda = document.querySelector('.navlinks a[href="tienda.html"]');
  if (enlaceTienda) {
    const badge = document.createElement("span");
    badge.className = "navbadge";
    badge.hidden = true;
    badge.setAttribute("aria-hidden", "true"); // el número se lee en el aria-label del enlace
    enlaceTienda.appendChild(badge);

    const contarCesta = () => {
      try {
        const cesta = JSON.parse(localStorage.getItem("nemones_carrito")) || {};
        return Object.values(cesta).reduce((suma, qty) => suma + (Number(qty) || 0), 0);
      } catch {
        return 0;
      }
    };

    let anterior = contarCesta();
    const pintarBadge = (animar) => {
      const n = contarCesta();
      badge.hidden = n === 0;
      badge.textContent = n > 99 ? "99+" : String(n);
      if (n > 0) enlaceTienda.setAttribute("aria-label", `Tienda, ${n} ${n === 1 ? "artículo" : "artículos"} en la cesta`);
      else enlaceTienda.removeAttribute("aria-label");
      if (animar && n > anterior) { // "rebote" solo cuando sube
        badge.classList.remove("bump");
        void badge.offsetWidth; // fuerza a reiniciar la animación CSS
        badge.classList.add("bump");
      }
      anterior = n;
    };
    pintarBadge(false);

    /* carrito.js avisa con este evento cada vez que guarda la cesta;
       "storage" cubre los cambios hechos desde otra pestaña */
    document.addEventListener("carrito:cambio", () => pintarBadge(true));
    window.addEventListener("storage", (e) => { if (e.key === "nemones_carrito") pintarBadge(false); });
  }
});
