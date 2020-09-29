require('dotenv').config();

const express = require('express')
const cors = require('cors')


const { dbConnection } = require('./database/config')



//usuariomeanatlas
//dayaoa5hyJT4rWae

//crear servidor
const app = express()

app.use(cors())


dbConnection()



//rutas
app.get( '/', (req, res) => {
    res.json({
        ok: true,
        message: "Hola Mundo"
    })
})



app.listen(process.env.PORT, () => console.log('Servidor corriendo en el puerto ', process.env.PORT))