/* ============================================================
   ÑEMONES BASQUET CLUB — datos compartidos
   Todas las páginas cargan este archivo antes que el suyo propio.
   ============================================================ */

const PROXIMO_PARTIDO = {
  rival: "Los Chatarreros de Riobajo",
  fecha: "2026-10-11",
  hora: "19:30",
  pabellon: "Pabellón Ñemón",
  competicion: "Liga Regional — Jornada 4",
};

/* Calendario completo de la temporada.
   jugado:false => partido futuro (se muestra hora, no resultado).
   lugar: "casa" | "fuera". pabellonRival solo se usa si lugar es "fuera". */
const CALENDARIO = [
  { jornada: "Copa Regional — Final", competicion: "Copa Regional",
    fecha: "2026-08-30", hora: "20:00", rival: "Los Boquerones de Vallnova",
    lugar: "casa", pabellonRival: "",
    jugado: true, resultado: { nemones: 102, rival: 88 } },

  { jornada: "Jornada 1", competicion: "Liga Regional",
    fecha: "2026-09-20", hora: "19:00", rival: "Los Tractoristas de Vallarena",
    lugar: "fuera", pabellonRival: "Polideportivo Vallarena",
    jugado: true, resultado: { nemones: 78, rival: 71 } },

  { jornada: "Jornada 2", competicion: "Liga Regional",
    fecha: "2026-09-27", hora: "19:30", rival: "Los Piratas del Puerto",
    lugar: "casa", pabellonRival: "",
    jugado: true, resultado: { nemones: 85, rival: 79 } },

  { jornada: "Jornada 3", competicion: "Liga Regional",
    fecha: "2026-10-04", hora: "18:00", rival: "Los Quesitos de Montenegro",
    lugar: "fuera", pabellonRival: "Polideportivo Montenegro",
    jugado: true, resultado: { nemones: 70, rival: 74 } },

  { jornada: "Jornada 4", competicion: "Liga Regional",
    fecha: "2026-10-11", hora: "19:30", rival: "Los Chatarreros de Riobajo",
    lugar: "casa", pabellonRival: "",
    jugado: false },

  { jornada: "Jornada 5", competicion: "Liga Regional",
    fecha: "2026-10-18", hora: "19:00", rival: "Los Mariscadores de Costabella",
    lugar: "fuera", pabellonRival: "Pabellón Costabella",
    jugado: false },

  { jornada: "Jornada 6", competicion: "Liga Regional",
    fecha: "2026-10-25", hora: "19:30", rival: "Los Guiris de Sierraverde",
    lugar: "casa", pabellonRival: "",
    jugado: false },

  { jornada: "Jornada 7", competicion: "Liga Regional",
    fecha: "2026-11-01", hora: "18:30", rival: "Los Cavernícolas de Altamira",
    lugar: "fuera", pabellonRival: "Polideportivo Altamira",
    jugado: false },

  { jornada: "Jornada 8", competicion: "Liga Regional",
    fecha: "2026-11-08", hora: "19:30", rival: "Los Tractoristas de Vallarena",
    lugar: "casa", pabellonRival: "",
    jugado: false },

  { jornada: "Jornada 9", competicion: "Liga Regional",
    fecha: "2026-11-15", hora: "19:00", rival: "Los Piratas del Puerto",
    lugar: "fuera", pabellonRival: "Pabellón Titanes",
    jugado: false },

  { jornada: "Jornada 10", competicion: "Liga Regional",
    fecha: "2026-11-22", hora: "19:30", rival: "Los Quesitos de Montenegro",
    lugar: "casa", pabellonRival: "",
    jugado: false },

  { jornada: "Jornada 11", competicion: "Liga Regional",
    fecha: "2026-11-29", hora: "18:00", rival: "Los Chatarreros de Riobajo",
    lugar: "fuera", pabellonRival: "Pabellón Riobajo",
    jugado: false },

  { jornada: "Jornada 12", competicion: "Liga Regional",
    fecha: "2026-12-06", hora: "19:30", rival: "Los Mariscadores de Costabella",
    lugar: "casa", pabellonRival: "",
    jugado: false },

  { jornada: "Jornada 13", competicion: "Liga Regional",
    fecha: "2026-12-13", hora: "19:00", rival: "Los Guiris de Sierraverde",
    lugar: "fuera", pabellonRival: "Pabellón Sierraverde",
    jugado: false },

  { jornada: "Jornada 14", competicion: "Liga Regional",
    fecha: "2026-12-20", hora: "19:30", rival: "Los Cavernícolas de Altamira",
    lugar: "casa", pabellonRival: "",
    jugado: false },
];

