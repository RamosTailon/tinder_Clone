const express = require('express')
const cors = require('cors')

const app = express()

//Configuração do JSON
app.use(express.json())

app.use(cors({
    credentials: true, origin: 'http://localhost:3000'  //3000 PARA A PORTA DO REACT.JS 
}))

//Pasta de pública imagens
app.use(express.static('public'))

//Routes
const UserRoutes = require('./routes/UserRoutes')
app.use('/users', UserRoutes)

//LISTEN
app.listen(5000)