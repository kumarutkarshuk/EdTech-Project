const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 3000 //in case if it's null, don't know how

app.use(express.json())

//import and mount routes

const {connect} = require('./config/database')
connect()

//another way to deal with exporting and importing
//const db = require('./config/database')
//db.connect()
//this means that object is exported in js

//connect to cloudinary

//some more middlewares

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`)
})