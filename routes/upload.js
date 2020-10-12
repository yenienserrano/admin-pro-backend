/* 
ruta: /api/upload
*/


const { Router } = require('express')
const expressFileUpload = require('express-fileupload')
const { check } = require('express-validator') 

const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-Jwt')
const { fileUpload, getImagen } = require('../controller/upload')

const router = Router()

router.use( expressFileUpload() );

router.put('/:tipo/:id', validarJWT, fileUpload)
router.get('/:tipo/:foto', getImagen)

module.exports = router