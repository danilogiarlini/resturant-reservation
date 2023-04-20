const express = require('express')
require('./db/mongoose')
const Table = require('./models/table')
const Reservation = require('./models/reservation')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/tables', async (req, res) => {
    const table = new Table(req.body)

    try {
        await table.save()
        res.status(201).send(table)
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get('/tables', async (req, res) => {
    try {
        const tables = await Table.find({})
        res.send(tables)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get('/tables/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const table = await Table.findById(_id)

        if (!table) {
            return res.status(404).send()
        }

        res.send(table)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/reservations', async (req, res) => {
    const reservation = new Reservation(req.body)

    try {
        await reservation.save()
        res.status(201).send(reservation)
    } catch (error) {
        res.status(400).send(error)
    }
})  

app.get('/reservations', async (req, res) => {
    try {
        const reservations = await Reservation.find({})
        res.send(reservations)
    } catch (error) {
        res.send(500).send(error)
    }
})

app.get('/reservations/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const reservation = await Reservation.findById(_id)

        if (!reservation) {
            return res.status(404).send()
        }

        res.send(reservation)
    } catch (error) {
        res.status(500).send()
    }
})



app.listen(port, () => {
    console.log('Server is up on port' + port)
})