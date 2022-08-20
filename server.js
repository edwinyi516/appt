const express = require("express")
const app = express()

//Environment Variables
require("dotenv").config()
const PORT = process.env.PORT

//Mongoose Setup
const mongoose = require("mongoose")
const mongoDBURI = process.env.MONGODB_URI
mongoose.connect(mongoDBURI)
mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB")
})

//Middleware
const appointmentController = require("./controllers/appointmentController.js")
app.use("/appointments", appointmentController)

//Landing Page
app.get("/", (req, res) => {
    res.render("homepage.ejs")
})

//Port Connection
app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT)
})