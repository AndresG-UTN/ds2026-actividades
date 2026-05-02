"use strict";
async function obtenerUsuarios() {
    try {
        const respuesta = await fetch(`https://jsonplaceholder.typicode.com/users`);
        if (!respuesta.ok) {
            throw new Error(`HTTP ${respuesta.status}`);
        }
        const usuarios = await respuesta.json();
        return usuarios;
    }
    catch (error) {
        console.error(`hubo un error durante la ejecucion`, error);
        throw error;
    }
}
async function iniciar() {
    const cargandoU = document.querySelector(`#cargandoU`);
    const errorDisplay = document.querySelector(`#error`);
    const lista = document.querySelector(`#lista`);
    if (!cargandoU || !errorDisplay || !lista) {
        return;
    }
    try {
        const listaUsuarios = await obtenerUsuarios();
        cargandoU.style.display = `none`;
        listaUsuarios.forEach(user => {
            const li = document.createElement(`li`);
            li.textContent = `Nombre: ${user.name} -email: ${user.email}`;
            lista.appendChild(li);
        });
    }
    catch (error) {
        cargandoU.style.display = `none`;
        errorDisplay.style.display = `block`;
    }
}
iniciar();
