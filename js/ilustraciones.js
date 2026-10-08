/* ============================================================
   ÑEMONES BASQUET CLUB — ilustraciones generadas (SVG inline)
   No usa imágenes externas: todo se dibuja con vectores propios
   para mantener un estilo consistente en toda la web.
   ============================================================ */

const PALETA_JUGADORES = ["#f4a100", "#c1121f", "#3c5a80", "#e8890b"];

function avatarJugadorSVG(jugador, index) {
  const color = PALETA_JUGADORES[index % PALETA_JUGADORES.length];
  return `
  <svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración de ${jugador.nombre}">
    <rect width="200" height="220" fill="#0d1b2a"/>
    <circle cx="168" cy="34" r="16" fill="none" stroke="${color}" stroke-width="1.4" opacity="0.65"/>
    <path d="M154 34h28M168 20v28M158 23c6 6 6 16 0 22M178 23c-6 6-6 16 0 22"
          stroke="${color}" stroke-width="1" opacity="0.65" fill="none"/>
    <path d="M62 42 L82 20 L118 20 L138 42 L162 64 L150 96 L132 84 L132 202 L68 202 L68 84 L50 96 L38 64 Z"
          fill="${color}"/>
    <path d="M86 20 Q100 46 114 20" fill="none" stroke="#0d1b2a" stroke-width="7"/>
    <text x="100" y="156" text-anchor="middle" font-family="'Bebas Neue',sans-serif" font-size="76" fill="#0d1b2a">${jugador.numero}</text>
  </svg>`;
}

