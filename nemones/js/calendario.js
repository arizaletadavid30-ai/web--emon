/* ============================================================
   ÑEMONES BASQUET CLUB — página de calendario
   Pinta todos los partidos de CALENDARIO (js/data.js) y permite
   filtrar entre todos, solo próximos o solo resultados.
   ============================================================ */

const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

function formatoFecha(fechaISO) {
  const [y, m, d] = fechaISO.split("-").map(Number);
  return `${d} ${MESES[m - 1]} ${y}`;
}

// Identifica el "próximo partido" comparando con PROXIMO_PARTIDO de data.js,
// que ya es la fuente de verdad usada en el Inicio.
function esProximoPartido(partido) {
  return (
    !partido.jugado &&
    partido.fecha === PROXIMO_PARTIDO.fecha &&
    partido.rival === PROXIMO_PARTIDO.rival
  );
}

function filaResultado(partido) {
  const { nemones, rival } = partido.resultado;
  const gano = nemones > rival;
  return `<span class="badge ${gano ? "win" : "loss"}">${gano ? "V" : "D"}</span>
          <span class="marcador">${nemones} – ${rival}</span>`;
}

function filaPartido(partido) {
  const lugarTxt = partido.lugar === "casa" ? "Local" : "Visitante";
  const sitio = partido.lugar === "casa" ? "Pabellón Ñemón" : partido.pabellonRival;
  const destacado = esProximoPartido(partido);

  return `
    <div class="matchrow${destacado ? " proximo" : ""}${partido.jugado ? " jugado" : ""}">
      <div class="mr-jornada">
        <span class="mr-comp">${partido.competicion}</span>
        <span class="mr-nombre">${partido.jornada}</span>
      </div>
      <div class="mr-rival">
        <span class="badge ${partido.lugar === "casa" ? "local" : "visitante"}">${lugarTxt}</span>
        <span class="mr-rival-nombre">Ñemones BC vs ${partido.rival}</span>
        <span class="mr-sitio">${sitio}</span>
      </div>
      <div class="mr-fecha">
        <span>${formatoFecha(partido.fecha)}</span>
        <span class="mr-hora">${partido.hora}</span>
      </div>
      <div class="mr-resultado">
        ${partido.jugado ? filaResultado(partido) : destacado ? `<span class="badge proximo-tag">Próximo</span>` : `<span class="mr-pendiente">Por jugar</span>`}
      </div>
    </div>`;
}

function renderCalendario(filtro) {
  const cont = document.getElementById("cal-lista");
  if (!cont) return;

  let partidos = CALENDARIO.slice();
  if (filtro === "proximos") partidos = partidos.filter((p) => !p.jugado);
  if (filtro === "resultados") partidos = partidos.filter((p) => p.jugado);

  // Jugados del más reciente al más antiguo, próximos del más cercano al más lejano.
  partidos.sort((a, b) => (a.jugado === b.jugado ? a.fecha.localeCompare(b.fecha) : a.jugado ? -1 : 1));
  if (filtro === "resultados") partidos.reverse();

  if (partidos.length === 0) {
    cont.innerHTML = `<p style="color:var(--muted)">No hay partidos en esta categoría.</p>`;
    return;
  }

  cont.innerHTML = partidos.map(filaPartido).join("");
}

function renderResumen() {
  const jugados = CALENDARIO.filter((p) => p.jugado);
  const ganados = jugados.filter((p) => p.resultado.nemones > p.resultado.rival).length;
  const perdidos = jugados.length - ganados;
  const el = document.getElementById("cal-resumen");
  if (el) {
    el.textContent = `${ganados}V – ${perdidos}D en ${jugados.length} partidos disputados`;
  }
}

function filaClasificacion(equipo, pos) {
  const dif = equipo.pf - equipo.pc;
  const pts = equipo.g * 2 + equipo.p;
  return `
    <tr class="${equipo.esNemones ? "fila-nemones" : ""}">
      <td>${pos}</td>
      <td class="cl-equipo">${equipo.equipo}</td>
      <td>${equipo.pj}</td>
      <td>${equipo.g}</td>
      <td>${equipo.p}</td>
      <td>${equipo.pf}</td>
      <td>${equipo.pc}</td>
      <td class="${dif >= 0 ? "pos" : "neg"}">${dif > 0 ? "+" : ""}${dif}</td>
      <td class="cl-pts">${pts}</td>
    </tr>`;
}

function renderClasificacion() {
  const cont = document.getElementById("cl-tabla");
  if (!cont) return;

  const ordenada = CLASIFICACION.slice().sort((a, b) => {
    const ptsA = a.g * 2 + a.p, ptsB = b.g * 2 + b.p;
    if (ptsB !== ptsA) return ptsB - ptsA;
    return (b.pf - b.pc) - (a.pf - a.pc);
  });

  cont.innerHTML = `
    <table class="standings-table">
      <thead>
        <tr>
          <th>#</th><th>Equipo</th><th>PJ</th><th>G</th><th>P</th>
          <th>PF</th><th>PC</th><th>Dif</th><th>Pts</th>
        </tr>
      </thead>
      <tbody>
        ${ordenada.map((eq, idx) => filaClasificacion(eq, idx + 1)).join("")}
      </tbody>
    </table>`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderResumen();
  renderCalendario("todos");
  renderClasificacion();

  document.querySelectorAll(".tab[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab[data-filter]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderCalendario(btn.dataset.filter);
    });
  });
});
