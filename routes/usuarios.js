/* 
Ruta: /api/usuarios
*/

const { Router } = require('express')
const { check } = require('express-validator') 

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controller/usuarios')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-Jwt')

const router = Router()

router.get( '/', validarJWT, getUsuarios )
router.post( '/',
        [
            check( 'Nombre', 'El nombre es obligatorio' ).not().isEmpty(),
            check( 'Password', 'El password es obligatorio' ).not().isEmpty(),
            check( 'Email', 'El email es obligatorio' ).isEmail(),
            validarCampos
        ],
        crearUsuario 
    )
router.put( '/:id',
        [
            validarJWT,          
            check( 'Nombre', 'El nombre es obligatorio' ).not().isEmpty(),
            check( 'Email', 'El email es obligatorio' ).isEmail(),
            check( 'Role', 'El role es obligatorio' ).not().isEmpty(),
            validarCampos,
        ],
        actualizarUsuario 
    )

router.delete( '/:id', validarJWT, borrarUsuario )


module.exports = router