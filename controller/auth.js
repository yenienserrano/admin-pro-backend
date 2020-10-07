const { response } = require('express')
const bcrypt = require('bcryptjs');
const { generarJWT } = require("../helpers/jwt")
 

const Usuario = require('../models/usuario');

const login = async(req, res = response) => {
    const { Email, Password } = req.body
    try {

        // validar email
        const usuarioDB = await Usuario.findOne({ Email })
        if( !usuarioDB ){
            return res.status(404).json({
                ok:false,
                msg: "Usuario o contraseña incorrectas"
            })
        }

        //validar contraseña
        const validPassword = bcrypt.compareSync( Password, usuarioDB.Password )

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
            token
        })
        
    } catch (error) {
        console.log(error)
        req.status(500).json({
            ok: false,
            uid
        })
    }
}

module.exports = {
    login
}