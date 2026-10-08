/* ============================================================
   ÑEMONES BASQUET CLUB — página de tienda
   Catálogo con buscador, filtro por categoría y tallas.
   El carrito vive en js/carrito.js.
   ============================================================ */

const filtros = { categoria: "todas", texto: "" };

function productosFiltrados() {
  const q = normalizarTexto(filtros.texto.trim());
  return PRODUCTOS.filter(
    (p) =>
      (filtros.categoria === "todas" || p.categoria === filtros.categoria) &&
      (!q || normalizarTexto(p.nombre).includes(q))
  );
}

function renderCatalogo() {
  const grid = document.getElementById("shopgrid");
  if (!grid) return;
  const lista = productosFiltrados();

  const cuenta = document.getElementById("shop-count");
  if (cuenta) cuenta.textContent = `${lista.length} de ${PRODUCTOS.length} productos`;

  if (lista.length === 0) {
    grid.innerHTML = `<p class="cartempty" style="grid-column:1/-1">No hay productos que coincidan con tu búsqueda.</p>`;
    return;
  }

  grid.innerHTML = lista
    .map(
      (p) => `
    <article class="product">
      <a class="swatch" href="producto.html?id=${p.id}" aria-label="Ver detalle de ${p.nombre}">${iconoProductoSVG(p)}</a>
      <span class="cat-tag">${CATEGORIAS_PRODUCTO[p.categoria]}</span>
      <h3><a href="producto.html?id=${p.id}">${p.nombre}</a></h3>
      <p class="detalle">${p.detalle}</p>
      <span class="price">${p.precio.toFixed(2)} €</span>
      ${selectorTallaHTML(p, "")}
      <div class="product-actions">
        <button class="btn solid" data-add="${p.id}">Añadir a la cesta</button>
        <a class="btn ghost" href="producto.html?id=${p.id}">Ver detalle</a>
      </div>
    </article>`
    )
    .join("");

  grid.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const p = PRODUCTOS.find((x) => x.id === btn.dataset.add);
      const select = btn.closest(".product").querySelector(".talla-select");
      const { ok, talla } = leerTallaElegida(p, select);
      if (!ok) return;
      agregarAlCarrito(p.id, talla);
      animarBotonAnadido(btn); // ✨ NUEVO: botón verde "✓ Añadido"
    });
  });
  grid.querySelectorAll(".talla-select").forEach((s) =>
    s.addEventListener("change", () => s.classList.remove("invalid"))
  );
}

function initFiltros() {
  const chips = document.getElementById("filtro-categoria");
  const opciones = [["todas", "Todos"], ...Object.entries(CATEGORIAS_PRODUCTO)];
  chips.innerHTML = opciones
    .map(([k, label]) => {
      const n = k === "todas" ? PRODUCTOS.length : PRODUCTOS.filter((p) => p.categoria === k).length;
      return `<button type="button" class="chip" data-cat="${k}" aria-pressed="${k === filtros.categoria}">${label} <span class="chip-n">${n}</span></button>`;
    })
    .join("");
  chips.querySelectorAll(".chip").forEach((chip) =>
    chip.addEventListener("click", () => {
      filtros.categoria = chip.dataset.cat;
      chips.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
      renderCatalogo();
    })
  );

  document.getElementById("buscador").addEventListener("input", (e) => {
    filtros.texto = e.target.value;
    renderCatalogo();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initFiltros();
  renderCatalogo();
  initCarrito();
});
