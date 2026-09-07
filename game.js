const canvas = document.getElementById("tablero");
const ctx = canvas.getContext("2d");

const puntosElemento = document.getElementById("puntos");

const tamanoCasilla = 20;
const casillasPorLado = canvas.width / tamanoCasilla;

let culebra = [
    { x: 10, y: 10 }
];

let direccionX = 1;
let direccionY = 0;

let comida = generarComida();
let puntos = 0;


// ==========================================
// GENERAR COMIDA
// ==========================================

function generarComida() {

    return {
        x: Math.floor(Math.random() * casillasPorLado),
        y: Math.floor(Math.random() * casillasPorLado)
    };

}


// ==========================================
// CONTROL DEL TECLADO
// ==========================================

document.addEventListener("keydown", moverCulebra);

function moverCulebra(evento) {

    switch (evento.key) {

        case "ArrowUp":

            if (direccionY === 1) {
                break;
            }

            direccionX = 0;
            direccionY = -1;

            break;


        case "ArrowDown":

            if (direccionY === -1) {
                break;
            }

            direccionX = 0;
            direccionY = 1;

            break;


        case "ArrowLeft":

            if (direccionX === 1) {
                break;
            }

            direccionX = -1;
            direccionY = 0;

            break;


        case "ArrowRight":

            if (direccionX === -1) {
                break;
            }

            direccionX = 1;
            direccionY = 0;

            break;
    }
}


// ==========================================
// ACTUALIZAR JUEGO
// ==========================================

function actualizarJuego() {

    const cabeza = {
        x: culebra[0].x + direccionX,
        y: culebra[0].y + direccionY
    };


    // Chocar contra los bordes

    if (
        cabeza.x < 0 ||
        cabeza.y < 0 ||
        cabeza.x >= casillasPorLado ||
        cabeza.y >= casillasPorLado
    ) {

        terminarJuego();

        return;
    }


    // Chocar contra el propio cuerpo

    for (let i = 0; i < culebra.length; i++) {

        if (
            culebra[i].x === cabeza.x &&
            culebra[i].y === cabeza.y
        ) {

            terminarJuego();

            return;
        }
    }


    // Agregar cabeza

    culebra.unshift(cabeza);


    // Comprobar comida

    const comioComida =
        cabeza.x === comida.x &&
        cabeza.y === comida.y;


    if (comioComida) {

        puntos++;

        puntosElemento.textContent = puntos;

        comida = generarComida();

    } else {

        culebra.pop();

    }


    dibujarJuego();
}


// ==========================================
// DIBUJAR JUEGO
// ==========================================

function dibujarJuego() {

    // Limpiar tablero

    ctx.fillStyle = "#000";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Dibujar culebra

    ctx.fillStyle = "#4caf50";

    culebra.forEach(function(segmento) {

        ctx.fillRect(
            segmento.x * tamanoCasilla,
            segmento.y * tamanoCasilla,
            tamanoCasilla - 2,
            tamanoCasilla - 2
        );

    });


    // Dibujar comida

    ctx.fillStyle = "#ff5252";

    ctx.fillRect(
        comida.x * tamanoCasilla,
        comida.y * tamanoCasilla,
        tamanoCasilla - 2,
        tamanoCasilla - 2
    );
}


// ==========================================
// GAME OVER
// ==========================================

function terminarJuego() {

    clearInterval(intervaloJuego);

    document.getElementById("puntosFinales").textContent = puntos;

    document.getElementById("gameOver").style.display = "block";
}


// ==========================================
// INICIAR JUEGO
// ==========================================

let intervaloJuego = setInterval(
    actualizarJuego,
    150
);


// ==========================================
// BOTÓN REINICIAR
// ==========================================

document.getElementById("reiniciar").addEventListener(
    "click",
    reiniciarJuego
);


function reiniciarJuego() {

    culebra = [
        { x: 10, y: 10 }
    ];

    direccionX = 1;
    direccionY = 0;

    puntos = 0;

    puntosElemento.textContent = puntos;

    comida = generarComida();

    document.getElementById("gameOver").style.display = "none";


    intervaloJuego = setInterval(
        actualizarJuego,
        150
    );


    dibujarJuego();
}


// ==========================================
// DIBUJAR ESTADO INICIAL
// ==========================================

dibujarJuego();