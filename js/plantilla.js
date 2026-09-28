/* ============================================================
   ÑEMONES BASQUET CLUB — página de plantilla
   ============================================================ */

function insigniasHTML(j) {
  const mvp = j.mvp ? `<span class="badge mvp">👑 MVP</span>` : "";
  const ins = j.insignia ? `<span class="badge">${j.insignia}</span>` : "";
  return mvp + ins;
}

function abrirModalJugador(jugador, index) {
  const overlay = document.getElementById("modal-jugador");
  const cuerpo = document.getElementById("modal-jugador-body");
  if (!overlay || !cuerpo) return;

  const s = jugador.stats;
  cuerpo.innerHTML = `
    <div class="modal-avatar">${avatarJugadorSVG(jugador, index)}</div>
    <div class="modal-info">
      <p class="kicker" style="margin-bottom:0.2em">${jugador.posicion} · ${jugador.altura}</p>
      <p class="badges" style="margin:0 0 0.4rem">${insigniasHTML(jugador)}</p>
      <h2 style="margin-bottom:0.1em">${jugador.nombre}</h2>
      <p class="modal-bio">${jugador.bio}</p>
      ${jugador.hazanas ? `<ul class="hazanas">${jugador.hazanas.map((h) => `<li>${h}</li>`).join("")}</ul>` : ""}
      <div class="stats-grid">
        <div><span class="stat-num">${s.min}</span><span class="stat-label">Minutos</span></div>
        <div><span class="stat-num">${s.pts}</span><span class="stat-label">Puntos</span></div>
        <div><span class="stat-num">${s.reb}</span><span class="stat-label">Rebotes</span></div>
        <div><span class="stat-num">${s.ast}</span><span class="stat-label">Asistencias</span></div>
        <div><span class="stat-num">${s.rob}</span><span class="stat-label">Robos</span></div>
        <div><span class="stat-num">${s.tap}</span><span class="stat-label">Tapones</span></div>
        <div><span class="stat-num">${s.mates}</span><span class="stat-label">Mates</span></div>
        <div><span class="stat-num ${s.mm >= 0 ? "pos" : "neg"}">${s.mm > 0 ? "+" : ""}${s.mm}</span><span class="stat-label">+/-</span></div>
        <div><span class="stat-num">${s.per}</span><span class="stat-label">Pérdidas</span></div>
        <div><span class="stat-num">${s.tc}%</span><span class="stat-label">Tiros de campo</span></div>
        <div><span class="stat-num">${s.t3}%</span><span class="stat-label">Triples</span></div>
        <div><span class="stat-num">${s.tl}%</span><span class="stat-label">Tiros libres</span></div>
      </div>
      <p class="hazana"><span class="hazana-label">🏆 Hazaña</span>${jugador.hazana}</p>
      <p class="modal-note">Medias por partido esta temporada (40 min por partido).</p>
    </div>`;

  overlay.classList.add("open");
  document.getElementById("modal-jugador-close")?.focus();
}

function cerrarModalJugador() {
  document.getElementById("modal-jugador")?.classList.remove("open");
}

document.addEventListener("DOMContentLoaded", () => {
  const roster = document.getElementById("roster");
  if (!roster) return;

  const ordenada = [...PLANTILLA].sort((a, b) => a.numero - b.numero);

  roster.innerHTML = ordenada
    .map(
      (j, i) => `
      <button type="button" class="player" data-index="${i}">
        <span class="player-avatar">${avatarJugadorSVG(j, i)}</span>
        <span class="num">${j.numero}</span>
        <span class="name">${j.nombre}</span>
        <span class="badges">${insigniasHTML(j)}</span>
        <span class="pos">${j.posicion} · ${j.altura}</span>
        <span class="stat">${j.dato}</span>
      </button>`
    )
    .join("");

  roster.querySelectorAll(".player").forEach((btn) => {
    btn.addEventListener("click", () => {
      const i = Number(btn.dataset.index);
      abrirModalJugador(ordenada[i], i);
    });
  });

  const overlay = document.getElementById("modal-jugador");
  document.getElementById("modal-jugador-close")?.addEventListener("click", cerrarModalJugador);
  overlay?.addEventListener("click", (e) => {
    if (e.target === overlay) cerrarModalJugador();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarModalJugador();
  });
});
