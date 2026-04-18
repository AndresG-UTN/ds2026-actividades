const producto = document.querySelector(`.producto`);
const boton = document.querySelector(`.agregar`);
const lista = document.querySelector(`.lista`);
const error =document.querySelector(`.error`);
const contador=document.querySelector(`.contador`);
let cantidad=0;

boton.addEventListener(`click`, () => {
    let prod=producto.value;

    if(prod === ""){
        error.innerHTML="el campo de producto no puede estar vacio"
         return;
    }
    error.innerHTML="";

    lista.innerHTML+=`<li> 
        ${prod} 
        <button onclick="eliminar(this)">elimiar</button>
        </li>`;

    cantidad++;
    contador.innerHTML=cantidad +"productos en lista"
    input.value ="";
});

const eliminar = (boton) =>{
    boton.parentElement.remove();
    cantidad--;
    contador.innerHTML = cantidad + " productos en lista"
}