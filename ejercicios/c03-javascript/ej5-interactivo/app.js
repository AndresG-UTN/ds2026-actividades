const boton = document.querySelector(`.boton`);
const input = document.querySelector(`.numero`);
const resultado = document.querySelector(`.arbol`);
const error = document.querySelector(`.error`);

boton.addEventListener(`click`, () => {

    let altura = input.value;
    if(altura<1){
        error.innerHTML=`<p>${"resultado invalido"}</p>`
    }
    let arbol="";
    for(let i=1 ; i<=altura ; i++){
        arbol+="*".repeat(i)+"\n";
    }
     resultado.innerHTML=arbol;

});