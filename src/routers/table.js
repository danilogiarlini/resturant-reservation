const express = require('express')
const Table = require('../models/table')
const router = new express.Router()

router.post('/tables', async (req, res) => {
    const table = new Table(req.body)

    try {
        await table.save()
        res.status(201).send(table)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/tables', async (req, res) => {
    try {
        const tables = await Table.find({})
        res.send(tables)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/tables/:id', async (req, res) => {
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

router.patch('/tables/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['n_seats']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'})
    }

    try {
        const table = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!table) {
            return res.status(404).send()
        }

        res.send(table)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/tables/:id', async(req, res) => {
    try {
        const table = await Table.findByIdAndDelete(req.params.id)

        if (!table) {
            return res.status(404).send()
        }

        res.send(table)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router