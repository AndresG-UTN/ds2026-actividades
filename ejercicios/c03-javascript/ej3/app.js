function CalcularPrecioFinal(Monto, Mediopago){

    if(Monto<200) 
        return Monto
    if(Monto<400 && Monto>=200)
           switch(Mediopago){
        case "E": return Monto*0.70;
        case "D": return Monto*0.80;
        case "C": return Monto*0.90;
        case "e": return Monto*0.70;
        case "d": return Monto*0.80;
        case "c": return Monto*0.90;
        default: return "medio de pago no valido"
    }
    if(Monto>=400){
        return Monto*0.60;
    }

}
// en esta parte no entiendo la consigna,porque mostrar en template literals a monto y medio de pago si los estoy pasasndo como parametros desde la consola?
// tampoco se me ocurre como hacerlo, creo variables para guardarlos?
// tambien podria hacer que la funcion devuelva un array e imprimirlos en pantalla
console.log(`${CalcularPrecioFinal(340, "E")}`);
console.log(`${CalcularPrecioFinal(200, "D")}`);
console.log(`${CalcularPrecioFinal(5, "C")}`);
console.log(`${CalcularPrecioFinal(1000, "e")}`);
console.log(`${CalcularPrecioFinal(300, "d")}`);
console.log(`${CalcularPrecioFinal(190, "c")}`);
console.log(`${CalcularPrecioFinal(400, "e")}`);