/* Clasificación de la Liga Regional tras la Jornada 3.
   pts se calcula con el baremo habitual: 2 puntos por victoria, 1 por derrota.
   dif (PF - PC) se calcula al vuelo en calendario.js, no hace falta guardarlo. */
const CLASIFICACION = [
  { equipo: "Los Quesitos de Montenegro",     pj: 3, g: 3, p: 0, pf: 251, pc: 214 },
  { equipo: "Ñemones BC",                     pj: 3, g: 2, p: 1, pf: 233, pc: 224, esNemones: true },
  { equipo: "Los Cavernícolas de Altamira",   pj: 3, g: 2, p: 1, pf: 238, pc: 231 },
  { equipo: "Los Mariscadores de Costabella", pj: 3, g: 2, p: 1, pf: 229, pc: 226 },
  { equipo: "Los Chatarreros de Riobajo",     pj: 3, g: 1, p: 2, pf: 221, pc: 227 },
  { equipo: "Los Guiris de Sierraverde",      pj: 3, g: 1, p: 2, pf: 215, pc: 224 },
  { equipo: "Los Piratas del Puerto",         pj: 3, g: 1, p: 2, pf: 230, pc: 241 },
  { equipo: "Los Tractoristas de Vallarena",  pj: 3, g: 0, p: 3, pf: 208, pc: 238 },
];

/* Cada jugador tiene:
   - stats: medias por partido (los minutos suman 200 = 5 jugadores x 40 min)
   - insignia: etiqueta corta que sale en la tarjeta
   - hazana: su gran marca personal, que sale en la ficha
   - mvp: true solo para el mejor jugador del equipo */
