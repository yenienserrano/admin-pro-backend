const { response } = require('express')

const Hospital = require('../models/hospital');


const getHospitales = async (req, res = response) => {

    const hospitales = await Hospital.find()
                                     .populate('usuario', 'nombre img')


    res.json({
        ok:true,
        hospitales
    })
}

const crearHospitales = async (req, res = response) => {
    const uid = req.uid

    const hospital = new Hospital( {
        usuario: uid, 
        ...req.body
    } )


    try {

        const hospitalDB = await hospital.save()

        res.json({
            ok:true,
            hospitalDB
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: "Comunicarse con el administrador"
        })
    }



    
}

const editarHospitales = async (req, res = response) => {
    const id  = req.params.id
    const uid = req.uid

    try {
        const hospital = await Hospital.findById( id )

        if( !hospital ){
            return res.status(404).json({
                ok:false,
                msg: "Hospital no encontrado con ese id"
            })    
        }

        const datosNuevos = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate( hospital, datosNuevos, { new: true } )
        
        res.json({
            ok:true,
            hospital: hospitalActualizado 
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "Comuniquese con el administrador"
        })
    }

}

const eliminarHospitales = async (req, res = response) => {
    const id  = req.params.id
    
    try {
        const hospital = await Hospital.findById( id )

        if( !hospital ){
            return res.status(404).json({
                ok:false,
                msg: "Hospital no encontrado con ese id"
            })    
        }

        await Hospital.findByIdAndDelete( id )
        
        res.json({
            ok:true,
            msg: "Hospital elmiminado" 
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: "Comuniquese con el administrador"
        })
    }
}

module.exports = {
    getHospitales,
    crearHospitales,
    editarHospitales,
    eliminarHospitales
}