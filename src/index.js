const express = require('express')
require('./db/mongoose')
const Table = require('./models/table')
const Reservation = require('./models/reservation')
const tableRouter = require('./routers/table')
const reservationRouter = require('./routers/reservation')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use(tableRouter)
app.use(reservationRouter)

app.listen(port, () => {
    console.log('Server is up on port' + port)
})