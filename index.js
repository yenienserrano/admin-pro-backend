require('dotenv').config();
const path = require('path')

const express = require('express')
const cors = require('cors')


const { dbConnection } = require('./database/config')



//usuariomeanatlas
//dayaoa5hyJT4rWae

//crear servidor
const app = express()

app.use(cors())

app.use(express.json())


dbConnection()

app.use( express.static('./public'))



//Rutas
app.use( '/api/usuarios', require('./routes/usuarios') )
app.use( '/api/hospitales', require('./routes/hospitales') )
app.use( '/api/medicos', require('./routes/medico') )
app.use( '/api/todo', require('./routes/busquedas') )
app.use( '/api/upload', require('./routes/upload') )
app.use( '/api/auth', require('./routes/auth') )

//ultimo

app.use( '*', (req, res) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html' ))
})



app.listen(process.env.PORT, () => console.log('Servidor corriendo en el puerto ', process.env.PORT))