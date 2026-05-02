interface Usuario{
    id : number;
    name:string;
    email:string;
    phone:string;
}

async function obtenerUsuarios() : Promise<Usuario[]> {
   try{
    const respuesta =
        await fetch(`https://jsonplaceholder.typicode.com/users`);
    if (!respuesta.ok){
        throw new Error(`HTTP ${respuesta.status}`);
    }
    const usuarios: Usuario[] = await respuesta.json();
    return usuarios;
    }catch(error){
        console.error(`hubo un error durante la ejecucion`, error);
        return [];
    }
}

async function iniciar(){
    const listaUsuarios = await obtenerUsuarios();

    listaUsuarios.forEach(user => {
        console.log(`Nombre: ${user.name} -email: ${user.email}`);
    });
}

iniciar();