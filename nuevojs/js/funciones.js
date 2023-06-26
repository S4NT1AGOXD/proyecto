const url = 'http://localhost:8082/api/usuarios'
const listarDatos = async() => {
    let respuesta = ''
    let body = document.getElementById('contenido')
    //url: Es la url de la api.
    //Al deslpegarla en el servidor colocar la api del servidor
        fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
    .then(function(data) {
        let listaUsuarios = data.usuarios //Capturar el array devuelto por la api
        datos = 
        listaUsuarios.map(function(usuario) {//Recorrer el array
            respuesta += `<tr><td>${usuario.nombre}</td>`+
            `<td>${usuario.rol}</td>`+
            `<td>${usuario.estado}</td>`+
            `<td><a class="waves-effect waves-light btn modal-trigger" href="#modal1" onclick='editar(${JSON.stringify(usuario)})' >Editar</a> 
            <a class="waves-effect waves-light btn modal-danger deep-orange darken-4" href='#' onclick='eliminar("${usuario._id}")'>Eliminar</a></td>`+
            `</tr>`
            body.innerHTML = respuesta
        })
    })

}


const registrar = async()=>{
    let _nombre = document.getElementById('nombre').value
    let _pass = document.getElementById('pass').value
    let _confirmPass = document.getElementById('confirmPass').value
    let _rol = document.getElementById('rol').value
    let _estado = document.getElementById('estado').value
     if((_pass.length>0 && _confirmPass.length>0) && (_pass == _confirmPass)){
        let usuario = {
            nombre:_nombre,
            password:_pass,
            rol:_rol,
            estado:_estado
        }

        fetch(url,  {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(usuario),//Convertir el objeto _usuario  a un JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
        .then(json => {
            //alert(json.msg)//Mensaje que retorna la API
            console.log(json)
            if(json.msg){
                Swal.fire(
                    json.msg,
                    '',
                    'success'
                )
            }
        })
    }
    else{
        //alert('El password y la confirmación del password no coinciden. Favor corregir.')
        Swal.fire(
            'El password y la confirmación del password no coinciden. Favor corregir.',
            '',
            'error'
          )
    }
}

const editar= (usuario)=>{
    document.getElementById('nombre').value = ''
    document.getElementById('pass').value = ''
    document.getElementById('rol').value = ''
    document.getElementById('estado').value = ''

    document.getElementById('nombre').value = usuario.nombre
    document.getElementById('pass').value = usuario.pass
    document.getElementById('rol').value = usuario.rol
    document.getElementById('estado').value = usuario.estado
}

const actualizar = async()=>{
    let _nombre = document.getElementById('nombre').value
    let _pass = document.getElementById('pass').value
    let _confirmPass = document.getElementById('confirmPass').value
    let _rol = document.getElementById('rol').value
    let _estado = document.getElementById('estado').value
     if((_pass.length>0 && _confirmPass.length>0) && (_pass == _confirmPass)){
        let usuario = {
            nombre:_nombre,
            password:_pass,
            rol:_rol,
            estado:_estado
        }

        fetch(url,  {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(usuario),//Convertir el objeto _usuario  a un JSON
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
        .then(json => {
            alert(json.msg)//Mensaje que retorna la API
        })
    }
    else{
        alert('El password y la confirmación del password no coinciden. Favor corregir.')
    }
}

const eliminar = (id) =>{
    if(confirm('¿Está seguro de realizar la eliminación') == true){

           let usuario = {
                _id: id
            }
           fetch(url,  {
                method: 'DELETE',
                mode: 'cors',
                body: JSON.stringify(usuario),//Convertir el objeto _usuario  a un JSON
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then((resp) => resp.json()) //Obtener la respuesta y convertirla a json
            .then(json => {
                alert(json.msg)//Mensaje que retorna la API
            }) 
    }
}

if(document.querySelector('#btnRegistrar')){
    document.querySelector('#btnRegistrar')
    .addEventListener('click',registrar)
}

if(document.querySelector('#btnActualizar')){
    document.querySelector('#btnActualizar')
.addEventListener('click',actualizar)
}

