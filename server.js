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
const db = mongoose.connection
db.once("open", () => {
    console.log(`MongoDB connected at ${db.host}:${db.port}`)
})

//Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))

const userController = require("./controllers/userController.js")
app.use("/users", userController)

const serviceproviderController = require("./controllers/serviceproviderController.js")
app.use("/sp", serviceproviderController)

const customerController = require("./controllers/customerController.js")
app.use("/customer", customerController)

//Landing Page
app.get("/", (req, res) => {
    res.render("homepage.ejs")
})

//Port Connection
app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT)
})