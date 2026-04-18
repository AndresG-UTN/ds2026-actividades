const Clasificarnota = (nota)=>{

    if (nota<4) return "desaprobado";
    if(nota>3 && nota<8) return "aprobado";
    if(nota>=8 && nota<11) return "promocionado";
    else return "la nota debe ser menor o igual que 10";

}

const Diadelasemana=(numero)=>{
    
    switch(numero){
    
        case 1: return "lunes";
        case 2: return "martes";
        case 3: return "miercoles";
        case 4: return "jueves";
        case 5: return "viernes";
        case 6: return "fin de semana";
        case 7: return "fin de semana";
        default: return "dia invalido";

    }

}

console.log(`Dia de la semana: ${Diadelasemana(24)}`);
console.log(`nota: ${Clasificarnota(11)}`);
console.log(`Dia de la semana: ${Diadelasemana(1)}`);
console.log(`nota: ${Clasificarnota(5)}`);
console.log(`Dia de la semana: ${Diadelasemana(3)}`);
console.log(`nota: ${Clasificarnota(8)}`);
console.log(`Dia de la semana: ${Diadelasemana(7)}`);
console.log(`nota: ${Clasificarnota(1)}`);
