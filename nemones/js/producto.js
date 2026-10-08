/* ============================================================
   ÑEMONES BASQUET CLUB — detalle de producto (producto.html?id=...)
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initCarrito();

  const cont = document.getElementById("detalle-producto");
  const id = new URLSearchParams(window.location.search).get("id");
  const p = PRODUCTOS.find((x) => x.id === id);

  if (!p) {
    document.title = "Producto no encontrado — Ñemones Basquet Club";
    cont.innerHTML = `
      <h1 style="font-size:2.4rem">Producto no encontrado</h1>
      <p>Ese producto no existe o ya no está en el catálogo.</p>
      <a href="tienda.html" class="btn solid">Volver a la tienda</a>`;
    return;
  }

  document.title = `${p.nombre} — Ñemones Basquet Club`;
  const cat = CATEGORIAS_PRODUCTO[p.categoria];

  cont.innerHTML = `
    <nav class="migas" aria-label="Ruta"><a href="tienda.html">Tienda</a> / <span>${cat}</span> / <span>${p.nombre}</span></nav>
    <div class="detalle-layout">
      <div class="detalle-img">${iconoProductoSVG(p)}</div>
      <div>
        <p class="kicker" style="color:var(--accent);font-weight:600;font-size:0.9rem;margin-bottom:0.4em">${cat}</p>
        <h1 style="font-size:clamp(2.2rem,5vw,3.4rem)">${p.nombre}</h1>
        <p style="font-size:1.05rem">${p.detalle}</p>
        <span class="price" style="font-family:'Bebas Neue',sans-serif;font-size:2.2rem;color:var(--accent)">${p.precio.toFixed(2)} €</span>

        <div class="detalle-compra">
          ${selectorTallaHTML(p, 'id="detalle-talla"')}
          <label class="talla-label">Cantidad
            <input type="number" id="detalle-cantidad" class="talla-select" min="1" max="10" value="1" style="width:90px">
          </label>
        </div>
        <p class="field-error" id="detalle-error" role="alert" hidden>Elige una talla antes de añadir el producto.</p>
        <div class="product-actions" style="margin-top:1rem">
          <button class="btn solid" id="detalle-add">Añadir a la cesta</button>
          <a class="btn ghost" href="tienda.html">Seguir comprando</a>
        </div>
        <p class="confirm-msg" id="detalle-msg" role="status"></p>

        <dl class="ficha">
          <dt>Categoría</dt><dd>${cat}</dd>
          <dt>Tallas</dt><dd>${p.tallas ? p.tallas.join(", ") : "Talla única"}</dd>
          <dt>Referencia</dt><dd>${p.id}</dd>
          <dt>Envío</dt><dd>Ficticio (demo, sin cobro real)</dd>
        </dl>
      </div>
    </div>`;

  const select = document.getElementById("detalle-talla");
  const error = document.getElementById("detalle-error");
  const msg = document.getElementById("detalle-msg");
  select?.addEventListener("change", () => {
    select.classList.remove("invalid");
    error.hidden = true;
  });

  document.getElementById("detalle-add").addEventListener("click", () => {
    const { ok, talla } = leerTallaElegida(p, select);
    error.hidden = ok;
    if (!ok) return;
    const cantidad = Math.min(10, Math.max(1, parseInt(document.getElementById("detalle-cantidad").value, 10) || 1));
    agregarAlCarrito(p.id, talla, cantidad);
    animarBotonAnadido(document.getElementById("detalle-add")); // ✨ NUEVO: botón verde "✓ Añadido"
    msg.textContent = `Añadido: ${cantidad} × ${p.nombre}${talla ? ` (talla ${talla})` : ""}.`;
    msg.classList.add("show");
  });

  const relacionados = PRODUCTOS.filter((x) => x.categoria === p.categoria && x.id !== p.id).slice(0, 3);
  if (relacionados.length) {
    document.getElementById("relacionados").innerHTML = `
      <div class="wrap">
        <div class="sectionhead"><h2>Más de ${cat.toLowerCase()}</h2></div>
        <div class="shopgrid">
          ${relacionados
            .map(
              (r) => `
            <article class="product">
              <a class="swatch" href="producto.html?id=${r.id}" aria-label="Ver detalle de ${r.nombre}">${iconoProductoSVG(r)}</a>
              <h3><a href="producto.html?id=${r.id}">${r.nombre}</a></h3>
              <span class="price">${r.precio.toFixed(2)} €</span>
            </article>`
            )
            .join("")}
        </div>
      </div>`;
  }
});
