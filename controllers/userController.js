const express = require("express")
const router = express.Router({ mergeParams: true })
const ServiceProvider = require("../models/serviceproviders.js")
const Customer = require("../models/customers.js")
const app = express()

//NEW CUSTOMER
router.get("/register/newcustomer", (req, res) => {
    res.render("users/newCustomer.ejs")
})

//NEW SERVICE PROVIDER
router.get("/register/newserviceprovider", (req, res) => {
    res.render("users/newServiceProvider.ejs")
})

//REGISTER MAIN PAGE
router.get("/register", async (req, res) => {
    res.render("users/register.ejs")
})

//SIGN IN CUSTOMER
router.get("/signin/customer", (req, res) => {
    res.render("users/signinCustomer.ejs")
})

//SIGN IN SERVICE PROVIDER
router.get("/signin/serviceprovider", (req, res) => {
    res.render("users/signinServiceProvider.ejs")
})

//SIGN IN
router.get("/signin", (req, res) => {
    res.render("users/signin.ejs")
})


module.exports = router