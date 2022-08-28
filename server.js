/*========================================*/

//SETUP

//Express
const express = require("express")
const app = express()
const methodOverride = require("method-override")
//Session
const flash = require("connect-flash")
const session = require("express-session")
//Passport
const passport = require("passport")
require("./config/passport.js")(passport)
//Flatpickr
const flatpickr = require("flatpickr")
//Route Authentication
const { ensureAuthenticated } = require("./config/auth.js")
//Environment
require("dotenv").config()
const PORT = process.env.PORT
const SESSION_SECRET = process.env.SESSION_SECRET
//Mongoose
const mongoose = require("mongoose")
const mongoDBURI = process.env.MONGODB_URI
mongoose.connect(mongoDBURI)
const db = mongoose.connection
db.once("open", () => {
    console.log(`MongoDB connected at ${db.host}:${db.port}`)
})
const Appointment = require("./models/appointments.js")

/*========================================*/

//MIDDLEWARE

//Express Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'))
//Session Middleware
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}))
//Passport Middleware
app.use(passport.initialize())
app.use(passport.session())
//Flash Middleware
app.use(flash())
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash("error")
    next()
})

/*========================================*/

//ROUTES

//Controllers
const userController = require("./controllers/userController.js")
app.use("/users", userController)
const serviceproviderController = require("./controllers/serviceproviderController.js")
app.use("/sp", serviceproviderController)
const customerController = require("./controllers/customerController.js")
app.use("/customer", customerController)
const appointmentsController = require("./controllers/appointmentController.js")
app.use("/appointments", appointmentsController)

//Home Page
app.get("/", (req, res) => {
    res.render("homepage.ejs", {
        user: req.user
    })
})

//Dashboard
app.get("/dashboard", ensureAuthenticated, async (req, res) => {
    let today = new Date();
    let todaysAppointments = []
    let upcomingAppointments = []
    let pastAppointments = []
    if (req.user.usertype === "serviceprovider") {
        todaysAppointments = await Appointment.find({ $or: [ { serviceprovider: `${req.user.id}` }, { customer: `${req.user.id}` }, { chosenDate: today } ] })
        upcomingAppointments = await Appointment.find({ $or: [ { serviceprovider: `${req.user.id}` }, { customer: `${req.user.id}` }, { chosenDate: { $gt: today } } ] })
        pastAppointments = await Appointment.find({ $or: [ { serviceprovider: `${req.user.id}` }, { customer: `${req.user.id}` }, { chosenDate: { $lt: today } } ] })
    }
    else {
        todaysAppointments = await Appointment.find({ customer: `${req.user.id}`, chosenDate: today })
        upcomingAppointments = await Appointment.find({ customer: `${req.user.id}`, chosenDate: { $gte: today } })
        pastAppointments = await Appointment.find({ customer: `${req.user.id}`, chosenDate: { $lte: today } })
    }
    todaysAppointments = todaysAppointments.sort((a, b) => {
        return a.chosenDate - b.chosenDate
    })
    upcomingAppointments = upcomingAppointments.sort((a, b) => {
        return a.chosenDate - b.chosenDate
    })
    pastAppointments = pastAppointments.sort((a, b) => {
        return a.chosenDate - b.chosenDate
    })
    res.render("dashboard.ejs", {
        user: req.user,
        todaysAppointments: todaysAppointments,
        upcomingAppointments: upcomingAppointments,
        pastAppointments: pastAppointments
    })
})

//Unmatched Route Redirect
app.get("*", (req, res) => {
    res.redirect("/")
})

/*========================================*/

//Port Connection
app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT)
})