const mongodb = require('mongodb')
// const { insertOne } = require('mongodb/lib/operations/collection_ops')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'resturant-reservation'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)


    // db.collection('tables').insertMany([
    //     {
    //         table_number: 18,
    //         n_seats: 4,
    //     }, {
    //         table_number: 11,
    //         n_seats: 2
    //     }, {
    //         table_number: 13,
    //         n_seats: 6
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert documents!')
    //     }

    db.collection('reservations').insertMany([
        {
            date: "19.04.2023",
            time: "13:00",
            n_people: 3,
            reservation_name: "Johnson"
        }, {
            date: "21.04.2023",
            time: "21:00",
            n_people: 5,
            reservation_name: "Trump"
        }, {
            date: "24.04.2023",
            time: "12:30",
            n_people: 10,
            reservation_name: "Biden"
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert documents')
        }

        console.log(result.ops)
    })

    //     console.log(result.ops)
    // })

    // db.collection('tables').deleteOne({
    //     table_number: 18
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('tables').updateOne({
    //     _id: new ObjectID('643fe263b3f3b41037bf46ef')
    // }, {
    //     $inc: {
    //         table_number: 2,
    //         n_seats: 1
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
})