const PLANTILLA = [
  { numero: 2,  nombre: "Jon Ibarrola",   posicion: "Base",      altura: "1.80 m", dato: "Presión a toda pista",
    insignia: "MOSQUITO",
    hazana: "7 robos en un solo partido, todos en los últimos 20 minutos.",
    stats: { min: 2.0,  pts: 1.1,  reb: 0.3,  ast: 0.6, rob: 0.4, tap: 0.0, mates: 0.0, mm: 0.4,  per: 0.3, tc: 40, t3: 33, tl: 80 },
    bio: "La pesadilla de los bases rivales. Pequeño, incansable y con manos rapidísimas en la presión a toda pista." },
  { numero: 4,  nombre: "Bruno Salces",   posicion: "Base",      altura: "1.86 m", dato: "6.2 asist/partido",
    insignia: "MAESTRO",
    hazana: "21 asistencias en un solo partido, récord del club.",
    stats: { min: 24.0, pts: 6.8,  reb: 2.4,  ast: 6.2, rob: 1.5, tap: 0.1, mates: 0.1, mm: 5.2,  per: 1.6, tc: 44, t3: 34, tl: 81 },
    bio: "El cerebro del equipo. Reparte más asistencias que nadie en la liga y casi nunca pierde el balón." },
  { numero: 7,  nombre: "Iker Domenech",  posicion: "Escolta",   altura: "1.92 m", dato: "15.0 pts/partido",
    insignia: "MÁQUINA DE PUNTOS",
    hazana: "44 puntos en la final de la Copa Regional, con 9 tiros de media distancia seguidos.",
    stats: { min: 25.0, pts: 15.0, reb: 2.8,  ast: 2.2, rob: 1.0, tap: 0.2, mates: 0.5, mm: 4.6,  per: 1.8, tc: 47, t3: 39, tl: 86 },
    bio: "El máximo anotador exterior de Ñemones. Especialista en tiros desde media distancia bajo presión." },
  { numero: 9,  nombre: "Marc Oyarzun",   posicion: "Alero",     altura: "1.98 m", dato: "2.1 robos/partido",
    insignia: "LADRÓN DE BALONES",
    hazana: "9 robos en un solo partido, y 6 acabaron en contraataque.",
    stats: { min: 14.0, pts: 7.4,  reb: 3.2,  ast: 1.4, rob: 2.1, tap: 0.3, mates: 0.8, mm: 3.0,  per: 1.1, tc: 46, t3: 33, tl: 74 },
    bio: "Un fastidio para cualquier rival: siempre está en el sitio justo para robar el balón." },
  { numero: 11, nombre: "Toni Reventós",  posicion: "Ala-pívot", altura: "2.03 m", dato: "7.4 rebotes/partido",
    insignia: "ASPIRADORA",
    hazana: "28 rebotes en un solo partido, más que todo el equipo rival junto.",
    stats: { min: 18.0, pts: 10.3, reb: 7.4,  ast: 1.1, rob: 0.7, tap: 0.6, mates: 1.4, mm: 4.1,  per: 1.4, tc: 55, t3: 22, tl: 68 },
    bio: "Domina la pintura en ambos lados de la cancha. Segundo mejor reboteador de la categoría." },
  { numero: 13, nombre: "Dario Camposol", posicion: "Pívot",     altura: "2.09 m", dato: "1.3 tapones/partido",
    insignia: "EL MURO",
    hazana: "9 tapones en un solo partido, en solo 24 minutos.",
    stats: { min: 11.0, pts: 5.4,  reb: 4.4,  ast: 0.4, rob: 0.3, tap: 1.3, mates: 1.2, mm: 2.4,  per: 0.8, tc: 58, t3: 0,  tl: 62 },
    bio: "El muro bajo el aro. Sus tapones son ya un clásico de las gradas del Pabellón Ñemón." },
  { numero: 15, nombre: "Nico Ferrán",    posicion: "Base",      altura: "1.83 m", dato: "45% en triples",
    insignia: "SPLASH BROTHER",
    hazana: "14 triples en un solo partido (14 de 19), récord de la Liga Regional.",
    stats: { min: 16.0, pts: 10.8, reb: 1.7,  ast: 3.4, rob: 1.0, tap: 0.0, mates: 0.0, mm: 3.3,  per: 1.3, tc: 45, t3: 45, tl: 89 },
    bio: "El mejor tirador exterior de la plantilla. Cuando entra en calor, no hay defensa que valga." },
  { numero: 17, nombre: "Samu Beltrán",   posicion: "Alero",     altura: "1.95 m", dato: "1.3 mates/partido",
    insignia: "VOLADOR",
    hazana: "5 mates en un solo partido, tres de ellos en el mismo cuarto.",
    stats: { min: 6.0,  pts: 4.4,  reb: 1.6,  ast: 0.7, rob: 0.6, tap: 0.2, mates: 1.3, mm: 1.2,  per: 0.6, tc: 52, t3: 29, tl: 71 },
    bio: "Atleta puro. Sale desde el banquillo a encender la grada con contraataques y mates en transición." },
  { numero: 21, nombre: "Rai Montesinos", posicion: "Escolta",   altura: "1.90 m", dato: "10.1 pts/partido",
    insignia: "SANGRE FRÍA",
    hazana: "4 canastas ganadoras sobre la bocina esta temporada.",
    stats: { min: 15.0, pts: 10.1, reb: 2.6,  ast: 1.5, rob: 1.2, tap: 0.1, mates: 0.5, mm: 2.9,  per: 1.5, tc: 46, t3: 37, tl: 80 },
    bio: "Explosivo en el uno contra uno y siempre dispuesto a jugar los últimos minutos ajustados." },
  { numero: 23, nombre: "Adrián Castell", posicion: "Alero",     altura: "1.96 m", dato: "Capitán",
    insignia: "HOMBRE DE HIERRO",
    hazana: "Ni un solo partido de baja en 8 temporadas: 240 partidos seguidos.",
    stats: { min: 23.0, pts: 11.0, reb: 4.6,  ast: 2.8, rob: 1.5, tap: 0.3, mates: 0.8, mm: 6.3,  per: 1.1, tc: 49, t3: 38, tl: 85 },
    bio: "Capitán del equipo. Lleva la insignia de Ñemones desde la cantera hasta la primera plantilla." },
  { numero: 30, nombre: "Hugo Peñalver",  posicion: "Escolta",   altura: "1.89 m", dato: "Especialista defensivo",
    insignia: "CANDADO",
    hazana: "Dejó a la estrella rival en 4 puntos con 1 de 12 en tiros.",
    stats: { min: 3.0,  pts: 1.6,  reb: 0.7,  ast: 0.6, rob: 0.6, tap: 0.0, mates: 0.1, mm: 0.5,  per: 0.3, tc: 43, t3: 35, tl: 78 },
    bio: "Especialista defensivo del banquillo. Sale a cerrarle el grifo al mejor anotador rival." },
  { numero: 32, nombre: "Fer Aguadulce",  posicion: "Ala-pívot", altura: "2.01 m", dato: "54% en tiros de campo",
    insignia: "CAZARREBOTES",
    hazana: "11 rebotes ofensivos en un solo partido.",
    stats: { min: 4.0,  pts: 2.6,  reb: 2.3,  ast: 0.3, rob: 0.2, tap: 0.3, mates: 0.4, mm: 0.9,  per: 0.3, tc: 54, t3: 18, tl: 65 },
    bio: "Trabajador incansable en el rebote ofensivo, el que gana las segundas y terceras opciones." },
  { numero: 44, nombre: "Pau Ñemón",      posicion: "Pívot",     altura: "2.11 m", dato: "Ídolo cantera",
    insignia: "ÍDOLO",
    hazana: "Más de 300 partidos con la camiseta de Ñemones, desde la cantera.",
    stats: { min: 13.0, pts: 8.2,  reb: 5.6,  ast: 0.5, rob: 0.2, tap: 0.9, mates: 1.5, mm: 3.4,  per: 1.1, tc: 57, t3: 0,  tl: 64 },
    bio: "Ídolo de la cantera y uno de los jugadores más altos del club. Da nombre a la afición: 'los Ñes'." },
  { numero: 55, nombre: "Mamadu Oladotu", posicion: "Pívot",     altura: "2.16 m", dato: "4.5 tapones/partido",
    insignia: "ROMPE-AROS", mvp: true,
    hazana: "11 tapones en un partido (récord de la liga) y 7 aros doblados con sus mates.",
    stats: { min: 26.0, pts: 17.6, reb: 11.2, ast: 1.1, rob: 1.4, tap: 4.5, mates: 3.9, mm: 11.2, per: 2.0, tc: 64, t3: 0,  tl: 58 },
    bio: "El mejor jugador de la liga y MVP de Ñemones: 4.5 tapones por partido y unos mates tan brutales que ya ha doblado siete aros y obligado a parar dos partidos. Cuando salta, el Pabellón Ñemón contiene la respiración." },
];

