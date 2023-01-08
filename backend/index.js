const express = require('express')
const cors = require('cors')

const app = express()

//Configuração do JSON
app.use(express.json())

app.use(cors({
    //5173 PARA A PORTA DO REACT.JS USANDO O YARN VITE
    credentials: true, origin: 'http://localhost:5173'
}))

//Pasta de pública imagens
app.use(express.static('public'))

//Routes
const UserRoutes = require('./routes/UserRoutes')
app.use('/users', UserRoutes)

//LISTEN
app.listen(5000)