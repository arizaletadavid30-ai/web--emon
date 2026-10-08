/* ============================================================
   ÑEMONES BASQUET CLUB — formulario de contacto (demo)
   Los mensajes se guardan en localStorage; no se envían a ningún sitio.
   ============================================================ */

const CONTACTOS_KEY = "nemones_contactos";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("con-form");
  if (!form) return;

  const motivo = document.getElementById("con-motivo");
  const extra = document.getElementById("con-extra-cantera");
  const msg = document.getElementById("con-msg");

  const parametro = new URLSearchParams(window.location.search).get("motivo");
  if (parametro && [...motivo.options].some((o) => o.value === parametro)) motivo.value = parametro;

  const actualizarExtra = () => {
    extra.hidden = motivo.value !== "cantera";
  };
  motivo.addEventListener("change", actualizarExtra);
  actualizarExtra();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const datos = Object.fromEntries(new FormData(form).entries());
    const nombre = (datos.nombre || "").trim();

    msg.classList.remove("error");
    if (!nombre || !(datos.mensaje || "").trim() || !datos.email || !document.getElementById("con-email").checkValidity()) {
      msg.textContent = "Revisa el formulario: nombre, correo válido y mensaje son obligatorios.";
      msg.classList.add("show", "error");
      return;
    }

    try {
      const guardados = JSON.parse(localStorage.getItem(CONTACTOS_KEY) || "[]");
      guardados.push({ ...datos, fecha: new Date().toISOString() });
      localStorage.setItem(CONTACTOS_KEY, JSON.stringify(guardados));
    } catch (_) {
      /* si el navegador bloquea localStorage, la demo sigue funcionando */
    }

    msg.textContent = `Gracias, ${nombre}. Hemos recibido tu mensaje y te responderemos pronto.`;
    msg.classList.add("show");
    form.reset();
    actualizarExtra();
  });
});
