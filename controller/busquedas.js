const { response } = require('express')

const  Usuario = require('../models/usuario')
const  Hospital = require('../models/hospital')
const  Medico = require('../models/medico')


const getTodo = async (req, res = response) => {
    
    const busqueda = req.params.busqueda
    const regexp = RegExp( busqueda, 'i')

    const [ usuarios, hospitales, medicos] = await Promise.all([
        Usuario.find({ nombre: regexp }),
        Hospital.find({ nombre: regexp }),
        Medico.find({ nombre: regexp })
    ])   
    
    
    res.json({
        ok:true,
        usuarios,
        hospitales,
        medicos
    })
}


const getDocumentosColeccion = async (req, res = response) => {
    
    const tabla    = req.params.tabla
    const busqueda = req.params.busqueda
    const regexp   = RegExp( busqueda, 'i')

    let data = []

    switch ( tabla ) {
        case "medicos":
            data = await Medico.find({ nombre: regexp })
            
            break;
        case "hospitales":
            data = await Hospital.find({ nombre: regexp })
            
            break;
        case "usuarios":
            data = await Usuario.find({ nombre: regexp })
        
            break;
        default:
            return res.status(400).json({
                ok:false,
                msg: "la coleccion tiene que ser medicos/usuarios/hospitales"
            })
            break;
    }    
    
    res.json({
        ok:true,
        data
    })
}

module.exports = {
    getTodo,
    getDocumentosColeccion
}