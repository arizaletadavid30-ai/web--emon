/* ============================================================
   ÑEMONES BASQUET CLUB — página de plantilla
   Fichas, filtro por posición, orden, quinteto titular y comparador.
   ============================================================ */

const ORDENES = {
  numero: { label: "Dorsal",             get: (j) => j.numero,    dir: 1,  fmt: (v) => `#${v}` },
  pts:    { label: "Puntos",             get: (j) => j.stats.pts, dir: -1, fmt: (v) => `${v} pts` },
  reb:    { label: "Rebotes",            get: (j) => j.stats.reb, dir: -1, fmt: (v) => `${v} reb` },
  ast:    { label: "Asistencias",        get: (j) => j.stats.ast, dir: -1, fmt: (v) => `${v} ast` },
  rob:    { label: "Robos",              get: (j) => j.stats.rob, dir: -1, fmt: (v) => `${v} rob` },
  tap:    { label: "Tapones",            get: (j) => j.stats.tap, dir: -1, fmt: (v) => `${v} tap` },
  min:    { label: "Minutos",            get: (j) => j.stats.min, dir: -1, fmt: (v) => `${v} min` },
  t3:     { label: "% de triples",       get: (j) => j.stats.t3,  dir: -1, fmt: (v) => `${v}% T3` },
};

/* filas del comparador: mejor = "max" o "min" (en pérdidas, menos es mejor) */
const FILAS_COMPARADOR = [
  { clave: "min", label: "Minutos", mejor: "max" },
  { clave: "pts", label: "Puntos", mejor: "max" },
  { clave: "reb", label: "Rebotes", mejor: "max" },
  { clave: "ast", label: "Asistencias", mejor: "max" },
  { clave: "rob", label: "Robos", mejor: "max" },
  { clave: "tap", label: "Tapones", mejor: "max" },
  { clave: "mates", label: "Mates", mejor: "max" },
  { clave: "mm", label: "+/-", mejor: "max" },
  { clave: "per", label: "Pérdidas", mejor: "min" },
  { clave: "tc", label: "Tiros de campo %", mejor: "max" },
  { clave: "t3", label: "Triples %", mejor: "max" },
  { clave: "tl", label: "Tiros libres %", mejor: "max" },
];

const estado = { posicion: "Todas", orden: "numero" };

function insigniasHTML(j) {
  const mvp = j.mvp ? `<span class="badge mvp">👑 MVP</span>` : "";
  const ins = j.insignia ? `<span class="badge">${j.insignia}</span>` : "";
  return mvp + ins;
}

function abrirModalJugador(jugador) {
  const overlay = document.getElementById("modal-jugador");
  const cuerpo = document.getElementById("modal-jugador-body");
  if (!overlay || !cuerpo) return;

  const s = jugador.stats;
  cuerpo.innerHTML = `
    <div class="modal-avatar">${avatarJugadorSVG(jugador, indiceJugador(jugador))}</div>
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

/* ---------- Plantilla: filtro + orden ---------- */

function jugadoresVisibles() {
  const o = ORDENES[estado.orden];
  return PLANTILLA.filter((j) => estado.posicion === "Todas" || j.posicion === estado.posicion).sort(
    (a, b) => (o.get(a) - o.get(b)) * o.dir || a.numero - b.numero
  );
}

function renderPlantilla() {
  const roster = document.getElementById("roster");
  const lista = jugadoresVisibles();
  const o = ORDENES[estado.orden];
  const mostrarValor = estado.orden !== "numero";

  roster.innerHTML = lista
    .map(
      (j) => `
      <button type="button" class="player" data-numero="${j.numero}">
        <span class="player-avatar">${avatarJugadorSVG(j, indiceJugador(j))}</span>
        <span class="num">${j.numero}</span>
        <span class="name">${j.nombre}</span>
        <span class="badges">${insigniasHTML(j)}</span>
        <span class="pos">${j.posicion} · ${j.altura}</span>
        ${mostrarValor ? `<span class="sortval">${o.fmt(o.get(j))}</span>` : ""}
        <span class="stat">${j.dato}</span>
      </button>`
    )
    .join("");

  roster.querySelectorAll(".player").forEach((btn) => {
    btn.addEventListener("click", () => abrirModalJugador(PLANTILLA.find((p) => p.numero === Number(btn.dataset.numero))));
  });

  const cuenta = document.getElementById("roster-count");
  if (cuenta) cuenta.textContent = `${lista.length} de ${PLANTILLA.length} jugadores`;
}

function initControles() {
  const posiciones = ["Todas", ...new Set(PLANTILLA.map((j) => j.posicion))];
  const chips = document.getElementById("filtro-posicion");
  chips.innerHTML = posiciones
    .map((p) => `<button type="button" class="chip" data-pos="${p}" aria-pressed="${p === estado.posicion}">${p}</button>`)
    .join("");
  chips.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      estado.posicion = chip.dataset.pos;
      chips.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
      renderPlantilla();
    });
  });

  const select = document.getElementById("orden-plantilla");
  select.innerHTML = Object.entries(ORDENES)
    .map(([k, o]) => `<option value="${k}">${o.label}${k === "numero" ? "" : " (mayor a menor)"}</option>`)
    .join("");
  select.addEventListener("change", () => {
    estado.orden = select.value;
    renderPlantilla();
  });
}

/* ---------- Comparador ---------- */

function opcionesJugadores(seleccionado) {
  return [...PLANTILLA]
    .sort((a, b) => a.numero - b.numero)
    .map((j) => `<option value="${j.numero}" ${j.numero === seleccionado ? "selected" : ""}>#${j.numero} ${j.nombre}</option>`)
    .join("");
}

