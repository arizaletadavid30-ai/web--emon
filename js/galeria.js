/* ============================================================
   ÑEMONES BASQUET CLUB — galería con filtro y visor ampliado
   ============================================================ */

let filtroGaleria = "Todas";
let visibles = [];
let indiceActual = 0;

function renderGaleria() {
  visibles = GALERIA.filter((g) => filtroGaleria === "Todas" || g.cat === filtroGaleria);
  const cont = document.getElementById("galeria");
  cont.innerHTML = visibles
    .map(
      (g, i) => `
      <button type="button" class="galitem" data-i="${i}" aria-label="Ampliar: ${g.titulo}">
        <span class="gal-img">${escenaGaleriaSVG(g)}</span>
        <span class="gal-cap"><strong>${g.titulo}</strong><span>${g.cat}</span></span>
      </button>`
    )
    .join("");
  cont.querySelectorAll(".galitem").forEach((btn) =>
    btn.addEventListener("click", () => abrirLightbox(Number(btn.dataset.i)))
  );
}

function abrirLightbox(i) {
  indiceActual = (i + visibles.length) % visibles.length;
  const g = visibles[indiceActual];
  document.getElementById("lightbox-img").innerHTML = escenaGaleriaSVG(g);
  document.getElementById("lightbox-titulo").textContent = g.titulo;
  document.getElementById("lightbox-texto").textContent = g.texto;
  document.getElementById("lightbox").classList.add("open");
  document.getElementById("lightbox-close").focus();
}

function cerrarLightbox() {
  document.getElementById("lightbox").classList.remove("open");
}

document.addEventListener("DOMContentLoaded", () => {
  const cats = ["Todas", ...new Set(GALERIA.map((g) => g.cat))];
  const filtros = document.getElementById("gal-filtros");
  filtros.innerHTML = cats
    .map((c) => `<button type="button" class="chip" data-cat="${c}" aria-pressed="${c === filtroGaleria}">${c}</button>`)
    .join("");
  filtros.querySelectorAll(".chip").forEach((chip) =>
    chip.addEventListener("click", () => {
      filtroGaleria = chip.dataset.cat;
      filtros.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
      renderGaleria();
    })
  );
  renderGaleria();

  const overlay = document.getElementById("lightbox");
  document.getElementById("lightbox-close").addEventListener("click", cerrarLightbox);
  document.getElementById("lightbox-prev").addEventListener("click", () => abrirLightbox(indiceActual - 1));
  document.getElementById("lightbox-next").addEventListener("click", () => abrirLightbox(indiceActual + 1));
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) cerrarLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("open")) return;
    if (e.key === "Escape") cerrarLightbox();
    if (e.key === "ArrowLeft") abrirLightbox(indiceActual - 1);
    if (e.key === "ArrowRight") abrirLightbox(indiceActual + 1);
  });
});
