/* 
Ruta: /api/usuarios
*/

const { Router } = require('express')
const { check } = require('express-validator') 

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controller/usuarios')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT, validarADMIN_ROLE, validarADMIN_ROLEoElMismoUsuario } = require('../middlewares/validar-Jwt')

const router = Router()

router.get( '/', validarJWT, getUsuarios )
router.post( '/',
        [
            check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
            check( 'password', 'El password es obligatorio' ).not().isEmpty(),
            check( 'email', 'El email es obligatorio' ).isEmail(),
            validarCampos
        ],
        crearUsuario 
    )
router.put( '/:id',
        [
            validarJWT,
            validarADMIN_ROLEoElMismoUsuario,          
            check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
            check( 'email', 'El email es obligatorio' ).isEmail(),
            check( 'role', 'El role es obligatorio' ).not().isEmpty(),
            validarCampos,
        ],
        actualizarUsuario 
    )

router.delete( '/:id', [ validarJWT, validarADMIN_ROLE ], borrarUsuario )


module.exports = router