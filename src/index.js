const express = require('express')
require('./db/mongoose')
const Table = require('./models/table')
const Reservation = require('./models/reservation')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/tables', (req, res) => {
    const table = new Table(req.body)

    table.save().then(() => {
        res.status(201).send(table)
    }).catch((error) => {
        res.status(400).send(error)
    })
})

app.get('/tables', (req, res) => {
    Table.find({}).then((tables) => {
        res.send(tables)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

app.post('/reservation', (req, res) => {
    const reservation = new Reservation(req.body)

    reservation.save().then(() => {
        res.status(201).send(reservation)
    }).catch((error) => {
        res.status(400).send(error)
    })
})  

app.listen(port, () => {
    console.log('Server is up on port' + port)
})