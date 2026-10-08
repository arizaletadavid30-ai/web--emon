/* ============================================================
   ÑEMONES BASQUET CLUB — quinteto titular
   Los 5 jugadores con más minutos de media. Se usa en Inicio y Plantilla.
   ============================================================ */

function quintetoTitular() {
  return [...PLANTILLA].sort((a, b) => b.stats.min - a.stats.min).slice(0, 5);
}

/* Índice estable (por dorsal) para que cada jugador conserve siempre su color. */
function indiceJugador(jugador) {
  return [...PLANTILLA].sort((a, b) => a.numero - b.numero).findIndex((j) => j.numero === jugador.numero);
}

function renderQuinteto(contenedor, alClicar) {
  if (!contenedor) return;
  contenedor.innerHTML = quintetoTitular()
    .map(
      (j) => `
      <button type="button" class="player quinteto-card" data-numero="${j.numero}">
        <span class="player-avatar">${avatarJugadorSVG(j, indiceJugador(j))}</span>
        <span class="num">${j.numero}</span>
        <span class="name">${j.nombre}</span>
        <span class="pos">${j.posicion}</span>
        <span class="stat">${j.stats.min} min · ${j.stats.pts} pts</span>
      </button>`
    )
    .join("");

  contenedor.querySelectorAll(".quinteto-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      const j = PLANTILLA.find((p) => p.numero === Number(btn.dataset.numero));
      if (alClicar) alClicar(j);
      else window.location.href = "plantilla.html";
    });
  });
}
