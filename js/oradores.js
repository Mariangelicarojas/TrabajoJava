//variables
let oradorId;
let oradores = [];
let oradorActual;

//Ingreso orador, identificación
const setId = (id) => {
    oradorId = id;
    const orador = oradores.find(o => o.id === id);
    oradorActual = orador;

    document.getElementById('nombreActualizar').value = oradorActual.nombre;
    document.getElementById('apellidoActualizar').value = oradorActual.apellido;
    document.getElementById('mailActualizar').value = oradorActual.mail;
    document.getElementById('temaActualizar').value = oradorActual.tema;
}

//Set oradores (nuevo)
const setOradores = (nuevosOradores) => {
    oradores = nuevosOradores;
}

//Actualizacion de Orador.
const actualizarOrador = () => {
    if (!oradorActual) {
        return;
    }
    const nombre = document.getElementById('nombreActualizar').value;
    const apellido = document.getElementById('apellidoActualizar').value;
    const mail = document.getElementById('mailActualizar').value;
    const tema = document.getElementById('temaActualizar').value;

    const orador = {
        id: oradorActual.id,
        nombre,
        apellido,
        mail,
        tema
    };

    //POST al servidor
    //1 preparo la peticion
    const respuesta = fetch(`http://localhost:8080/web-app/api/orador`, {
        method: 'PUT',
        body: JSON.stringify(orador)
    });

    //2 intento reosolver la promesa
    respuesta
        .then(response => response.json())
        .then(respuesta => {
            //actualizar el div del html con la informacion
            listarOradores();
            alert(`Se ha dado de actualizado el orador id: ${respuesta.id}`);
            $('#exampleModal').modal('hide');

        })
        .catch(error => console.log(error))

        
    
}

//Eliminar Orador
const eliminarOrador = (id) => {
    const respuesta = fetch(`http://localhost:8080/web-app/api/orador?id=${id}`, {
        method: 'DELETE'
    });

    //2 intento reosolver la promesa
    respuesta
        .then(response => response)
        .then(respuesta => {
            //actualizar el div del html con la informacion
            alert(`Se ha eliminado el orador id: ${id}`);
            listarOradores();
        })
        .catch(error => console.log(error))
        
}

//Nuevo Orador
const nuevoOrador = () => {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const mail = document.getElementById('mail').value;
    const tema = document.getElementById('tema').value;

    const orador = {
        nombre,
        apellido,
        mail,
        tema
    };

    //post al servidor
    //1 preparo la peticion
    const respuesta = fetch('http://localhost:8080/web-app/api/orador', {
        method: 'POST',
        body: JSON.stringify(orador)
    });

    //2 intento reosolver la promesa
    respuesta
        .then(response => response.json())
        .then(respuesta => {
            //actualizar el div del html con la informacion
            alert(`Se ha dado de alta el orador id: ${respuesta.id}`);
            listarOradores();
        })
        .catch(error => console.log(error))
}

//Lista de Oradores
function listarOradores() {
    const tabla = document.getElementById('tablaOradores');

    if (tabla.style.display === 'none') {
        // Si la tabla está oculta, mostrarla y realizar la carga de datos
        tabla.style.display = 'block';

        // 1. Preparar la petición
        const respuesta = fetch('http://localhost:8080/web-app/api/orador', { method: 'GET' });

        // 2. Intentar resolver la promesa
        respuesta
            .then(response => response.json())
            .then(oradores => {
                setOradores(oradores);

                if (oradores.length > 0) {
                    // Mostrar la tabla solo si hay datos
                    dibujarTabla(oradores);
                } else {
                    // Ocultar la tabla si no hay datos
                    tabla.style.display = 'none';
                }
            })
            .catch(error => console.log(error));
    } else {
        // Si la tabla está visible, ocultarla
        tabla.style.display = 'none';
    }
}

//Dibujar Tabla
function dibujarTabla(data) {
    const rows = dibujarFilas(data);
    document.getElementById('usersRows').innerHTML = rows;
}

//Dibujar Filas
function dibujarFilas(oradores) {
    let rows = ``;
    for (let orador of oradores) {//ctrl+d ctr+f2
        //console.log(user)
        rows += `
        <tr>
            <th scope="row">${orador.id}</th>
            <td>${orador.nombre}</td>
            <td>${orador.apellido}</td>
            <td>${orador.tema}</td>
            <td>${orador.mail}</td>
            <td>
            <div class="d-flex justify-content-center">
                <button class="btn btn-dark" onClick="eliminarOrador(${orador.id})">Eliminar</button>                
                <button type="button" class="btn btn-dark" style="background-color: rgb(151, 201, 62)" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick="setId(${orador.id})">
                    Editar
                </button>
                </div>
            </td>
        </tr>
        `
    }
    return rows;
}

//Actualización de la lista de oradores
document.getElementById('btnListado').addEventListener('click', function () {
    listarOradores();
});
document.getElementById('btnGrabar').addEventListener('click', nuevoOrador);


