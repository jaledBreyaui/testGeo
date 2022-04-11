"use strict"

let pregunta = [
    {
        preg: "¿Qué año es?",
        a: "2021",
        b: "2022",
        c: "2033",
        sol: "b",
    },

    {
        preg: "¿Que país es el más grande Sudamerica?",
        a: "Brasil",
        b: "Argentina",
        c: "México",
        sol: "a",
    },
    {
        preg: "¿Cuál es la capital de Suecia?",
        a: "Estocolmo",
        b: "Copenhage",
        c: "Helsinky",
        sol: "a",
    },
    {
        preg: "¿En qué pais se encuentra la ciudad de Séul?",
        a: "Tailandia",
        b: "Japón",
        c: "Corea del Sur",
        sol: "c",
    },
    {
        preg: "¿En qué país se encuentra el rio Rhin?",
        a: "Alemania",
        b: "Suiza",
        c: "Francia",
        sol: "a",
    },
    {
        preg: "¿A qué latitud se encuentra el trópico de Capricornio?",
        a: "23° N",
        b: "0°",
        c: "23° S",
        sol: "c",
    },
    {
        preg: "¿Cuál es el monte mas alto de Sudamerica?",
        a: "Roraima",
        b: "Simón Bolivar",
        c: "Aconcagua",
        sol: "c",
    },
    {
        preg: "¿Cuántos paises tiene Latinoamerica?",
        a: "23",
        b: "20",
        c: "17",
        sol: "b",
    },
    {
        preg: "¿Qué pais es el principal productor de caucho?",
        a: "Colombia",
        b: "Tailandia",
        c: "Brasil",
        sol: "b",
    },
    {
        preg: "¿Qué pais es el principal exportador de gas?",
        a: "China",
        b: "EE.UU",
        c: "Rusia",
        sol: "c",
    },
];


const inputA = document.querySelector(".p1");
const inputB = document.querySelector(".p2");
const inputC = document.querySelector(".p3");
const encabezado = document.querySelector(".pregunta")
const boton = document.getElementById("pregunta-btn");
const botonInicio = document.getElementById("btn");
const baseURL = 'https://api.sampleapis.com/rickandmorty/characters';


let respuestas = [];
let solucion = [];
let preguntaNro = 0;
let correctas = 0;
let incorrectas = 0;
let highscore = localStorage.getItem("highscore");
document.querySelector(".hs").textContent = highscore;

let padreImg = document.createElement("div");
let imagen = document.createElement("img");
let frase = document.createElement("h2");
let personaje =
    padreImg.setAttribute("class", "padreImg");
imagen.setAttribute("class", "animate__animated animate__backInRight");
frase.setAttribute("class", "animate__animated animate__backInRight");

for (let i = 0; i < pregunta.length; i++) {
    solucion.push(pregunta[i].sol)
};

let tomarValor = function () {
    let radio = document.querySelectorAll("input[name=hola]:checked")[0].value;
    respuestas.push(radio);
};

let sigPregunta = function () {
    inputA.textContent = pregunta[preguntaNro].a;
    inputB.textContent = pregunta[preguntaNro].b;
    inputC.textContent = pregunta[preguntaNro].c;
    encabezado.textContent = pregunta[preguntaNro].preg;
};

let resultado = function () {
    for (let y = 0; y < solucion.length; y++) {
        if (respuestas[y] === solucion[y])
            correctas++;
        else if (respuestas[y] !== solucion[y])
            incorrectas++;
    }
};

let endGame = function () {
    boton.classList.add("hidden");
    document.querySelector(".opciones-hijo").classList.add("hidden")
    let verificacion = document.createElement("h2");
    verificacion.setAttribute("class", "verificacion");
    verificacion.textContent = "Corrigiendo...";
    document.querySelector(".opciones").appendChild(verificacion);
    document.querySelector(".overlay").classList.toggle("hidden");
    setTimeout(() => {
        document.querySelector(".titulo").textContent = `Tu resultado: ${correctas}/${incorrectas + correctas}`;
    }, 1000);
};

let appender = function () {
    document.querySelector(".verificacion").classList.add("hidden");
    document.querySelector(".opciones").appendChild(padreImg);
    padreImg.appendChild(frase);
    padreImg.appendChild(imagen);
};

let puntaje = function (data) {
    setTimeout(() => {
        appender();
        if (correctas >= 8) {
            imagen.src = `${data[0].image}`;
            frase.textContent = (`Tu personaje Rick&Morty es  ${data[0].name}`);
        } else if (correctas < 8 && correctas >= 6) {
            imagen.src = `${data[2].image}`;
            frase.textContent = (`Tu personaje Rick&Morty es  ${data[2].name}`);
        } else if (correctas <= 5 && correctas >= 3) {
            imagen.src = `${data[1].image}`;
            frase.textContent = (`Tu personaje Rick&Morty es  ${data[1].name}`);
        } else if (correctas <= 2) {
            imagen.src = `${data[4].image}`;
            frase.textContent = (`Tu personaje Rick&Morty es  ${data[4].name}`);
        };
    }, 1000);
};

let tuPersonaje = function () {
    fetch(baseURL)
        .then(resp => resp.json())
        .then(data => { puntaje(data) })
        .catch(() => {
            appender();
            frase.textContent = (`Nuestros servidores se encuentran caidos. Intentá de nuevo en un rato para conocer tu personaje Rick&Morty`)
            imagen.src = "./assets/flatten.jpg"
        })
};

let setHighScore = function () {
    if (correctas > highscore) {
        highscore = correctas;
        localStorage.setItem("highscore", highscore);
        document.querySelector(".hs").textContent = highscore;
    }
};

let toast = function () {
    Toastify({
        text: "Seleccioná una opción",
        duration: 2000,
    }).showToast();
}

botonInicio.addEventListener("click", () => {
    document.querySelector(".opciones").classList.toggle("hidden");
    document.querySelector(".overlay").classList.toggle("hidden");
    document.querySelector("#btn").classList.toggle("hidden");
    sigPregunta();
})

boton.addEventListener("click", () => {
    if (document.querySelectorAll("input[name=hola]:checked").length > 0) {
        tomarValor()
        if (preguntaNro >= pregunta.length - 1) {
            endGame();
            resultado();
            tuPersonaje();
            setHighScore();

        } else {
            preguntaNro++;
            sigPregunta();
        }

    } else {
        toast();
    }
});