/* Categorías de la tienda (clave -> texto del filtro) y listas de tallas.
   Cada producto lleva "categoria" y, si tiene tallas, "tallas". */
const CATEGORIAS_PRODUCTO = { ropa: "Ropa", accesorios: "Accesorios", hogar: "Hogar" };
const TALLAS_ADULTO = ["XS", "S", "M", "L", "XL", "XXL"];
const TALLAS_NINO = ["6", "8", "10", "12", "14"];
const TALLAS_CALCETIN = ["35-38", "39-42", "43-46"];

const PRODUCTOS = [
  { id: "cam-local", categoria: "ropa", tallas: TALLAS_ADULTO,   nombre: "Camiseta local",        precio: 54.90, detalle: "Amarillo floodlight, dorsal a elegir", icono: "camiseta", color: "#f4a100" },
  { id: "cam-visita", categoria: "ropa", tallas: TALLAS_ADULTO,  nombre: "Camiseta visitante",     precio: 54.90, detalle: "Azul noche, tejido transpirable", icono: "camiseta", color: "#3c5a80" },
  { id: "cam-oladotu", categoria: "ropa", tallas: TALLAS_ADULTO, nombre: "Camiseta Oladotu #55",   precio: 59.90, detalle: "Edición 'Rompe-aros', dorsal 55 estampado", icono: "camiseta", color: "#c1121f" },
  { id: "cam-nino", categoria: "ropa", tallas: TALLAS_NINO,    nombre: "Camiseta infantil",      precio: 34.90, detalle: "Tallas 6 a 14 años, réplica local", icono: "camiseta", color: "#e8890b" },
  { id: "sudadera", categoria: "ropa", tallas: TALLAS_ADULTO,    nombre: "Sudadera de calentamiento", precio: 42.00, detalle: "Con capucha y escudo bordado", icono: "sudadera", color: "#c1121f" },
  { id: "chandal", categoria: "ropa", tallas: TALLAS_ADULTO,     nombre: "Pantalón de chándal",    precio: 38.00, detalle: "Corte recto, puños elásticos y escudo", icono: "pantalon", color: "#3c5a80" },
  { id: "pantalon", categoria: "ropa", tallas: TALLAS_ADULTO,    nombre: "Pantalón de juego",      precio: 29.90, detalle: "Ligero, con bolsillos y cintura elástica", icono: "pantalon", color: "#f4a100" },
  { id: "calcetines", categoria: "ropa", tallas: TALLAS_CALCETIN,  nombre: "Calcetines pro (pack 3)", precio: 14.90, detalle: "Acolchados en talón y planta", icono: "calcetines", color: "#f4a100" },
  { id: "munequera", categoria: "accesorios",   nombre: "Muñequeras (par)",       precio: 9.90,  detalle: "Algodón absorbente con escudo", icono: "munequera", color: "#c1121f" },
  { id: "gorra", categoria: "accesorios",       nombre: "Gorra Ñemones",          precio: 19.50, detalle: "Ajustable, bordado 3D", icono: "gorra", color: "#f4a100" },
  { id: "balon", categoria: "accesorios",       nombre: "Balón oficial",          precio: 34.90, detalle: "Réplica del balón de partido", icono: "balon", color: "#c1121f" },
  { id: "balon-mini", categoria: "accesorios",  nombre: "Minibalón firmable",     precio: 12.00, detalle: "Ideal para pedir autógrafos tras el partido", icono: "balon", color: "#f4a100" },
  { id: "bufanda", categoria: "accesorios",     nombre: "Bufanda de grada",        precio: 16.00, detalle: "Edición aficionado, doble cara", icono: "bufanda", color: "#f4a100" },
  { id: "mochila", categoria: "accesorios",     nombre: "Mochila del club",       precio: 39.90, detalle: "Compartimento para balón y zapatillas", icono: "mochila", color: "#3c5a80" },
  { id: "botella", categoria: "hogar",     nombre: "Botella térmica 750 ml", precio: 17.50, detalle: "Acero inox, mantiene el frío 12 h", icono: "botella", color: "#c1121f" },
  { id: "taza", categoria: "hogar",        nombre: "Taza 'Los Ñes'",         precio: 9.50,  detalle: "Cerámica, apta para lavavajillas", icono: "taza", color: "#f4a100" },
  { id: "poster", categoria: "hogar",      nombre: "Póster de plantilla",    precio: 8.00,  detalle: "50 × 70 cm con los 14 jugadores", icono: "poster", color: "#f4a100" },
  { id: "llavero", categoria: "accesorios",     nombre: "Llavero aro roto",       precio: 6.50,  detalle: "Homenaje a los aros doblados por Oladotu", icono: "llavero", color: "#c1121f" },
];

