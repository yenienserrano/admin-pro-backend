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

const editarHospitales = (req, res = response) => {
    res.json({
        ok:true,
        msg: "Put Hospitales"
    })
}

const eliminarHospitales = (req, res = response) => {
    res.json({
        ok:true,
        msg: "Delete Hospitales"
    })
}

module.exports = {
    getHospitales,
    crearHospitales,
    editarHospitales,
    eliminarHospitales
}