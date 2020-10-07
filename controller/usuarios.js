const { response } = require('express')
var bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt")


const Usuario = require('../models/usuario');



const getUsuarios = async(req, res) => {

    const usuarios = await Usuario.find({}, "Role Nombre Email Google")

    res.json({
        ok: true,
        usuarios
    })
}


const crearUsuario = async(req, res = response) => {

    const { Email, Password } = req.body

    
    try {

        const existEmail = await Usuario.findOne({ Email })

        if( existEmail ){
            return res.status(400).json({
                ok: false,
                msg: 'El email ya tiene una cuenta creada'
            })
        }

        const usuario = new Usuario( req.body )

        //encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.Password = bcrypt.hashSync( Password , salt );


        await usuario.save()

        const token = await generarJWT( usuario._id )

        res.json({
            ok: true,
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... ver logs'
        })
    }    
}


const actualizarUsuario = async(req, res = response) => {

    const uid = req.params.id

    try {
        
        const usuarioDB = await Usuario.findById( uid )
        

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: "No se encontro ningun usuario con ese ID"
            })
        }

        const { Password, Google, Email, ...campos } = req.body


        if( usuarioDB.Email !== Email ){            
            const emailUtilizado = await Usuario.findOne({ Email })
            if( emailUtilizado ){
                return res.status(400).json({
                    ok: false,
                    msg: "El email ya se encuentra registrado"                    
                })
            }
        }

        campos.Email = Email

        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true })

        res.json({
            ok: true,
            usuarioActualizado
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        })
    }

}

const borrarUsuario = async(req, res = response) => {
    const uid = req.params.id


    try {

        const usuarioDB = await Usuario.findById( uid )
        

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: "No se encontro ningun usuario con ese ID"
            })
        }

        await Usuario.findByIdAndDelete( uid )

        res.json({
            ok: true,
            msg: "Usuario eliminado"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Error inesperado"
        })
    }

    
}



module.exports = { 
        getUsuarios,
        crearUsuario,
        actualizarUsuario,
        borrarUsuario
     }