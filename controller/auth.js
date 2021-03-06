const { response } = require('express')
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt")
 

const Usuario = require('../models/usuario');
const { verifyGoogle } = require('../helpers/google-sign-in');

const { menuFrontend } = require('../helpers/menu-frontend')

const login = async(req, res = response) => {
    const { email, password } = req.body
    try {

        // validar email
        const usuarioDB = await Usuario.findOne({ email })
        if( !usuarioDB ){
            return res.status(404).json({
                ok:false,
                msg: "Usuario o contraseña incorrectas"
            })
        }

        //validar contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password )

        if( !validPassword ){
            return res.status(404).json({
                ok:false,
                msg: "Usuario o contraseña incorrectas"
            })
        }

        // generarToken

        const token = await generarJWT( usuarioDB._id )


        res.json({
            ok: true,
            token,
            menu: menuFrontend( usuarioDB.role )
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            uid
        })
    }
}

const googleSignIn = async( req, res = response ) => {
    const tokenGoogle = req.body.token

    try {
        
        const { name, email, picture } = await verifyGoogle( tokenGoogle )
        const usuarioDB = await Usuario.findOne({ email })
        let usuario

        if( !usuarioDB ){
            usuario = new Usuario({
                nombre: name,
                email,
                password: "@@@",
                img: picture,
                google: true
            })
        } else {
            usuario = usuarioDB
            usuario.google = true
        }

        await usuario.save()

        // generarToken

        const token = await generarJWT( usuario._id )

        res.json({
            ok: true,
            msg: "Google Sign-in",
            token,
            menu: menuFrontend( usuario.role)
        })
        
    } catch (error) {
        console.log(error)
        res.status(401).json({
            ok: false,
            msg: "El token es incorrecto"
        })
    }
}

const renewToken = async( req, res = response ) => {
    const uid = req.uid

    const token = await generarJWT( uid )

    const usuario = await Usuario.findById( uid )
    
    res.json({
        ok:true,
        token,
        usuario,
        menu: menuFrontend( usuario.role )
    })
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}