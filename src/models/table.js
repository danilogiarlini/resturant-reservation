const mongoose = require('mongoose')
const validator = require('validator')

const Table = mongoose.model('Table', {
    table_number: {
        type: Number,
        required: true
    }, 
    n_seats: {
        type: Number,
        default: 1,
        min: 1,
        max: 10,
        validate(value) {
            if (value < 0) {
                throw new Error('Number of seats must be a positive number!')
            }
        },
    }
})

module.exports = Table