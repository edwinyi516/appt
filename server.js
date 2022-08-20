//Express Setup
const express = require("express")
const app = express()

const methodOverride = require("method-override")

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
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))

const serviceproviderController = require("./controllers/serviceproviderController.js")
app.use("/sp", serviceproviderController)

//Landing Page
app.get("/", (req, res) => {
    res.render("homepage.ejs")
})

//Port Connection
app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT)
})