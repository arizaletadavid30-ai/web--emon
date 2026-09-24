/* ============================================================
   ÑEMONES BASQUET CLUB — página de tienda
   Carrito guardado en localStorage bajo la clave "nemones_carrito"
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
  localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
}

function agregarAlCarrito(id) {
  const carrito = leerCarrito();
  carrito[id] = (carrito[id] || 0) + 1;
  guardarCarrito(carrito);
  renderCarrito();
}

function cambiarCantidad(id, delta) {
  const carrito = leerCarrito();
  carrito[id] = (carrito[id] || 0) + delta;
  if (carrito[id] <= 0) delete carrito[id];
  guardarCarrito(carrito);
  renderCarrito();
}

function totalCarrito(carrito) {
  return Object.entries(carrito).reduce((sum, [id, qty]) => {
    const producto = PRODUCTOS.find((p) => p.id === id);
    return sum + (producto ? producto.precio * qty : 0);
  }, 0);
}

function renderCatalogo() {
  const grid = document.getElementById("shopgrid");
  if (!grid) return;
  grid.innerHTML = PRODUCTOS.map(
    (p) => `
    <article class="product">
      <div class="swatch">${iconoProductoSVG(p)}</div>
      <h3>${p.nombre}</h3>
      <p class="detalle">${p.detalle}</p>
      <span class="price">${p.precio.toFixed(2)} €</span>
      <button class="btn solid" data-add="${p.id}">Añadir a la cesta</button>
    </article>`
  ).join("");

  grid.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", () => agregarAlCarrito(btn.dataset.add));
  });
}

function renderCarrito() {
  const lista = document.getElementById("cartitems");
  const totalEl = document.getElementById("carttotal");
  const countEl = document.getElementById("cartcount");
  if (!lista || !totalEl) return;

  const carrito = leerCarrito();
  const entradas = Object.entries(carrito);
  const cantidadTotal = entradas.reduce((s, [, qty]) => s + qty, 0);
  if (countEl) countEl.textContent = cantidadTotal;

  if (entradas.length === 0) {
    lista.innerHTML = `<p class="cartempty">Tu cesta está vacía todavía.</p>`;
  } else {
    lista.innerHTML = entradas
      .map(([id, qty]) => {
        const p = PRODUCTOS.find((pr) => pr.id === id);
        if (!p) return "";
        return `
        <div class="cartitem">
          <div>
            <div>${p.nombre}</div>
            <div class="qty">
              <button aria-label="Quitar uno" data-menos="${id}">−</button>
              &nbsp;${qty}&nbsp;
              <button aria-label="Añadir uno" data-mas="${id}">+</button>
              · ${(p.precio * qty).toFixed(2)} €
            </div>
          </div>
          <button aria-label="Eliminar" data-quitar="${id}">Eliminar</button>
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
      const carrito = leerCarrito();
      delete carrito[b.dataset.quitar];
      guardarCarrito(carrito);
      renderCarrito();
    })
  );
}

document.addEventListener("DOMContentLoaded", () => {
  renderCatalogo();
  renderCarrito();

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
      const carrito = leerCarrito();
      if (Object.keys(carrito).length === 0) return;
      alert("¡Gracias por tu pedido! (esto es una demo, no se ha realizado ningún cobro real)");
      guardarCarrito({});
      renderCarrito();
      panel?.classList.remove("open");
    });
  }
});
