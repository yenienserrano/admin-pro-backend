const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    Nombre: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Imagen: {
        type: String
    },
    Role: {
        type: String,
        required: true,
        default: "USER_ROLE"
    },
    Google: {
        type: Boolean,
        default: false
    }
})

UsuarioSchema.method('toJSON', function(){
    const { __v, Password, ...object } = this.toObject()

    return object
})


module.exports = model( 'Usuario', UsuarioSchema )