/* Configuración del pabellón para la página de reservas.
   Cada sección define filas × asientos por fila y su precio. */
const SECCIONES_RESERVAS = [
  { id: "pista",      nombre: "Pista (courtside)", filas: 2, asientosPorFila: 10, precio: 65 },
  { id: "preferente", nombre: "Preferente",         filas: 4, asientosPorFila: 14, precio: 32 },
  { id: "general",    nombre: "General",            filas: 6, asientosPorFila: 18, precio: 16 },
];

/* ============================================================
   CLUB: historia, cantera, palmarés, cuerpo técnico y galería
   (datos inventados de demostración: edítalos a tu gusto)
   ============================================================ */

const HISTORIA = [
  { anio: "2015", titulo: "Nace el club", texto: "Un grupo de vecinos del barrio funda Ñemones Basquet Club con dos canastas oxidadas y un balón prestado." },
  { anio: "2017", titulo: "Primer ascenso", texto: "Tras una temporada invicta en casa, el equipo sube a la Liga Regional." },
  { anio: "2019", titulo: "Estreno del Pabellón Ñemón", texto: "El club inaugura su pabellón con 800 localidades y el parqué amarillo que ya es seña de identidad." },
  { anio: "2022", titulo: "Primera final de Copa", texto: "Ñemones llega por primera vez a la final de la Copa Regional y cae por un solo punto." },
  { anio: "2025", titulo: "Campeones de Copa", texto: "Con 44 puntos de Iker Domenech, el club levanta su primera Copa Regional." },
  { anio: "2026", titulo: "A por el podio", texto: "Con Oladotu como MVP de la liga, Ñemones encara la temporada 26/27 con el objetivo de pisar el podio." },
];

