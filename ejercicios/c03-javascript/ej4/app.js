const Array=[1,2,3,4,5,6,7,8];
let suma=0;
let promedio=0;
let may=Array[0];
let men=Array[0];
for(const num of Array){
    suma=suma+num;
    promedio=suma/Array.length;
    if(may<num){
        may=num;
    }
    if(men>num){
        men=num;
    }
}

console.log(`suma: ${suma} | promedio: ${promedio} | mayor: ${may} | menor: ${men}`);

function generarAsteriscos(n){
    let x="";
    for(let i = 0 ; i<n ; i++){
        x= x + "*";
    }
    return x;
}

console.log(`asteriscos: ${generarAsteriscos(1)}`);