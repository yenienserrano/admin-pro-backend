const { response } = require('express')
var bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt")


const Usuario = require('../models/usuario');



const getUsuarios = async(req, res) => {

    const desde = Number(req.query.desde) || 0
    
    const [ usuarios, total ] = await Promise.all([
        Usuario
            .find({}, "role nombre email google img")
            .skip( desde )
            .limit( 5 ),

        Usuario.countDocuments()
    ])
    

    res.json({
        ok: true,
        usuarios,
        total
    })
}


const crearUsuario = async(req, res = response) => {

    const { email, password } = req.body
    

    
    try {

        const existEmail = await Usuario.findOne({ email })

        if( existEmail ){
            return res.status(400).json({
                ok: false,
                msg: 'El email ya tiene una cuenta creada'
            })
        }

        const usuario = new Usuario( req.body )

        //encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password , salt );


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

        const { password, google, email, ...campos } = req.body


        if( usuarioDB.email !== email ){            
            const emailUtilizado = await Usuario.findOne({ email })
            if( emailUtilizado ){
                return res.status(400).json({
                    ok: false,
                    msg: "El email ya se encuentra registrado"                    
                })
            }
        }

        if( !usuarioDB.google ){
            campos.email = email
        }

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