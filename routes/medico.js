/* 
Ruta: /api/medicos
*/
const { Router } = require('express')
const { check } = require('express-validator') 

const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-Jwt')

const { getMedicos, crearMedico, editarMedico, borrarMedico } = require("../controller/medico")


const router = Router()

router.get( '/', validarJWT, getMedicos )
router.post( '/',
        [
            validarJWT,
            check("nombre", "El nombre debe ser obligatorio").not().isEmpty(),
            check("hospital", "El id del hospital no es valido").isMongoId(),
            validarCampos
        ],
        crearMedico 
    )
router.put( '/:id',
        [
            validarJWT,
            check("nombre", "El nombre debe ser obligatorio").not().isEmpty(),
            check("hospital", "El id del hospital no es valido").isMongoId(),
            validarCampos
        ],
        editarMedico 
    )

router.delete( '/:id', validarJWT, borrarMedico )


module.exports = router