const path = require('path')
const fs = require('fs')

const { response } = require('express')
const { v4: uuidv4 } = require('uuid')
const { actualizarImagen } = require('../helpers/actualizar-archivo')




const fileUpload = async ( req, res = response ) => {
    
    const tipo = req.params.tipo
    const id = req.params.id

    const tiposValidos = [ "medicos", "hospitales", "usuarios"]

    if( !tiposValidos.includes( tipo )){
        return res.status(400).json({
            ok: false,
            msg: "El tipo debe ser medicos/hospitales/usuarios"
        })
    }

    //comprobar si hay 1 archivo

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: "No se encotro ningun archivo"
        })
      }

    //procesar archivo

    const file = req.files.imagen
    const nombreCortado = file.name.split('.')
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ]
    
    //validar Extensiones

    const extensionesValidas = [ 'jpg', 'jpeg', 'png', 'gif']
    if( !extensionesValidas.includes( extensionArchivo )){
    return res.status(400).json({
        ok: false,
        msg: "Extension del archivo no valido"
    })
    }

    //generar el nombre del archivo

    const nombreArchivo = `${ uuidv4() }.${extensionArchivo}`
    const path = `./upload/${ tipo }/${nombreArchivo}`

    file.mv( path , function(err) {
        if (err){
            console.log(err)
            return res.status(500).send(err);
        }

        //actualizar imagen
        actualizarImagen(tipo, id, nombreArchivo)
        

        res.json({
            ok:true,
            msj:'fileUpload',
            nombreArchivo
        })
    });
}

const getImagen = (req, res = response) => {

    const tipo = req.params.tipo
    const foto = req.params.foto

    const pathImg = path.join( __dirname, `../upload/${ tipo }/${ foto }`)

    if( fs.existsSync( pathImg )){
        res.sendFile( pathImg )
    } else {
        const pathImg = path.join( __dirname, `../upload/no-img.jpg`)
        res.sendFile( pathImg )
    }
    
}

module.exports = { 
    fileUpload,
    getImagen
}