const ICONOS_PRODUCTO = {
  camiseta: (c) => `
    <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Camiseta">
      <rect width="160" height="160" fill="#12263b"/>
      <path d="M55 30 L35 45 L20 70 L38 82 L48 72 L48 138 L112 138 L112 72 L122 82 L140 70 L125 45 L105 30
               Q100 44 80 44 Q60 44 55 30 Z" fill="${c}"/>
      <path d="M68 30 Q80 46 92 30" fill="none" stroke="#12263b" stroke-width="5"/>
    </svg>`,
  sudadera: (c) => `
    <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sudadera con capucha">
      <rect width="160" height="160" fill="#12263b"/>
      <path d="M80 24 Q58 24 55 44 L32 52 L20 76 L38 86 L46 76 L46 140 L114 140 L114 76 L122 86 L140 76 L128 52 L105 44
               Q102 24 80 24 Z" fill="${c}"/>
      <path d="M62 40 Q80 60 98 40" fill="none" stroke="#12263b" stroke-width="5"/>
      <circle cx="80" cy="100" r="4" fill="#12263b"/>
      <line x1="80" y1="104" x2="80" y2="122" stroke="#12263b" stroke-width="3"/>
    </svg>`,
  gorra: (c) => `
    <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Gorra">
      <rect width="160" height="160" fill="#12263b"/>
      <path d="M30 92 Q80 48 130 92 Q80 110 30 92 Z" fill="${c}"/>
      <path d="M28 94 Q80 66 112 94 L118 106 Q80 118 22 106 Z" fill="${c}" opacity="0.85"/>
      <circle cx="80" cy="66" r="4" fill="#12263b"/>
    </svg>`,
  balon: (c) => `
    <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Balón oficial">
      <rect width="160" height="160" fill="#12263b"/>
      <circle cx="80" cy="80" r="46" fill="${c}"/>
      <path d="M34 80h92M80 34v92M50 46c18 18 18 70 0 88M110 46c-18 18-18 70 0 88"
            stroke="#12263b" stroke-width="3" fill="none"/>
    </svg>`,
  bufanda: (c) => `
    <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bufanda de grada">
      <rect width="160" height="160" fill="#12263b"/>
      <path d="M20 60h120v18H20zM20 82h120v18H20z" fill="${c}"/>
      <path d="M20 60h120v18H20z" fill="#12263b" opacity="0.18"/>
      <path d="M24 100l-6 22 8-4 6 6 6-8 6 8 6-6 8 4-6-22z" fill="${c}"/>
      <path d="M126 100l6 22-8-4-6 6-6-8-6 8-6-6-8 4 6-22z" fill="${c}"/>
    </svg>`,
  pantalon: (c) => `
    <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pantalón">
      <rect width="160" height="160" fill="#12263b"/>
      <path d="M46 30 H114 L120 132 H90 L80 74 L70 132 H40 Z" fill="${c}"/>
      <path d="M46 30 H114 V40 H46 Z" fill="#12263b" opacity="0.25"/>
      <line x1="80" y1="40" x2="80" y2="74" stroke="#12263b" stroke-width="3"/>
    </svg>`,
  calcetines: (c) => `
    <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Calcetines">
      <rect width="160" height="160" fill="#12263b"/>
      <path d="M52 26 H82 V96 L112 112 Q124 122 112 132 H58 Q46 130 52 112 Z" fill="${c}"/>
      <rect x="52" y="26" width="30" height="14" fill="#12263b" opacity="0.3"/>
      <rect x="52" y="46" width="30" height="6" fill="#12263b" opacity="0.3"/>
    </svg>`,
  munequera: (c) => `
    <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Muñequeras">
      <rect width="160" height="160" fill="#12263b"/>
      <rect x="28" y="62" width="44" height="36" rx="8" fill="${c}"/>
      <rect x="88" y="62" width="44" height="36" rx="8" fill="${c}"/>
      <rect x="28" y="76" width="44" height="5" fill="#12263b" opacity="0.35"/>
      <rect x="88" y="76" width="44" height="5" fill="#12263b" opacity="0.35"/>
    </svg>`,
  mochila: (c) => `
    <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mochila">
      <rect width="160" height="160" fill="#12263b"/>
      <path d="M62 34 Q80 14 98 34" fill="none" stroke="${c}" stroke-width="6"/>
      <rect x="44" y="34" width="72" height="98" rx="18" fill="${c}"/>
      <rect x="56" y="88" width="48" height="30" rx="6" fill="#12263b" opacity="0.28"/>
      <line x1="56" y1="60" x2="104" y2="60" stroke="#12263b" stroke-width="3" opacity="0.5"/>
    </svg>`,
  botella: (c) => `
    <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Botella">
      <rect width="160" height="160" fill="#12263b"/>
      <rect x="68" y="16" width="24" height="16" rx="3" fill="${c}"/>
      <path d="M64 32 H96 L102 46 V138 Q102 146 94 146 H66 Q58 146 58 138 V46 Z" fill="${c}"/>
      <rect x="58" y="70" width="44" height="30" fill="#12263b" opacity="0.25"/>
    </svg>`,
  taza: (c) => `
    <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Taza">
      <rect width="160" height="160" fill="#12263b"/>
      <path d="M38 50 H108 V104 Q108 128 84 128 H62 Q38 128 38 104 Z" fill="${c}"/>
      <path d="M108 62 H120 Q136 62 136 82 Q136 102 118 102 H108" fill="none" stroke="${c}" stroke-width="8"/>
      <text x="73" y="96" text-anchor="middle" font-family="'Bebas Neue',sans-serif" font-size="34" fill="#12263b">Ñ</text>
    </svg>`,
  poster: (c) => `
    <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Póster">
      <rect width="160" height="160" fill="#12263b"/>
      <rect x="44" y="14" width="72" height="132" fill="${c}"/>
      <rect x="52" y="22" width="56" height="116" fill="#12263b"/>
      <circle cx="80" cy="60" r="16" fill="${c}"/>
      <path d="M56 130 Q80 84 104 130 Z" fill="${c}" opacity="0.85"/>
    </svg>`,
  llavero: (c) => `
    <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Llavero aro roto">
      <rect width="160" height="160" fill="#12263b"/>
      <circle cx="80" cy="34" r="12" fill="none" stroke="#9fb0c3" stroke-width="4"/>
      <line x1="80" y1="46" x2="80" y2="62" stroke="#9fb0c3" stroke-width="3"/>
      <path d="M40 92 A40 14 0 0 1 120 92" fill="none" stroke="${c}" stroke-width="7"/>
      <path d="M40 92 L30 112 M120 92 L134 108" stroke="${c}" stroke-width="7" stroke-linecap="round"/>
      <path d="M52 100 L60 130 M76 106 L72 138 M100 104 L110 132" stroke="#f3efe6" stroke-width="2" opacity="0.7"/>
    </svg>`,
};

function iconoProductoSVG(producto) {
  const fn = ICONOS_PRODUCTO[producto.icono] || ICONOS_PRODUCTO.camiseta;
  return fn(producto.color || "#f4a100");
}

/* ---------- Cuerpo técnico ---------- */

function avatarStaffSVG(persona, index) {
  const color = PALETA_JUGADORES[(index + 1) % PALETA_JUGADORES.length];
  const iniciales = persona.nombre.split(" ").map((p) => p[0]).slice(0, 2).join("");
  return `
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustración de ${persona.nombre}">
    <rect width="200" height="200" fill="#0d1b2a"/>
    <circle cx="100" cy="76" r="34" fill="${color}"/>
    <path d="M30 200 Q30 124 100 124 Q170 124 170 200 Z" fill="${color}" opacity="0.85"/>
    <text x="100" y="90" text-anchor="middle" font-family="'Bebas Neue',sans-serif" font-size="40" fill="#0d1b2a">${iniciales}</text>
  </svg>`;
}

/* ---------- Galería: escenas vectoriales ---------- */

