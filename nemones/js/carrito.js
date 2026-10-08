/* ============================================================
   ÑEMONES BASQUET CLUB — carrito compartido (tienda y detalle)
   Se guarda en localStorage bajo "nemones_carrito".
   Clave de cada línea: "id" o "id|talla" si el producto tiene talla.
   ============================================================ */

const CARRITO_KEY = "nemones_carrito";

function leerCarrito() {
  try {
    return JSON.parse(localStorage.getItem(CARRITO_KEY)) || {};
  } catch {
    return {};
  }
}

function guardarCarrito(carrito) {
  try {
    localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
  } catch {
    /* si el navegador bloquea localStorage, la cesta simplemente no persiste */
  }
  /* ✏️ CAMBIO: avisamos al resto de la página (el contador de la navbar escucha este evento) */
  document.dispatchEvent(new CustomEvent("carrito:cambio"));
}

function claveCarrito(id, talla) {
  return talla ? `${id}|${talla}` : id;
}

function leerClave(clave) {
  const [id, talla] = clave.split("|");
  return { id, talla: talla || null, producto: PRODUCTOS.find((p) => p.id === id) };
}

function agregarAlCarrito(id, talla, cantidad = 1) {
  const carrito = leerCarrito();
  const clave = claveCarrito(id, talla);
  carrito[clave] = (carrito[clave] || 0) + cantidad;
  guardarCarrito(carrito);
  renderCarrito();
  /* ✨ NUEVO: feedback visual al añadir */
  const p = PRODUCTOS.find((x) => x.id === id);
  if (p && window.mostrarToast) window.mostrarToast(`✓ Añadido: ${p.nombre}${talla ? ` (talla ${talla})` : ""}`);
}

/* ✨ NUEVO: el botón se pone verde con "✓ Añadido" durante un instante */
function animarBotonAnadido(btn) {
  if (!btn || btn.classList.contains("added")) return;
  const textoOriginal = btn.textContent;
  btn.classList.add("added");
  btn.textContent = "✓ Añadido";
  setTimeout(() => {
    btn.classList.remove("added");
    btn.textContent = textoOriginal;
  }, 1200);
}

function cambiarCantidad(clave, delta) {
  const carrito = leerCarrito();
  carrito[clave] = (carrito[clave] || 0) + delta;
  if (carrito[clave] <= 0) delete carrito[clave];
  guardarCarrito(carrito);
  renderCarrito();
}

function totalCarrito(carrito) {
  return Object.entries(carrito).reduce((sum, [clave, qty]) => {
    const { producto } = leerClave(clave);
    return sum + (producto ? producto.precio * qty : 0);
  }, 0);
}

function renderCarrito() {
  const lista = document.getElementById("cartitems");
  const totalEl = document.getElementById("carttotal");
  const countEl = document.getElementById("cartcount");
  if (!lista || !totalEl) return;

  const carrito = leerCarrito();
  const entradas = Object.entries(carrito).filter(([clave]) => leerClave(clave).producto);
  const cantidadTotal = entradas.reduce((s, [, qty]) => s + qty, 0);
  if (countEl) countEl.textContent = cantidadTotal;

  if (entradas.length === 0) {
    lista.innerHTML = `<p class="cartempty">Tu cesta está vacía todavía.</p>`;
  } else {
    lista.innerHTML = entradas
      .map(([clave, qty]) => {
        const { producto: p, talla } = leerClave(clave);
        return `
        <div class="cartitem">
          <div>
            <div>${p.nombre}${talla ? ` <span class="qty">· talla ${talla}</span>` : ""}</div>
            <div class="qty">
              <button aria-label="Quitar uno" data-menos="${clave}">−</button>
              &nbsp;${qty}&nbsp;
              <button aria-label="Añadir uno" data-mas="${clave}">+</button>
              · ${(p.precio * qty).toFixed(2)} €
            </div>
          </div>
          <button aria-label="Eliminar" data-quitar="${clave}">Eliminar</button>
        </div>`;
      })
      .join("");
  }

  totalEl.textContent = totalCarrito(carrito).toFixed(2) + " €";

  lista.querySelectorAll("[data-mas]").forEach((b) =>
    b.addEventListener("click", () => cambiarCantidad(b.dataset.mas, 1))
  );
  lista.querySelectorAll("[data-menos]").forEach((b) =>
    b.addEventListener("click", () => cambiarCantidad(b.dataset.menos, -1))
  );
  lista.querySelectorAll("[data-quitar]").forEach((b) =>
    b.addEventListener("click", () => {
      const c = leerCarrito();
      delete c[b.dataset.quitar];
      guardarCarrito(c);
      renderCarrito();
    })
  );
}

/* ============================================================
   ✨ NUEVO — compartir la cesta con un enlace (URLSearchParams)
   Formato:  tienda.html?cesta=cam-local|M*2,gorra*1
             (cada línea es "clave*cantidad", separadas por comas;
              la clave es la misma que usa el carrito: "id" o "id|talla")
   ============================================================ */