const CANTERA = {
  texto: "La cantera es el corazón de Ñemones: de ella han salido el capitán Adrián Castell y el ídolo Pau Ñemón. Entrenamos a niños y niñas desde los seis años con una idea clara: divertirse, crecer y sentir los colores.",
  cifras: [
    { num: "180", label: "Jugadores y jugadoras" },
    { num: "9", label: "Equipos de base" },
    { num: "14", label: "Entrenadores y monitores" },
  ],
  categorias: [
    { nombre: "Minibasket", edades: "6 – 11 años" },
    { nombre: "Infantil", edades: "12 – 13 años" },
    { nombre: "Cadete", edades: "14 – 15 años" },
    { nombre: "Júnior", edades: "16 – 18 años" },
  ],
};

const PALMARES = [
  { titulo: "Copa Regional", detalle: "Campeón 2024/25 · Subcampeón 2021/22", cantidad: 1 },
  { titulo: "Liga Regional", detalle: "4.º clasificado 2025/26 (mejor puesto histórico)", cantidad: 0 },
  { titulo: "Ascenso a Liga Regional", detalle: "Temporada 2016/17", cantidad: 1 },
  { titulo: "Torneo de Verano del Barrio", detalle: "Campeón en 2018, 2021 y 2023", cantidad: 3 },
];

const STAFF = [
  { nombre: "Ander Beitia",   cargo: "Entrenador",         desde: 2019, bio: "Lleva siete temporadas en el banquillo. Defiende un baloncesto de ritmo alto y presión a toda pista." },
  { nombre: "Luis Calderón",  cargo: "Segundo entrenador", desde: 2020, bio: "Analista del equipo: prepara los informes de rivales y trabaja el juego interior con los pívots." },
  { nombre: "Marta Olaizola", cargo: "Preparadora física", desde: 2021, bio: "Diseña la carga de entrenamiento y es la responsable de que la plantilla llegue entera al final de temporada." },
  { nombre: "Sergio Quintana", cargo: "Fisioterapeuta",    desde: 2018, bio: "Recupera lesiones, vendajes y piernas cansadas. Es el primero en llegar al pabellón los días de partido." },
  { nombre: "Nerea Zabala",   cargo: "Delegada de equipo", desde: 2022, bio: "Organiza viajes, fichas federativas y todo lo que ocurre fuera de la pista." },
];

/* tipo: escena SVG que se dibuja; cat: categoría del filtro */
const GALERIA = [
  { id: 1,  tipo: "pabellon",  cat: "Pabellón", titulo: "Pabellón Ñemón, vista general",   texto: "El parqué amarillo y 800 localidades.",          color: "#f4a100" },
  { id: 2,  tipo: "grada",     cat: "Afición",  titulo: "La grada de los Ñes",             texto: "Noche de lleno absoluto en el fondo norte.",      color: "#c1121f" },
  { id: 3,  tipo: "mate",      cat: "Partidos", titulo: "Mate de Oladotu",                 texto: "El aro número siete, doblado.",                   color: "#f4a100" },
  { id: 4,  tipo: "jugada",    cat: "Partidos", titulo: "Contraataque en transición",      texto: "Salces lidera, Beltrán corre la banda.",          color: "#e8890b" },
  { id: 5,  tipo: "trofeo",    cat: "Partidos", titulo: "Copa Regional 2024/25",           texto: "El primer título del club.",                      color: "#f4a100" },
  { id: 6,  tipo: "cantera",   cat: "Cantera",  titulo: "Entrenamiento de minibasket",     texto: "Conos, risas y mucho bote.",                      color: "#3c5a80" },
  { id: 7,  tipo: "pabellon",  cat: "Pabellón", titulo: "Pista vacía antes del partido",   texto: "Silencio una hora antes del salto inicial.",      color: "#3c5a80" },
  { id: 8,  tipo: "grada",     cat: "Afición",  titulo: "Bufandas al aire",                texto: "Doble cara, amarillo y grana.",                   color: "#f4a100" },
  { id: 9,  tipo: "jugada",    cat: "Partidos", titulo: "Triple de Ferrán",                texto: "Uno de los catorce de aquella noche.",            color: "#c1121f" },
  { id: 10, tipo: "cantera",   cat: "Cantera",  titulo: "Torneo júnior",                   texto: "Los de la cantera, en acción.",                   color: "#e8890b" },
  { id: 11, tipo: "mate",      cat: "Partidos", titulo: "Vuelo de Beltrán",                texto: "Tres mates en un cuarto.",                        color: "#c1121f" },
  { id: 12, tipo: "trofeo",    cat: "Cantera",  titulo: "Trofeo del Torneo de Verano",     texto: "Tercer título veraniego.",                        color: "#3c5a80" },
];
