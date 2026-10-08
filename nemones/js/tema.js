/* ============================================================
   ✨ NUEVO — aplica el tema (oscuro/claro) ANTES de pintar la página.
   Se carga en el <head> (sin defer) para evitar el "parpadeo" de colores.
   El tema por defecto es el oscuro (la identidad del club); si la persona
   elige otro con el botón de la navbar, se guarda en localStorage.
   ============================================================ */
(function () {
  var tema = "dark";
  try {
    tema = localStorage.getItem("nemones_tema") || "dark";
  } catch (e) {
    /* si localStorage está bloqueado, nos quedamos con el oscuro */
  }
  document.documentElement.setAttribute("data-tema", tema === "light" ? "light" : "dark");
})();
