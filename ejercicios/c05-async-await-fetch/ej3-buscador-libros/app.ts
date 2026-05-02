const btn = document.querySelector(`#BTNbuscar`)as HTMLButtonElement;
const input = document.querySelector(`#buscar`)as HTMLInputElement;
const resultado = document.querySelector(`#resultados`)as HTMLDivElement;
const errorMSJ = document.querySelector(`#error`)as HTMLParagraphElement;
const cargando = document.querySelector(`#cargando`)as HTMLParagraphElement;

interface LibroOL{
    title : string;
    author_name? :string[];
    first_publish_year?:string;
}
interface RespuestaOL{
    docs: LibroOL[];
}
btn.addEventListener(`click`, async()=>{

    errorMSJ.style.display=`none`;
    resultado.innerHTML=``;
    
    const busqueda = input.value.trim();

    if(busqueda===''){
        errorMSJ.textContent=`es obligatorio ingresar un valor de busqueda`;
        errorMSJ.style.display=`block`;
        return
    }

    try{
        cargando.style.display= `block`;

        const resul = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(busqueda)}`)
        if(!resul.ok){
            throw new Error(`error de conexion con la libreria`);
        }
        const data: RespuestaOL=await resul.json();
        cargando.style.display=`none`;
        const libros = data.docs.slice(0, 10);
        if(libros.length === 0){
            errorMSJ.textContent = `no hay resultados`;
            errorMSJ.style.display=`block`;
            return;
        }

        libros.forEach(({title, author_name, first_publish_year})=>{

            const Tarjeta = document.createElement(`div`);
            const autor=author_name ? author_name.join(`, `) : `autor no encontrado`;
            const fecha=first_publish_year ? first_publish_year : `fecha desconocida`;

            Tarjeta.innerHTML = `
                <h3>${title}</h3>
                <p>autor:${autor}</p>
                <p>Año de publicación: ${fecha}</p>
            
            `;
            resultado.appendChild(Tarjeta);


        })
        
    }catch(error){
        cargando.style.display=`none`;
        errorMSJ.textContent=`ocurrio un error durante la busqueda`;
        errorMSJ.style.display=`block`;
        console.error(error);
    }
});
