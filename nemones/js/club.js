/* ============================================================
   ÑEMONES BASQUET CLUB — página "Sobre el club"
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("timeline").innerHTML = HISTORIA.map(
    (h) => `
    <li>
      <span class="timeline-year">${h.anio}</span>
      <div><h3 style="margin:0 0 0.2em;font-size:1.3rem">${h.titulo}</h3><p style="margin:0">${h.texto}</p></div>
    </li>`
  ).join("");

  document.getElementById("cantera-texto").textContent = CANTERA.texto;
  document.getElementById("cantera-cifras").innerHTML = CANTERA.cifras
    .map((c) => `<div><span class="stat-num">${c.num}</span><span class="stat-label">${c.label}</span></div>`)
    .join("");
  document.getElementById("cantera-cats").innerHTML = CANTERA.categorias
    .map((c) => `<div class="cat"><strong>${c.nombre}</strong><span>${c.edades}</span></div>`)
    .join("");

  document.getElementById("palmares-lista").innerHTML = PALMARES.map(
    (p) => `
    <article class="trophy">
      <span class="trophy-num">${p.cantidad}</span>
      <div><h3 style="margin:0;font-size:1.3rem">${p.titulo}</h3><p style="margin:0.2em 0 0;font-size:0.88rem">${p.detalle}</p></div>
    </article>`
  ).join("");

  document.getElementById("staff").innerHTML = STAFF.map(
    (s, i) => `
    <article class="staffcard">
      <div class="staff-avatar">${avatarStaffSVG(s, i)}</div>
      <p class="kicker" style="margin:0.7rem 0 0.1em;color:var(--accent);font-weight:600;font-size:0.82rem">${s.cargo}</p>
      <h3 style="margin:0 0 0.3rem">${s.nombre}</h3>
      <p style="margin:0;font-size:0.86rem">${s.bio}</p>
      <p class="modal-note" style="margin-top:0.6rem">En el club desde ${s.desde}</p>
    </article>`
  ).join("");
});
