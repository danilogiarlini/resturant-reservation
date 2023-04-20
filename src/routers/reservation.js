const express = require('express')
const Reservation = require('../models/reservation')
const router = new express.Router()

router.post('/reservations', async (req, res) => {
    const reservation = new Reservation(req.body)

    try {
        await reservation.save()
        res.status(201).send(reservation)
    } catch (error) {
        res.status(400).send(error)
    }
})  

router.get('/reservations', async (req, res) => {
    try {
        const reservations = await Reservation.find({})
        res.send(reservations)
    } catch (error) {
        res.send(500).send(error)
    }
})

router.get('/reservations/:id', async (req, res) => {
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

router.patch('/reservations/:id', async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['date', 'time', 'n_people', 'reservation_name']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'})
    }

    try {
        const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        
        if (!reservation) {
            return res.status(404).send()
        }
        
        res.send(reservation)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/reservations/:id', async(req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id)

        if (!reservation) {
            return res.status(404).send()
        }

        res.send(reservation)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router