function renderComparador() {
  const a = PLANTILLA.find((j) => j.numero === Number(document.getElementById("comp-a").value));
  const b = PLANTILLA.find((j) => j.numero === Number(document.getElementById("comp-b").value));
  const cont = document.getElementById("comp-resultado");

  const cabecera = (j) => `
    <div class="comp-head">
      <div class="comp-avatar">${avatarJugadorSVG(j, indiceJugador(j))}</div>
      <strong>${j.nombre}</strong>
      <span class="pos">${j.posicion} · ${j.altura}</span>
    </div>`;

  const filas = FILAS_COMPARADOR.map((f) => {
    const va = a.stats[f.clave];
    const vb = b.stats[f.clave];
    const max = Math.max(...PLANTILLA.map((j) => Math.abs(j.stats[f.clave]))) || 1;
    const gana = va === vb ? 0 : (f.mejor === "max" ? va > vb : va < vb) ? 1 : 2;
    const sufijo = ["tc", "t3", "tl"].includes(f.clave) ? "%" : "";
    const signo = (v) => (f.clave === "mm" && v > 0 ? "+" : "");
    return `
      <div class="comp-row">
        <span class="comp-val ${gana === 1 ? "win" : ""}">${signo(va)}${va}${sufijo}</span>
        <div class="comp-bars">
          <div class="bar left"><i class="${gana === 1 ? "win" : ""}" style="width:${(Math.abs(va) / max) * 100}%"></i></div>
          <span class="comp-label">${f.label}</span>
          <div class="bar right"><i class="${gana === 2 ? "win" : ""}" style="width:${(Math.abs(vb) / max) * 100}%"></i></div>
        </div>
        <span class="comp-val ${gana === 2 ? "win" : ""}">${signo(vb)}${vb}${sufijo}</span>
      </div>`;
  }).join("");

  cont.innerHTML = `
    <div class="comp-heads">${cabecera(a)}${cabecera(b)}</div>
    ${filas}
    <p class="modal-note">En amarillo, el mejor valor de cada fila (en pérdidas, el más bajo). Medias por partido.</p>`;
}

function initComparador() {
  const sa = document.getElementById("comp-a");
  const sb = document.getElementById("comp-b");
  sa.innerHTML = opcionesJugadores(55);
  sb.innerHTML = opcionesJugadores(7);
  sa.addEventListener("change", renderComparador);
  sb.addEventListener("change", renderComparador);
  renderComparador();
}

document.addEventListener("DOMContentLoaded", () => {
  if (!document.getElementById("roster")) return;

  renderQuinteto(document.getElementById("quinteto"), abrirModalJugador);
  initControles();
  renderPlantilla();
  initComparador();

  const overlay = document.getElementById("modal-jugador");
  document.getElementById("modal-jugador-close")?.addEventListener("click", cerrarModalJugador);
  overlay?.addEventListener("click", (e) => {
    if (e.target === overlay) cerrarModalJugador();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarModalJugador();
  });
});
