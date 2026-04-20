"use strict";
const boton = document.querySelector(`.boton`);
const input = document.querySelector(`.numero`);
const resultado = document.querySelector(`.arbol`);
const error = document.querySelector(`.error`);
boton.addEventListener(`click`, () => {
    let altura = String(input.value);
    if (altura < 1) {
        error.innerHTML = `<p>${"resultado invalido"}</p>`;
    }
    let arbol = "";
    let renglon = "";
    for (let i = 1; i <= altura; i++) {
        renglon += "*";
        arbol += renglon + "\n";
    }
    resultado.innerHTML = arbol;
});
