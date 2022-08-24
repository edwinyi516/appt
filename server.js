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

//Home Page
app.get("/", (req, res) => {
    res.render("homepage.ejs")
})

//Dashboard
app.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render("dashboard.ejs", {
        user: req.user
    })
})

/*========================================*/

//Port Connection
app.listen(PORT, () => {
    console.log("Server is running on port: ", PORT)
})