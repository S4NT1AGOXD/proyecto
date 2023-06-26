const {Schema, model} = require('mongoose')

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'El nombre es obligatorio']
    },

    password: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        minlength: [3, 'Debe tener mínimo 3 caracteres'],
        maxlength:  [7, 'Debe tener máximo 3 caracteres']
    },

    rol: {
        type: String,
        required: true,
        enum: ['Admin', 'Usuario']
    },

    estado: {
        type: Boolean,
        default: true,
        required: [true, 'El estado es obligatorio']
    },

})

module.exports = model('Usuario',UsuarioSchema)