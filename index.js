const express = require('express')
const path = require('path')
const connectDb = require('./db/connect')

require('dotenv').config()

const port = process.env.PORT


const app = express()

// bodyparser middleware
app.use(express.urlencoded({ extended: true })) // incoming data
app.use(express.json()) // outgoing response

// static directory
app.use(express.static('./view'))

// index route
app.use(`/` , require('./route/userRoute'))


// server port
app.listen(port, () => {
    connectDb()
    console.log(`server is started @ http://localhost:${port}`)
})