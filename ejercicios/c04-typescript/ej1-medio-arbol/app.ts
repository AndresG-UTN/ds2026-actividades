const boton = document.querySelector(`.boton`) as HTMLButtonElement;
const input = document.querySelector(`.numero`)as HTMLInputElement;
const resultado = document.querySelector(`.arbol`)as HTMLElement;
const error = document.querySelector(`.error`)as HTMLElement;

boton.addEventListener(`click`, () => {

    let altura: number = Number(input.value);
    if(altura<1){
        error.innerHTML=`<p>${"resultado invalido"}</p>`
    }
    let arbol: string ="";
    let renglon: string="";
    for(let i=1 ; i<=altura ; i++){
        renglon+="*"
        arbol+=renglon +"\n";
    }
     resultado.innerHTML=arbol;

});