function urlCompartirCarrito() {
  const lineas = Object.entries(leerCarrito())
    .filter(([clave]) => leerClave(clave).producto) // ignoramos productos que ya no existen
    .map(([clave, qty]) => `${clave}*${qty}`);
  const url = new URL("tienda.html", window.location.href); // misma carpeta que la página actual
  url.searchParams.set("cesta", lineas.join(","));            // URLSearchParams codifica "|" y "," por nosotros
  return url.toString();
}

/* Lee ?cesta=... y SOLO acepta líneas válidas: producto existente, talla permitida y cantidad 1-10.
   Nunca fiarse de lo que viene en una URL: cualquiera puede escribir lo que quiera. */
function leerCestaCompartida() {
  const crudo = new URLSearchParams(window.location.search).get("cesta");
  if (!crudo) return null;
  const valida = {};
  crudo.split(",").forEach((trozo) => {
    const [clave, qtyTxt] = trozo.split("*");
    const { producto, talla } = leerClave(clave || "");
    const qty = parseInt(qtyTxt, 10);
    if (!producto || !(qty > 0)) return;
    if (producto.tallas ? !producto.tallas.includes(talla) : talla) return; // talla incoherente
    valida[clave] = Math.min(qty, 10);
  });
  return Object.keys(valida).length ? valida : null;
}

function initCestaCompartida() {
  const cesta = leerCestaCompartida();
  const nav = document.querySelector(".topnav");
  if (!cesta || !nav) return;

  const n = Object.values(cesta).reduce((s, q) => s + q, 0);
  const banner = document.createElement("div");
  banner.className = "banner-compartido";
  banner.setAttribute("role", "region");
  banner.setAttribute("aria-label", "Cesta compartida");
  banner.innerHTML = `
    <div class="wrap">
      <p>Te han compartido una cesta con <strong>${n}</strong> ${n === 1 ? "artículo" : "artículos"}.</p>
      <div class="acciones">
        <button type="button" class="btn solid" data-cargar>Añadir a mi cesta</button>
        <button type="button" class="btn ghost" data-ignorar>Ignorar</button>
      </div>
    </div>`;
  nav.insertAdjacentElement("afterend", banner);

  /* quitamos el aviso y limpiamos ?cesta= de la barra de direcciones (sin recargar) */
  const limpiar = () => {
    banner.remove();
    const url = new URL(window.location.href);
    url.searchParams.delete("cesta");
    history.replaceState(null, "", url.toString());
  };

  banner.querySelector("[data-cargar]").addEventListener("click", () => {
    const carrito = leerCarrito();
    Object.entries(cesta).forEach(([clave, qty]) => {
      carrito[clave] = (carrito[clave] || 0) + qty; // se SUMA a lo que ya hubiera
    });
    guardarCarrito(carrito);
    renderCarrito();
    limpiar();
    document.getElementById("cartpanel")?.classList.add("open");
    window.mostrarToast?.("Cesta compartida añadida");
  });
  banner.querySelector("[data-ignorar]").addEventListener("click", limpiar);
}

function initCarrito() {
  renderCarrito();
  initCestaCompartida(); // ✨ NUEVO

  /* ✨ NUEVO: botón "Compartir cesta" del panel */
  document.getElementById("cartshare")?.addEventListener("click", () => {
    if (Object.keys(leerCarrito()).length === 0) {
      window.mostrarToast?.("Tu cesta está vacía");
      return;
    }
    window.compartirEnlace?.(urlCompartirCarrito(), "Mi cesta de Ñemones BC");
  });

  const abrir = document.getElementById("cartopen");
  const cerrar = document.getElementById("cartclose");
  const panel = document.getElementById("cartpanel");
  if (abrir && panel) abrir.addEventListener("click", () => panel.classList.add("open"));
  if (cerrar && panel) cerrar.addEventListener("click", () => panel.classList.remove("open"));
  if (panel) {
    panel.addEventListener("click", (e) => {
      if (e.target === panel) panel.classList.remove("open");
    });
  }

  const checkout = document.getElementById("checkout");
  if (checkout) {
    checkout.addEventListener("click", () => {
      if (Object.keys(leerCarrito()).length === 0) return;
      alert("¡Gracias por tu pedido! (esto es una demo, no se ha realizado ningún cobro real)");
      guardarCarrito({});
      renderCarrito();
      panel?.classList.remove("open");
    });
  }
}

/* Utilidades comunes de tienda */

function normalizarTexto(t) {
  return t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function selectorTallaHTML(p, idAttr) {
  if (!p.tallas) return "";
  return `
    <label class="talla-label">Talla
      <select class="talla-select" ${idAttr} data-talla-de="${p.id}">
        <option value="">Elige talla</option>
        ${p.tallas.map((t) => `<option value="${t}">${t}</option>`).join("")}
      </select>
    </label>`;
}

/* Devuelve { ok, talla }. Si falta talla, marca el select y devuelve ok:false. */
function leerTallaElegida(p, select) {
  if (!p.tallas) return { ok: true, talla: null };
  if (!select || !select.value) {
    select?.classList.add("invalid");
    select?.focus();
    return { ok: false, talla: null };
  }
  select.classList.remove("invalid");
  return { ok: true, talla: select.value };
}
