const palabras = [
    "árbol", "casa", "perro", "gato", "sol", "luna", "rojo", "azul", "verde", "amarillo",
    "nube", "cielo", "mar", "río", "montaña", "ciudad", "pueblo", "puerta", "ventana", "mesa",
    "silla", "computadora", "teléfono", "teclado", "ratón", "pantalla", "libro", "cuaderno", "lápiz", "bolígrafo",
    "papel", "hoja", "flor", "jardín", "bosque", "playa", "isla", "arena", "ola", "barco",
    "avión", "tren", "auto", "bicicleta", "moto", "camino", "carretera", "puente", "túnel", "edificio",
    "torre", "pared", "techo", "suelo", "piso", "baño", "cocina", "dormitorio", "sala", "comedor",
    "escuela", "universidad", "hospital", "farmacia", "supermercado", "tienda", "mercado", "restaurante", "cafetería", "hotel",
    "cine", "teatro", "museo", "biblioteca", "parque", "zoológico", "acuario", "estadio", "gimnasio", "piscina",
    "fútbol", "baloncesto", "tenis", "natación", "atletismo", "ciclismo", "boxeo", "karate", "yoga", "danza",
    "música", "pintura", "escultura", "cine", "fotografía", "literatura", "poesía", "novela", "cuento", "ensayo",
    "revista", "periódico", "noticia", "historia", "geografía", "matemáticas", "ciencia", "física", "química", "biología",
    "astronomía", "medicina", "ingeniería", "arquitectura", "derecho", "economía", "psicología", 
    "sociología", "antropología", "filosofía", "religión", "política", "democracia", "gobierno", "presidente", 
    "ministro", "diputado", "senador", "alcalde", "ciudadano", "familia", "padre", "madre", "hijo", "hija", "hermano", 
    "hermana", "abuelo", "abuela", "tío", "tía", "primo", "prima", "esposo", "esposa", "novio", "novia", "amigo", "amiga", "vecino",
    "trabajo", "empleo", "jefe", "compañero", "oficina", "empresa", "negocio", "dinero", "banco", "crédito",
    "inversión", "ahorro", "salario", "impuesto", "precio", "mercado", "producto", "servicio", "cliente", "proveedor",
    "computación", "programación", "software", "hardware", "red", "internet", "código", "base de datos", "servidor", "aplicación",
    "juego", "videojuego", "consola", "pantalla", "control", "realidad virtual", "inteligencia artificial", "algoritmo", "robot", "tecnología",
    "futuro", "presente", "pasado", "tiempo", "espacio", "universo", "planeta", "estrella", "galaxia", "cometa",
    "meteorito", "gravedad", "electricidad", "energía", "calor", "frío", "viento", "tormenta", "huracán", "terremoto",
    "volcán", "erupción", "lava", "tierra", "agua", "fuego", "aire", "elemento", "átomo", "molécula",
    "celular", "tejido", "órgano", "sistema", "organismo", "bacteria", "virus", "gen", "adn", "evolución",
    "especie", "ecosistema", "medio ambiente", "contaminación", "reciclaje", "naturaleza", "sostenibilidad", "energía renovable", "cambio climático", "efecto invernadero",
    "desierto", "selva", "océano", "lago", "glaciar", "cascada", "cueva", "roca", "minerales", "petróleo",
    "gas", "carbón", "metal", "hierro", "acero", "cobre", "oro", "plata", "bronce", "plástico",
    "vidrio", "cerámica", "madera", "papel", "tela", "algodón", "seda", "cuero", "lana", "fibra",
    "comida", "bebida", "pan", "arroz", "pasta", "carne", "pescado", "pollo", "verdura", "fruta",
    "manzana", "pera", "plátano", "uva", "fresa", "naranja", "limón", "sandía", "melón", "piña",
    "mango", "papaya", "coco", "tomate", "lechuga", "zanahoria", "cebolla", "ajo", "pimiento", "pepino",
    "chocolate", "dulce", "pastel", "galleta", "helado", "miel", "azúcar", "sal", "pimienta", "especia",
    "café", "té", "leche", "jugo", "agua", "vino", "cerveza", "whisky", "ron", "licor",
    "deporte", "ejercicio", "entrenamiento", "gimnasio", "pesas", "correr", "saltar", "nadar", "caminar", "bicicleta",
    "viaje", "turismo", "hotel", "avión", "maleta", "pasaporte", "visa", "mapa", "guía", "aventura",
    "cine", "película", "director", "actor", "actriz", "guion", "escena", "cámara", "sonido", "iluminación",
    "música", "instrumento", "guitarra", "piano", "batería", "violín", "flauta", "trompeta", "bajo", "saxofón",
    "canción", "álbum", "concierto", "festival", "banda", "grupo", "solista", "compositor", "letra", "melodía",
    "poesía", "rima", "verso", "estrofa", "novela", "cuento", "ensayo", "obra", "autor", "editorial",
    "arte", "cuadro", "pintor", "escultor", "técnica", "color", "forma", "textura", "diseño", "estilo",
    "año", "abeja", "abajo", "abierto", "acabar", "acerca", "adelante", "agitar", "agua", "aire", "alivio",
    "amor", "andar", "animal", "aprecio", "arco", "asesino", "asunto", "atención", "autor", "ayuda", "bajo",
    "balón", "barco", "básico", "bello", "broma", "bueno", "café", "calor", "cambio", "camino", "cantar",
    "cerca", "cielo", "clima", "color", "comer", "correr", "cultura", "dado", "deber", "decir", "dedo", "dentro",
    "despacho", "difícil", "doctor", "dolor", "economía", "educar", "elección", "enfermo", "entender", "estación",
    "familia", "feliz", "festejar", "flor", "futuro", "ganar", "gente", "grande", "guitar", "hacia", "hacer",
    "hermano", "hombre", "hotel", "huevo", "jugar", "largo", "leche", "leer", "luna", "maestro", "malo", "mamá",
    "mayo", "mesa", "miembro", "mujer", "móvil", "navegar", "noche", "nombre", "ocurrir", "ofrecer", "olvidar",
    "opinar", "perdón", "plaza", "pluma", "probar", "puente", "quien", "rato", "rojo", "saber", "salir", "tallo","luz",
    "aproximacion","mueble","piel","gusto","salon","mirada","suspiro","paper","crowd","ninja","martillo", "destornillador", "alicate",
     "cinta", "sierras", "nivel", "taladro", "llave", "cutter", "cepillo", "pico", "pala", "sierra", "tijeras", "pinza", "escarpelo", "soldador", "compás", "garlopa", "machete", "raspador",
  "brocha", "lima", "esmeril", "andamio", "tijera", "carretilla", "regla", "masilla", "paleta", "medidor",
  "cepillo", "gato", "tren", "hoja", "tenazas", "aguja", "gafas", "aspiradora", "linterna", "medidor", "guitarra", 
  "grúa", "nivelador", "pulidora", "caladora", "bombín", "pulidora", "manguito", "perno", "puente", "martinete",
  "hacha", "sargento", "presilla", "fuercometro", "calibre", "métrica", "carro", "colador", "manguera",

];
  
  
  export const generateAlias = () =>{
    
    let aliasArr = [];
    let word_count = Math.ceil(Math.random()*4) + 3;
    
    for(let i = 0; i < word_count; i++){
        let idx:number = Math.round(Math.random()*(palabras.length - 1));
        aliasArr.push(palabras[idx]);
    }

    let alias:string ='';
    for(let i = 0; i < aliasArr.length; i++){

        if(i == (aliasArr.length - 1)){
            alias += aliasArr[i];
            continue;
        }

        alias+=  aliasArr[i] + '.';

    }
    return alias;
  }
  
  