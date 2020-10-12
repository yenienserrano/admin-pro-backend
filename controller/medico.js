const { response } = require('express')

const Medico = require('../models/medico')

const getMedicos = async (req, res = response) => {

    const medicosDB = await Medico.find()
                                  .populate('usuario', 'nombre img')
                                  .populate('hospital', 'nombre img')  


    res.json({
        ok:true,
        medicosDB
    })
}

const crearMedico = async (req, res = response) => {

    const uid = req.uid

    const medico = new Medico({
        usuario: uid,
        ...req.body
    })    

    try {

        const medicoDB = await medico.save()

        res.json({
            ok:true,
            medicoDB
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: "Comunicarse con el administrador"
        })
    }

    
}

const editarMedico = (req, res = response) => {
    res.json({
        ok:true,
        msg: "Put medico"
    })
}

const borrarMedico = (req, res = response) => {
    res.json({
        ok:true,
        msg: "Delete medico"
    })
}

module.exports = {
    getMedicos,
    crearMedico,
    editarMedico,
    borrarMedico
}