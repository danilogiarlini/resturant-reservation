const mongoose = require('mongoose')
const validator = require('validator')

const Reservation = mongoose.model('Reservation', {
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    n_people: {
        type: Number,
        required: true,
        default: 1,
        //min: 1,
        max: 10,
        validate(value) {
            if (value < 0) {
                throw new Error('Number of people must be a positive number')
            }
        }
    },
    reservation_name: {
        type: String,
        required: true
    }
})

module.exports = Reservation