function escenaGaleriaSVG(item) {
  const c = item.color;
  const fondo = `<rect width="400" height="300" fill="#12263b"/>`;
  const escenas = {
    pabellon: `
      <polygon points="40,250 360,250 320,150 80,150" fill="${c}" opacity="0.9"/>
      <polygon points="80,150 320,150 300,110 100,110" fill="#1b2f45"/>
      <polygon points="40,250 80,150 100,110 20,110 0,250" fill="#0d1b2a" opacity="0.7"/>
      <polygon points="360,250 320,150 300,110 380,110 400,250" fill="#0d1b2a" opacity="0.7"/>
      <ellipse cx="200" cy="200" rx="34" ry="14" fill="none" stroke="#12263b" stroke-width="3"/>
      <line x1="200" y1="150" x2="200" y2="250" stroke="#12263b" stroke-width="3"/>
      <path d="M120 150 Q200 210 280 150" fill="none" stroke="#12263b" stroke-width="3"/>`,
    grada: `
      ${[0, 1, 2, 3, 4].map((f) => Array.from({ length: 14 }, (_, k) =>
        `<circle cx="${34 + k * 25 + (f % 2) * 12}" cy="${90 + f * 36}" r="9" fill="${k % 3 === 0 ? c : k % 3 === 1 ? "#f3efe6" : "#3c5a80"}" opacity="${0.55 + f * 0.09}"/>`
      ).join("")).join("")}
      <path d="M20 40 H380" stroke="${c}" stroke-width="3"/>
      <text x="200" y="34" text-anchor="middle" font-family="'Bebas Neue',sans-serif" font-size="26" fill="${c}">LOS ÑES</text>`,
    mate: `
      <rect x="258" y="40" width="10" height="90" fill="#f3efe6" opacity="0.8"/>
      <path d="M268 100 H196" stroke="${c}" stroke-width="5"/>
      <path d="M198 102 L204 142 M232 102 L232 142 M258 102 L252 142" stroke="#f3efe6" stroke-width="2" opacity="0.7"/>
      <circle cx="170" cy="104" r="20" fill="${c}"/>
      <path d="M150 104h40M170 84v40" stroke="#12263b" stroke-width="2"/>
      <path d="M60 280 Q100 120 150 112" fill="none" stroke="${c}" stroke-width="3" stroke-dasharray="6 6" opacity="0.7"/>
      <rect x="0" y="262" width="400" height="38" fill="${c}" opacity="0.35"/>`,
    jugada: `
      <rect x="20" y="40" width="360" height="220" fill="none" stroke="#f3efe6" stroke-width="2" opacity="0.5"/>
      <circle cx="200" cy="150" r="36" fill="none" stroke="#f3efe6" stroke-width="2" opacity="0.5"/>
      <path d="M20 40 A140 140 0 0 1 20 260" fill="none" stroke="#f3efe6" stroke-width="2" opacity="0.5"/>
      <circle cx="110" cy="190" r="12" fill="${c}"/><circle cx="170" cy="110" r="12" fill="${c}"/>
      <circle cx="250" cy="170" r="12" fill="#3c5a80"/><circle cx="300" cy="100" r="12" fill="#3c5a80"/>
      <path d="M110 190 Q150 100 300 100" fill="none" stroke="${c}" stroke-width="3" stroke-dasharray="6 6"/>
      <circle cx="300" cy="100" r="7" fill="#f3efe6"/>`,
    trofeo: `
      <path d="M140 80 H260 Q260 160 200 170 Q140 160 140 80 Z" fill="${c}"/>
      <path d="M140 94 Q100 94 104 124 Q108 148 144 150 M260 94 Q300 94 296 124 Q292 148 256 150" fill="none" stroke="${c}" stroke-width="8"/>
      <rect x="190" y="170" width="20" height="40" fill="${c}"/>
      <rect x="150" y="210" width="100" height="22" fill="${c}" opacity="0.85"/>
      <text x="200" y="130" text-anchor="middle" font-family="'Bebas Neue',sans-serif" font-size="44" fill="#12263b">Ñ</text>`,
    cantera: `
      <rect x="0" y="230" width="400" height="70" fill="${c}" opacity="0.45"/>
      ${[70, 150, 230, 310].map((x) => `<path d="M${x} 240 L${x + 14} 240 L${x + 7} 214 Z" fill="#f4a100"/>`).join("")}
      ${[[100, 160], [200, 130], [300, 170]].map(([x, y]) => `
        <circle cx="${x}" cy="${y}" r="14" fill="${c}"/>
        <path d="M${x - 16} ${y + 70} L${x - 12} ${y + 20} L${x + 12} ${y + 20} L${x + 16} ${y + 70} Z" fill="${c}" opacity="0.85"/>`).join("")}
      <circle cx="244" cy="214" r="12" fill="#f4a100"/><path d="M232 214h24M244 202v24" stroke="#12263b" stroke-width="2"/>`,
  };
  return `
  <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${item.titulo}">
    ${fondo}${escenas[item.tipo] || escenas.pabellon}
  </svg>`;
}
