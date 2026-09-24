/* ============================================================
   ÑEMONES BASQUET CLUB — datos compartidos
   Todas las páginas cargan este archivo antes que el suyo propio.
   ============================================================ */

const PROXIMO_PARTIDO = {
  rival: "Halcones de Riobajo",
  fecha: "2026-10-11",
  hora: "19:30",
  pabellon: "Pabellón Ñemón",
  competicion: "Liga Regional — Jornada 4",
};

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

const PRODUCTOS = [
  { id: "cam-local",   nombre: "Camiseta local",        precio: 54.90, detalle: "Amarillo floodlight, dorsal a elegir", icono: "camiseta", color: "#f4a100" },
  { id: "cam-visita",  nombre: "Camiseta visitante",     precio: 54.90, detalle: "Azul noche, tejido transpirable", icono: "camiseta", color: "#3c5a80" },
  { id: "cam-oladotu", nombre: "Camiseta Oladotu #55",   precio: 59.90, detalle: "Edición 'Rompe-aros', dorsal 55 estampado", icono: "camiseta", color: "#c1121f" },
  { id: "cam-nino",    nombre: "Camiseta infantil",      precio: 34.90, detalle: "Tallas 6 a 14 años, réplica local", icono: "camiseta", color: "#e8890b" },
  { id: "sudadera",    nombre: "Sudadera de calentamiento", precio: 42.00, detalle: "Con capucha y escudo bordado", icono: "sudadera", color: "#c1121f" },
  { id: "chandal",     nombre: "Pantalón de chándal",    precio: 38.00, detalle: "Corte recto, puños elásticos y escudo", icono: "pantalon", color: "#3c5a80" },
  { id: "pantalon",    nombre: "Pantalón de juego",      precio: 29.90, detalle: "Ligero, con bolsillos y cintura elástica", icono: "pantalon", color: "#f4a100" },
  { id: "calcetines",  nombre: "Calcetines pro (pack 3)", precio: 14.90, detalle: "Acolchados en talón y planta", icono: "calcetines", color: "#f4a100" },
  { id: "munequera",   nombre: "Muñequeras (par)",       precio: 9.90,  detalle: "Algodón absorbente con escudo", icono: "munequera", color: "#c1121f" },
  { id: "gorra",       nombre: "Gorra Ñemones",          precio: 19.50, detalle: "Ajustable, bordado 3D", icono: "gorra", color: "#f4a100" },
  { id: "balon",       nombre: "Balón oficial",          precio: 34.90, detalle: "Réplica del balón de partido", icono: "balon", color: "#c1121f" },
  { id: "balon-mini",  nombre: "Minibalón firmable",     precio: 12.00, detalle: "Ideal para pedir autógrafos tras el partido", icono: "balon", color: "#f4a100" },
  { id: "bufanda",     nombre: "Bufanda de grada",        precio: 16.00, detalle: "Edición aficionado, doble cara", icono: "bufanda", color: "#f4a100" },
  { id: "mochila",     nombre: "Mochila del club",       precio: 39.90, detalle: "Compartimento para balón y zapatillas", icono: "mochila", color: "#3c5a80" },
  { id: "botella",     nombre: "Botella térmica 750 ml", precio: 17.50, detalle: "Acero inox, mantiene el frío 12 h", icono: "botella", color: "#c1121f" },
  { id: "taza",        nombre: "Taza 'Los Ñes'",         precio: 9.50,  detalle: "Cerámica, apta para lavavajillas", icono: "taza", color: "#f4a100" },
  { id: "poster",      nombre: "Póster de plantilla",    precio: 8.00,  detalle: "50 × 70 cm con los 14 jugadores", icono: "poster", color: "#f4a100" },
  { id: "llavero",     nombre: "Llavero aro roto",       precio: 6.50,  detalle: "Homenaje a los aros doblados por Oladotu", icono: "llavero", color: "#c1121f" },
];

/* Configuración del pabellón para la página de reservas.
   Cada sección define filas × asientos por fila y su precio. */
const SECCIONES_RESERVAS = [
  { id: "pista",      nombre: "Pista (courtside)", filas: 2, asientosPorFila: 10, precio: 65 },
  { id: "preferente", nombre: "Preferente",         filas: 4, asientosPorFila: 14, precio: 32 },
  { id: "general",    nombre: "General",            filas: 6, asientosPorFila: 18, precio: 16 },
];
