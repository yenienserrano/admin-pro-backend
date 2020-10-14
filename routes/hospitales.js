/* 
Ruta: /api/hospitales
*/
const { Router } = require('express')
const { check } = require('express-validator') 

const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-Jwt')

const { getHospitales, crearHospitales, editarHospitales, eliminarHospitales } =require("../controller/hospitales")


const router = Router()

router.get( '/', validarJWT, getHospitales )
router.post( '/',
        [
            validarJWT,
            check('nombre','El nombre es obligatorio').not().isEmpty(),
            validarCampos
        ],
        crearHospitales 
    )
router.put( '/:id',
        [
            validarJWT,
            check('nombre','El nombre es obligatorio').not().isEmpty(),
            validarCampos 
        ],
        editarHospitales 
    )

router.delete( '/:id', validarJWT, eliminarHospitales )


module.exports = router