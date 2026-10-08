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

function escaparHTML(t) {
  return String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* Formato mínimo: algo@dominio.ext (sin espacios y con punto en el dominio) */
function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

/* Aforo de una sección: cuántos asientos hay, cuántos ocupados y el porcentaje */
function aforoSeccion(sec, ocupados) {
  const total = sec.filas * sec.asientosPorFila;
  let ocupadosSec = 0;
  for (let f = 1; f <= sec.filas; f++) {
    for (let a = 1; a <= sec.asientosPorFila; a++) {
      if (ocupados.has(idAsiento(sec.id, f, a))) ocupadosSec++;
    }
  }
  return { total, ocupados: ocupadosSec, libres: total - ocupadosSec, pct: Math.round((ocupadosSec / total) * 100) };
}

function nivelAforo(pct) {
  return pct >= 100 ? "completo" : pct >= 85 ? "alto" : pct >= 60 ? "medio" : "bajo";
}

function aforoHTML(a) {
  const texto = a.pct >= 100 ? "Completo" : `${a.pct}% ocupado · ${a.libres} libres`;
  return `
    <div class="aforo" data-nivel="${nivelAforo(a.pct)}">
      <div class="aforo-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${a.pct}" aria-label="Aforo ocupado"><i style="width:${a.pct}%"></i></div>
      <span>${texto}</span>
    </div>`;
}

/* ============================================================
   ✨ NUEVO — compartir la selección de asientos (URLSearchParams)
   Formato:  reservas.html?asientos=pista-f1-a3,general-f2-a5
   Cada id es el mismo que ya usa el mapa (sección-fila-asiento).
   ============================================================ */

function urlCompartirAsientos() {
  const url = new URL("reservas.html", window.location.href);
  url.searchParams.set("asientos", [...seleccionados].sort().join(","));
  return url.toString();
}

/* Comprueba que un id de la URL es un asiento REAL (sección, fila y número dentro de rango) */
function asientoExiste(id) {
  const m = /^([a-z]+)-f(\d+)-a(\d+)$/.exec(id);
  if (!m) return false;
  const sec = SECCIONES_RESERVAS.find((s) => s.id === m[1]);
  return !!sec && +m[2] >= 1 && +m[2] <= sec.filas && +m[3] >= 1 && +m[3] <= sec.asientosPorFila;
}

/* Si la URL trae ?asientos=..., los preselecciona (saltándose los que estén ocupados).
   Se llama ANTES de renderMapa() para que el mapa ya los pinte como seleccionados. */
function cargarAsientosCompartidos() {
  const crudo = new URLSearchParams(window.location.search).get("asientos");
  if (crudo === null) return;

  const validos = crudo.split(",").filter(asientoExiste);
  const ocupados = leerOcupados();
  const libres = validos.filter((id) => !ocupados.has(id));
  libres.forEach((id) => seleccionados.add(id));

  if (validos.length === 0) {
    window.mostrarToast?.("El enlace no contiene asientos válidos");
  } else {
    const noDisp = validos.length - libres.length;
    window.mostrarToast?.(
      `${libres.length} ${libres.length === 1 ? "asiento cargado" : "asientos cargados"}` +
        (noDisp ? ` (${noDisp} ya no ${noDisp === 1 ? "está disponible" : "están disponibles"})` : "")
    );
  }
}

function renderMapa() {
  const cont = document.getElementById("mapa-asientos");
  if (!cont) return;
  const ocupados = leerOcupados();

  const aforos = SECCIONES_RESERVAS.map((sec) => aforoSeccion(sec, ocupados));
  const totalAforo = aforos.reduce((t, a) => ({ total: t.total + a.total, ocupados: t.ocupados + a.ocupados }), { total: 0, ocupados: 0 });
  const aforoTotalEl = document.getElementById("aforo-total");
  if (aforoTotalEl) {
    const pctTotal = Math.round((totalAforo.ocupados / totalAforo.total) * 100);
    aforoTotalEl.innerHTML = `<strong>Aforo del pabellón</strong>${aforoHTML({ ...totalAforo, libres: totalAforo.total - totalAforo.ocupados, pct: pctTotal })}`;
  }

  cont.innerHTML = SECCIONES_RESERVAS.map((sec, i) => {
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
        ${aforoHTML(aforos[i])}
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

  /* ✨ NUEVO: "Compartir selección" solo tiene sentido si hay asientos elegidos */
  const btnCompartir = document.getElementById("compartir-asientos");
  if (btnCompartir) btnCompartir.disabled = items.length === 0;

  actualizarFormulario();
}

/* Habilita "Confirmar" solo con asiento elegido, nombre y correo con formato válido */
function actualizarFormulario(mostrarErrorEmail = false) {
  const btn = document.getElementById("confirmar-reserva");
  const nombre = document.getElementById("res-nombre");
  const email = document.getElementById("res-email");
  const errorEmail = document.getElementById("res-email-error");
  const hint = document.getElementById("form-hint");
  if (!btn || !nombre || !email) return;

  const hayAsientos = seleccionados.size > 0;
  const hayNombre = nombre.value.trim().length > 0;
  const emailTxt = email.value.trim();
  const emailOk = emailValido(emailTxt);

  /* el error solo aparece cuando ya hay algo escrito (o al salir del campo) */
  const mostrarError = emailTxt.length > 0 ? !emailOk : mostrarErrorEmail;
  if (errorEmail) errorEmail.hidden = !mostrarError;
  email.setAttribute("aria-invalid", String(mostrarError));

  btn.disabled = !(hayAsientos && hayNombre && emailOk);

  if (hint) {
    const faltan = [];
    if (!hayAsientos) faltan.push("elige al menos un asiento");
    if (!hayNombre) faltan.push("escribe tu nombre");
    if (!emailOk) faltan.push("escribe un correo válido");
    hint.textContent = faltan.length ? `Para confirmar: ${faltan.join(", ")}.` : "";
  }
}

function confirmarReserva(e) {
  e.preventDefault();
  if (seleccionados.size === 0) return;

  const nombre = document.getElementById("res-nombre").value.trim();
  const email = document.getElementById("res-email").value.trim();
  if (!nombre || !emailValido(email)) {
    actualizarFormulario(true);
    return;
  }

  const ocupados = leerOcupados();
  seleccionados.forEach((id) => ocupados.add(id));
  guardarOcupados(ocupados);

  const reservas = JSON.parse(localStorage.getItem(RESERVAS_KEY) || "[]");
  reservas.push({
    nombre,
    email,
    asientos: [...seleccionados],
    total: [...seleccionados].reduce((s, id) => s + precioSeccion(id.split("-")[0]), 0),
    partido: `${PROXIMO_PARTIDO.rival} · ${PROXIMO_PARTIDO.fecha}`,
    fecha: new Date().toISOString(),
  });
  localStorage.setItem(RESERVAS_KEY, JSON.stringify(reservas));

  seleccionados = new Set();
  renderMapa();
  renderMisReservas();

  const msg = document.getElementById("confirm-msg");
  if (msg) {
    msg.textContent = `Reserva confirmada para ${nombre}. Te esperamos en el ${PROXIMO_PARTIDO.pabellon}.`;
    msg.classList.add("show");
  }
  document.getElementById("res-form")?.reset();
  renderResumen();
}

/* ---------- Mis reservas (histórico leído de RESERVAS_KEY) ---------- */

function leerReservas() {
  try {
    const datos = JSON.parse(localStorage.getItem(RESERVAS_KEY) || "[]");
    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
}

function etiquetaAsiento(id) {
  const [seccionId, filaTxt, asientoTxt] = id.split("-");
  return `${nombreSeccion(seccionId)} · F${filaTxt.slice(1)} A${asientoTxt.slice(1)}`;
}

function renderMisReservas() {
  const lista = document.getElementById("mis-reservas-lista");
  const resumen = document.getElementById("mis-reservas-resumen");
  if (!lista) return;

  const reservas = leerReservas().slice().reverse(); // la más reciente primero
  if (reservas.length === 0) {
    lista.innerHTML = `<p class="cartempty">Todavía no has hecho ninguna reserva. Elige asientos arriba y confírmalos para verlos aquí.</p>`;
    if (resumen) resumen.textContent = "";
    return;
  }

  const totalAsientos = reservas.reduce((s, r) => s + (r.asientos?.length || 0), 0);
  const totalImporte = reservas.reduce((s, r) => s + (Number(r.total) || 0), 0);
  if (resumen) {
    resumen.textContent = `${reservas.length} ${reservas.length === 1 ? "reserva" : "reservas"} · ${totalAsientos} asientos · ${totalImporte.toFixed(2)} €`;
  }

  lista.innerHTML = reservas
    .map((r) => {
      const fecha = new Date(r.fecha);
      const fechaTxt = isNaN(fecha) ? "" : fecha.toLocaleString("es-ES", { dateStyle: "medium", timeStyle: "short" });
      return `
      <article class="reserva-card">
        <div class="reserva-head">
          <div>
            <strong>${r.partido ? `Ñemones vs ${escaparHTML(r.partido)}` : "Reserva"}</strong>
            <p class="modal-note" style="margin:0.15rem 0 0">${escaparHTML(r.nombre)} · ${escaparHTML(r.email)}${fechaTxt ? ` · ${fechaTxt}` : ""}</p>
          </div>
          <span class="reserva-total">${(Number(r.total) || 0).toFixed(2)} €</span>
        </div>
        <ul class="seatlist">${(r.asientos || []).slice().sort().map((id) => `<li>${etiquetaAsiento(id)}</li>`).join("")}</ul>
      </article>`;
    })
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const infoEl = document.getElementById("info-partido");
  if (infoEl) {
    infoEl.textContent = `Ñemones BC vs ${PROXIMO_PARTIDO.rival} · ${PROXIMO_PARTIDO.fecha} · ${PROXIMO_PARTIDO.hora} · ${PROXIMO_PARTIDO.pabellon}`;
  }

  cargarAsientosCompartidos(); // ✨ NUEVO: antes de pintar el mapa
  renderMapa();
  renderResumen();
  renderMisReservas();

  document.getElementById("compartir-asientos")?.addEventListener("click", () => {
    window.compartirEnlace?.(urlCompartirAsientos(), "Mis asientos en Ñemones BC");
  });

  const nombreEl = document.getElementById("res-nombre");
  const emailEl = document.getElementById("res-email");
  nombreEl?.addEventListener("input", () => actualizarFormulario());
  emailEl?.addEventListener("input", () => actualizarFormulario());
  emailEl?.addEventListener("blur", () => actualizarFormulario(true));

  document.getElementById("res-form")?.addEventListener("submit", confirmarReserva);
});
