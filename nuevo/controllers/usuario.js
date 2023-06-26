//Importar paquetes requeridos de Node
const {response} = require('express')

//Importación de los modelos
const Usuario = require('../models/usuario')

//Consultar
const usuarioGet = async(req, res = response) =>{
    const {nombre} = req.query //Desestructuración

    //Consultar todos los usuarios
    const usuarios = await Usuario.find()
    res.json({
        usuarios
    })   
}

//Registrar
const usuarioPost = async (req, res) => {
    const body = req.body; // Captura de atributos
    let mensaje = '';
  
    try {
      const usuario = new Usuario(body); // Instanciar el objeto   
      await usuario.save();
      mensaje = 'El registro se realizó exitosamente';
      res.status(200).json({ mensaje }); // Envía una respuesta JSON con el mensaje
    } catch (error) {
      console.error(error);
      if (error.name === 'ValidationError') {
        const errores = Object.values(error.errors).map(val => val.message);
        mensaje = errores.join(', ');
      } else {
        mensaje = 'Ocurrió un error durante el registro.';
      }
      res.status(500).json({ mensaje }); // Envía una respuesta de error con el mensaje
    }
  };
  

//Modificar
const usuarioPut = async(req, res = response) => {

    const {nombre, password, rol, estado} = req.body
    let mensaje = ''

    try{
        const usuario = await Usuario.findOneAndUpdate({nombre: nombre},{password:password, rol:rol, estado:estado})
        mensaje = 'La modificación se efectuó exitosamente'
    }
    catch(error){
        mensaje = 'Se presentaron problemas en la modificación.'
    }

    res.json({
        msg: mensaje
    })
}

//Modificar
const usuarioDelete = async(req, res = response) => {

    const {_id} = req.body
    let mensaje = ''

    try{
        const usuario = await Usuario.deleteOne({_id: _id})
        mensaje = 'La eliminiación se efectuó exitosamente.'
    }
    catch(error){
        mensaje = 'Se presentaron problemas en la eliminación.'
    }

    res.json({
        msg: mensaje
    })
}

module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete
}
