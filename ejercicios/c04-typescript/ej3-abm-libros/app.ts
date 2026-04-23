const filtrar = document.querySelector(`#filtrar`) as HTMLButtonElement;
const mostrarDisp = document.querySelector(`#mostrarDisponibles`)as HTMLButtonElement;
const mostrarTodos = document.querySelector(`#mostrarTodos`) as HTMLButtonElement;
const listado = document.querySelector(`#listado`) as HTMLElement;
const stats = document.querySelector(`#stats`) as HTMLElement;
const input = document.querySelector(`#filtroAutor`) as HTMLInputElement;

const agregar = document.querySelector(`#agregar`)as HTMLButtonElement;
const nuevoTitulo = document.querySelector(`#titulo`)as HTMLInputElement;
const nuevoAutor = document.querySelector(`#autor`)as HTMLInputElement;
const nuevoprecio = document.querySelector(`#precio`)as HTMLInputElement;
const nuevodisp = document.querySelector(`#disponibles`)as HTMLInputElement;
const nuevogenero = document.querySelector(`#genero`)as HTMLInputElement;
const errorFormulario = document.querySelector(`#errorFormulario`) as HTMLElement;

interface Libros{
    isbn:string;
    titulo:string;
    autor:string;
    precio:number;
    disponible: boolean;
    genero?: string;
}

let catalogo: Libros[] = [
    { isbn: "0001", titulo: "cocina 1", autor: "theIndieStone", genero: "accion", precio: 600, disponible: false },
    { isbn: "3485", titulo: "carpinteria 2", autor: "theIndie", genero: "", precio: 100, disponible: true },
    { isbn: "0123", titulo: "mecanica 2", autor: "Stone", genero: "misterio", precio: 1000, disponible: true },
];

const buscarPorAutor=(autor:string) :Libros[] =>{

    let resul:Libros[]=[];
    for (let i of catalogo){
        if(i.autor===autor){
            resul.push(i);
        }
    }
    return resul;
}

const Ldisp=(): Libros[] =>{

    let resul:Libros[]=[];
    for(let l of catalogo){
        if(l.disponible===true){
            resul.push(l);
        }
    }
    return resul;
}

const actualizarStats = (libro:Libros[])=>{

    const cantidad : number = libro.length;
    const prom : number=precioPromedio(libro);
    stats.textContent=`cantidad de libros: ${cantidad} | promedio:${prom.toFixed(2)}`;
}

const precioPromedio=(libro:Libros[]):number=>{
    let suma:number=0;
    for(let l of libro){
        suma+=l.precio;
    }
    return suma/libro.length;
}

const renderizar =(libro: Libros[]): void=>{
    listado.textContent="";
    for(let l of libro){
        const li=document.createElement(`li`);
        const eliminar=document.createElement("button")as HTMLButtonElement;
        eliminar.textContent=`eliminar`
        eliminar.id=l.isbn;
        li.textContent=`isbn: ${l.isbn} | titulo: ${l.titulo} | autor: ${l.autor} | genero: ${l.genero} | precio: ${l.precio} | disp: ${l.disponible} `;

        listado.appendChild(li);
        listado.appendChild(eliminar);

        eliminar.addEventListener(`click`, () =>{
            eliminarLibro(eliminar.id);
        });
    }
    actualizarStats(libro);
}

const eliminarLibro=(id :string)=>{

    catalogo=catalogo.filter(l=> l.isbn !== id);
    renderizar(catalogo);

}

const validarFormulario = () : Libros | null =>{

    if(nuevoTitulo.value !== "" && nuevoAutor.value !== "" && nuevoprecio.value !== "" && nuevodisp.value !== "" && (nuevodisp.value.toLowerCase() === "true" || nuevodisp.value.toLowerCase() === "false")){ 

        let nuevoIsbn : string = "AUTO_"+ Date.now();
        let nuevoLibro: Libros={
            isbn: nuevoIsbn, 
            titulo: nuevoTitulo.value, 
            autor: nuevoAutor.value, 
            precio: Number(nuevoprecio.value), 
            disponible: nuevodisp.value.toLowerCase() === "true", 
            genero: nuevogenero.value
        };
        nuevoTitulo.value="";
        nuevoAutor.value="";
        nuevoprecio.value="";
        nuevodisp.value="";
        return nuevoLibro;
    }else {

        return null;
    }
}

const agregarLibro=(libro: Libros | null):void=>{
    if(libro===null){
        errorFormulario.textContent="alguno de los campos es invalido"
    }else{
        catalogo.push(libro);
    }
}

mostrarDisp.addEventListener(`click`, () => {
    
    renderizar(Ldisp());

});

agregar.addEventListener(`click`, ()=>{
    errorFormulario.textContent="";
    agregarLibro(validarFormulario());

});

mostrarTodos.addEventListener(`click`, () =>{
    
    renderizar(catalogo);
    
});

filtrar.addEventListener (`click`, () =>{
    
    const autor: string=String(input.value); //aca se podria agragar la comprobacion de si el parametro esta vacio 
    const busqueda=buscarPorAutor(autor); // y aca se podria sumar una comprobacion de si existe el autor(hay libros de el en el catalogo) con un mensaje de error 
    renderizar(busqueda);
        

});

