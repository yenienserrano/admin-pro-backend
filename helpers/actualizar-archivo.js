const fs = require('fs')

const Usuario = require('../models/usuario')
const Hospital = require('../models/hospital')
const Medico = require('../models/medico')

const borrarImagen = path => {
    if( fs.existsSync( path ) ){
        //borrar la imagen anterior
        fs.unlinkSync( path )
    }
}

const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo

    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id)
            if( !medico ){
                console.log('No hay medico con ese id')
                return false
            }

            pathViejo = `./upload/medicos/${ medico.img }`
            
            borrarImagen( pathViejo )

            medico.img = nombreArchivo
            await medico.save()
            return true
            
            break;
        case 'usuarios':
            const usuario = await Usuario.findById(id)
            if( !usuario ){
                console.log('No hay usuario con ese id')
                return false
            }

            pathViejo = `./upload/usuarios/${ usuario.img }`
            
            borrarImagen( pathViejo )

            usuario.img = nombreArchivo
            await usuario.save()
            return true
            break;
        case 'hospitales':
            const hospital = await Hospital.findById(id)
            if( !hospital ){
                console.log('No hay hospital con ese id')
                return false
            }

            pathViejo = `./upload/hospitales/${ hospital.img }`
            
            borrarImagen( pathViejo )

            hospital.img = nombreArchivo
            await hospital.save()
            return true
            break;
    
        default:
            break;
    }
}

module.exports = {
    actualizarImagen
}