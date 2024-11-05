import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import urlRoutes from './Routes/UrlRouter.js'

dotenv.config({path: "config.env"})

const app = express()

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error))

app.use('/', urlRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});