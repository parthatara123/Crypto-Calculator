const bodyParser = require('body-parser')
const express = require('express')
const route  = require('./route/route')
const dotenv = require('dotenv').config()


//Creating express app
let app = express()

//global middleware - body parser for parsing input
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', route)


//Defining port
app.listen(process.env.PORT, function()  {
    console.log(`Express app is running on port ${process.env.PORT}`)
})

