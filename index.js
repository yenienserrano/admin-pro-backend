require('dotenv').config();

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



//Rutas
app.use( '/api/usuarios', require('./routes/usuarios') )
app.use( '/api/auth', require('./routes/auth') )



app.listen(process.env.PORT, () => console.log('Servidor corriendo en el puerto ', process.env.PORT))