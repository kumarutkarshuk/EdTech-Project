const express = require('express')
const app = express() 
require('dotenv').config()
const {connect} = require('./config/database')
const courseRoutes = require('./routes/Course')
const paymentsRoutes = require('./routes/Payments')
const profileRoutes = require('./routes/Profile')
const userRoutes = require('./routes/User')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const {cloudinaryConnect} = require('./config/cloudinary')
const fileUpload = require('express-fileupload')



const PORT = process.env.PORT || 4000 //in case if it's null, don't know how

app.use(express.json())
//some more middlewares
app.use(cookieParser())

//entertain frontend
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp"
}))

//connect to cloudinary
cloudinaryConnect()

//import and mount routes ->
app.use('/api/v1/auth', userRoutes)
app.use('/api/v1/profile', profileRoutes)
app.use('/api/v1/course', courseRoutes)
app.use('/api/v1/payment', paymentsRoutes)

connect()

//another way to deal with exporting and importing
//const db = require('./config/database')
//db.connect()
//this means that object is exported in js

app.get('/', (req, res) => {
    res.json({
        success:true,
        message:"Your server is up and running"
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`)
})

