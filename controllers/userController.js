const express = require("express")
const router = express.Router()
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

//CREATE NEW SERVICE PROVIDER
router.post("/", (req, res) => {
    ServiceProvider.create(req.body, (err, createdServiceProvider) => {
        if(err) {
            console.log("error", err)
            res.send(err)
        }
        else {
            res.redirect("/sp")
        }
    })
})

//REGISTER MAIN PAGE
router.get("/register", async (req, res) => {
    res.render("users/register.ejs")
})

//SIGN IN
router.get("/signin", (req, res) => {
    res.render("users/signin.ejs")
})


module.exports = router