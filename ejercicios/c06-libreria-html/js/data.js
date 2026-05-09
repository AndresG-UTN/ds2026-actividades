"use strict";
const btn = document.querySelector(`#BTNbuscar`);
const input = document.querySelector(`#buscar`);
const resultado = document.querySelector(`#libros`);
const errorMSJ = document.querySelector(`#error`);
const cargando = document.querySelector(`#cargando`);
btn.addEventListener(`click`, async (e) => {
    e.preventDefault();
    errorMSJ.style.display = `none`;
    resultado.innerHTML = ``;
    const busqueda = input.value.trim();
    if (busqueda === '') {
        errorMSJ.textContent = `es obligatorio ingresar un valor de busqueda`;
        errorMSJ.style.display = `block`;
        return;
    }
    try {
        cargando.style.display = `block`;
        const resul = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(busqueda)}`);
        if (!resul.ok) {
            throw new Error(`error de conexion con la libreria`);
        }
        const data = await resul.json();
        cargando.style.display = `none`;
        const libros = data.docs.slice(0, 10);
        if (libros.length === 0) {
            errorMSJ.textContent = `no hay resultados`;
            errorMSJ.style.display = `block`;
            return;
        }
        libros.forEach(({ title, author_name, cover_i }) => {
            const Tarjeta = document.createElement(`div`);
            const autor = author_name ? author_name.join(`, `) : `autor no encontrado`;
            const urlImagen = cover_i ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg` : 'https://via.placeholder.com/200x300?text=Sin+Portada';
            Tarjeta.style.minWidth = "250px";
            Tarjeta.style.maxWidth = "250px";
            Tarjeta.innerHTML = `
                    <div class="card h-100 shadow-sm border-0">
                        <img src="${urlImagen}" class="card-img-top" alt="..." style="height: 250px; object-fit: cover;">
                    
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text text-muted">${autor}</p>
                    
                            <a href="#" class="btn btn-primary mt-auto">Ver más</a>
                        </div>
                    </div>
            `;
            resultado.appendChild(Tarjeta);
        });
    }
    catch (error) {
        cargando.style.display = `none`;
        errorMSJ.textContent = `ocurrio un error durante la busqueda`;
        errorMSJ.style.display = `block`;
        console.error(error);
    }
});
