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

const editarMedico = async (req, res = response) => {

    const id  = req.params.id
    const uid = req.uid

    try {

        const medico = await Medico.findById( id )
        
        if( !medico ){
            return res.status(404).json({
                ok:false,
                msg: "No hay medico con ese id"
            })    
        }

        const datosNuevos = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate( medico, datosNuevos, { new: true })

        res.json({
            ok:true,
            medicoActualizado
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: "Comuniquese con un administrador"
        })
    }
}

const borrarMedico = async (req, res = response) => {
    const id  = req.params.id

    try {

        const medico = await Medico.findById( id )
        
        if( !medico ){
            return res.status(404).json({
                ok:false,
                msg: "No hay medico con ese id"
            })    
        }

        await Medico.findOneAndDelete( id )
        
        res.json({
            ok:true,
            msg: "Medico eliminado"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: "Comuniquese con un administrador"
        })
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    editarMedico,
    borrarMedico
}