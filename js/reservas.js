/* ============================================================
   ÑEMONES BASQUET CLUB — página de reservas
   Los asientos ocupados y las reservas confirmadas se guardan
   en localStorage para que la demo se sienta persistente.
   ============================================================ */

const OCUPADOS_KEY = "nemones_ocupados";
const RESERVAS_KEY = "nemones_reservas";

let seleccionados = new Set();

function idAsiento(seccionId, fila, asiento) {
  return `${seccionId}-f${fila}-a${asiento}`;
}

function leerOcupados() {
  const guardado = localStorage.getItem(OCUPADOS_KEY);
  if (guardado) return new Set(JSON.parse(guardado));

  // Primera visita: simulamos algo de ocupación ya existente en el pabellón.
  const inicial = new Set();
  SECCIONES_RESERVAS.forEach((sec) => {
    for (let f = 1; f <= sec.filas; f++) {
      for (let a = 1; a <= sec.asientosPorFila; a++) {
        if (Math.random() < 0.18) inicial.add(idAsiento(sec.id, f, a));
      }
    }
  });
  localStorage.setItem(OCUPADOS_KEY, JSON.stringify([...inicial]));
  return inicial;
}

function guardarOcupados(set) {
  localStorage.setItem(OCUPADOS_KEY, JSON.stringify([...set]));
}

function precioSeccion(seccionId) {
  return SECCIONES_RESERVAS.find((s) => s.id === seccionId)?.precio || 0;
}

function nombreSeccion(seccionId) {
  return SECCIONES_RESERVAS.find((s) => s.id === seccionId)?.nombre || seccionId;
}

function renderMapa() {
  const cont = document.getElementById("mapa-asientos");
  if (!cont) return;
  const ocupados = leerOcupados();

  cont.innerHTML = SECCIONES_RESERVAS.map((sec) => {
    const filasHtml = Array.from({ length: sec.filas }, (_, fi) => {
      const fila = fi + 1;
      const asientosHtml = Array.from({ length: sec.asientosPorFila }, (_, ai) => {
        const asiento = ai + 1;
        const id = idAsiento(sec.id, fila, asiento);
        const ocupado = ocupados.has(id);
        const sel = seleccionados.has(id);
        return `<button type="button" class="asiento${sel ? " selected" : ""}"
          data-id="${id}" data-seccion="${sec.id}"
          ${ocupado ? "disabled" : ""}
          aria-label="Fila ${fila}, asiento ${asiento}, ${nombreSeccion(sec.id)}${ocupado ? ", ocupado" : sel ? ", seleccionado" : ", libre"}"></button>`;
      }).join("");
      return `<div class="fila">${asientosHtml}</div>`;
    }).join("");

    return `
      <div class="seccion-bloque">
        <h3><span>${sec.nombre}</span><span class="preciotag">${sec.precio.toFixed(2)} €</span></h3>
        ${filasHtml}
      </div>`;
  }).join("");

  cont.querySelectorAll(".asiento:not(:disabled)").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      if (seleccionados.has(id)) {
        seleccionados.delete(id);
        btn.classList.remove("selected");
      } else {
        seleccionados.add(id);
        btn.classList.add("selected");
      }
      renderResumen();
    });
  });
}

function renderResumen() {
  const lista = document.getElementById("resumen-lista");
  const totalEl = document.getElementById("resumen-total");
  const confirmBtn = document.getElementById("confirmar-reserva");
  if (!lista || !totalEl) return;

  const items = [...seleccionados].sort();
  if (items.length === 0) {
    lista.innerHTML = `<li style="border:none;color:var(--muted)">Todavía no has elegido ningún asiento.</li>`;
  } else {
    lista.innerHTML = items
      .map((id) => {
        const [seccionId, filaTxt, asientoTxt] = id.split("-");
        return `<li><span>${nombreSeccion(seccionId)} · fila ${filaTxt.slice(1)}, asiento ${asientoTxt.slice(1)}</span><span>${precioSeccion(seccionId).toFixed(2)} €</span></li>`;
      })
      .join("");
  }

  const total = items.reduce((sum, id) => sum + precioSeccion(id.split("-")[0]), 0);
  totalEl.textContent = total.toFixed(2) + " €";
  if (confirmBtn) confirmBtn.disabled = items.length === 0;
}

function confirmarReserva(e) {
  e.preventDefault();
  if (seleccionados.size === 0) return;

  const nombre = document.getElementById("res-nombre").value.trim();
  const email = document.getElementById("res-email").value.trim();
  if (!nombre || !email) return;

  const ocupados = leerOcupados();
  seleccionados.forEach((id) => ocupados.add(id));
  guardarOcupados(ocupados);

  const reservas = JSON.parse(localStorage.getItem(RESERVAS_KEY) || "[]");
  reservas.push({
    nombre,
    email,
    asientos: [...seleccionados],
    total: [...seleccionados].reduce((s, id) => s + precioSeccion(id.split("-")[0]), 0),
    fecha: new Date().toISOString(),
  });
  localStorage.setItem(RESERVAS_KEY, JSON.stringify(reservas));

  seleccionados = new Set();
  renderMapa();
  renderResumen();

  const msg = document.getElementById("confirm-msg");
  if (msg) {
    msg.textContent = `Reserva confirmada para ${nombre}. Te esperamos en el ${PROXIMO_PARTIDO.pabellon}.`;
    msg.classList.add("show");
  }
  document.getElementById("res-form")?.reset();
}

document.addEventListener("DOMContentLoaded", () => {
  const infoEl = document.getElementById("info-partido");
  if (infoEl) {
    infoEl.textContent = `Ñemones BC vs ${PROXIMO_PARTIDO.rival} · ${PROXIMO_PARTIDO.fecha} · ${PROXIMO_PARTIDO.hora} · ${PROXIMO_PARTIDO.pabellon}`;
  }

  renderMapa();
  renderResumen();

  document.getElementById("res-form")?.addEventListener("submit", confirmarReserva);
});
