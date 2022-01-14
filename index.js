// Imports
import express from 'express'
import cors from 'cors'

// Database
import db from './database/database.js'

const app = express()
app.use(cors())

// Body Parser
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/carros', (req, res) => {
    res.json(db.carros)
})

app.get('/carro/:id', (req, res) => {
    if(isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        let id = parseInt(req.params.id)
        let carro = db.carros.find(c => c.id == id)

        if(carro != undefined) {
            res.json(carro)
            res.sendStatus(200)
        } else {
            res.sendStatus(404)
        }
    } 
})

app.post('/carro', (req, res) => {
    let {modelo, montadora, ano} = req.body
    
    db.carros.push({
        id: db.carros.length + 1,
        modelo,
        montadora, 
        ano
    })

    res.sendStatus(200)
})

app.put('/carro/:id', (req, res) => {
    if(isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        let id = parseInt(req.params.id)
        let carro = db.carros.find(c => c.id == id)

        if(carro != undefined) {
            let modelo = req.body.modelo
            let montadora = req.body.montadora
            let ano = req.body.ano

            if(modelo != undefined) {
                carro.modelo = modelo
            }

            if(montadora != undefined) {
                carro.montadora = montadora
            }

            if(ano != undefined) {
                carro.ano = ano
            }

            res.sendStatus(200)

        } else {
            res.sendStatus(404)
        }
    }
})

app.delete('/carro/:id', (req, res) => {
    if(isNaN(req.params.id)) {
        res.sendStatus(400)
    } else {
        let id = parseInt(req.params.id)
        let index = db.carros.findIndex(c => c.id == id)

        if(index == -1) {
            res.sendStatus(404)
        } else {
            db.carros.splice(index , 1)
            res.sendStatus(200)
        }
    }
})

// Server
const port = 3000
app.listen(port, err => {
    err ? console.log(err) : console.log(`Server running at http://localhost:${port}`)
})
