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
        return [];
    }
}
async function iniciar() {
    const listaUsuarios = await obtenerUsuarios();
    listaUsuarios.forEach(user => {
        console.log(`Nombre: ${user.name} -email: ${user.email}`);
    });
}
iniciar();
