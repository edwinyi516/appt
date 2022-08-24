const express = require("express")
const router = express.Router({ mergeParams: true })
const ServiceProvider = require("../models/serviceproviders.js")
const Customer = require("../models/customers.js")
const app = express()
const bcrypt = require("bcrypt")
const { Router } = require("express")

//NEW CUSTOMER
router.get("/register/newcustomer", (req, res) => {
    res.render("users/newCustomer.ejs")
})

//REGISTER NEW CUSTOMER
router.post("/register/newcustomer", (req, res) => {
    const { firstName, lastName, phone, email, password, password2 } = req.body
    let errors = []
    //Check required fields
    if(!firstName || !lastName || !phone || !email || !password || !password2) {
        errors.push({ msg: "Please fill in all fields" })
    }
    //Check passwords match
    if(password !== password2) {
        errors.push({ msg: "Passwords do not match" })
    }
    //Check passwords length
    if(password.length < 6) {
        errors.push({ msg: "Password must be at least 6 characters" })
    }
    if(errors.length > 0) {
        res.render("users/newCustomer.ejs", {
            errors,
            firstName,
            lastName,
            email,
            phone,
            password,
            password2
        })
    }
    else {
        Customer.findOne({ email: email })
            .then(user => {
                if(user) {
                    errors.push({ msg: "User already exists with that email"})
                    res.render("users/newCustomer.ejs", {
                        errors,
                        firstName,
                        lastName,
                        email,
                        phone,
                        password,
                        password2
                    })
                }
                else {
                    const newCustomer = new Customer({
                        firstName,
                        lastName,
                        email,
                        phone,
                        password
                    })
                    //Hash password
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newCustomer.password, salt, (err, hash) => {
                        if(err) throw err
                        newCustomer.password = hash
                        newCustomer.save()
                            .then(user => {
                                req.flash("success_msg", "You are now registered and can log in!")
                                res.redirect("/users/signin/customer")
                            })
                            .catch(err => console.log(err))
                    }))
                }
            })
    }
})

//NEW SERVICE PROVIDER
router.get("/register/newserviceprovider", (req, res) => {
    res.render("users/newServiceProvider.ejs")
})

//REGISTER NEW SERVICE PROVIDER
router.post("/register/newserviceprovider", (req, res) => {
    const { firstName, lastName, company, phone, email, password, password2 } = req.body
    let errors = []
    //Check required fields
    if(!firstName || !lastName || !company || !phone || !email || !password || !password2) {
        errors.push({ msg: "Please fill in all fields" })
    }
    //Check passwords match
    if(password !== password2) {
        errors.push({ msg: "Passwords do not match" })
    }
    //Check passwords length
    if(password.length < 6) {
        errors.push({ msg: "Password must be at least 6 characters" })
    }
    if(errors.length > 0) {
        res.render("users/newServiceProvider.ejs", {
            errors,
            firstName,
            lastName,
            company,
            email,
            phone,
            password,
            password2
        })
    }
    else {
        ServiceProvider.findOne({ email: email })
            .then(user => {
                if(user) {
                    errors.push({ msg: "User already exists with that email"})
                    res.render("users/newServiceProvider.ejs", {
                        errors,
                        firstName,
                        lastName,
                        company,
                        email,
                        phone,
                        password,
                        password2
                    })
                }
                else {
                    const newServiceProvider = new ServiceProvider({
                        firstName,
                        lastName,
                        company,
                        email,
                        phone,
                        password
                    })
                    //Hash password
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newServiceProvider.password, salt, (err, hash) => {
                        if(err) throw err
                        newServiceProvider.password = hash
                        newServiceProvider.save()
                            .then(user => {
                                req.flash("success_msg", "You are now registered and can log in!")
                                res.redirect("/users/signin/serviceprovider")
                            })
                            .catch(err => console.log(err))
                    }))
                }
            })
            // ServiceProvider.create(req.body, (err, createdServiceProvider) => {
    //     if(err) {
    //         console.log("error", err)
    //         res.send(err)
    //     }
    //     else {
    //         res.redirect("/sp")
    //     }
    // })
    }
})

//REGISTER MAIN PAGE
router.get("/register", async (req, res) => {
    res.render("users/register.ejs")
})

//CUSTOMER SIGN IN PAGE
router.get("/signin/customer", (req, res) => {
    res.render("users/signinCustomer.ejs")
})

//SERVICE PROVIDER SIGN IN PAGE
router.get("/signin/serviceprovider", (req, res) => {
    res.render("users/signinServiceProvider.ejs")
})

//MAIN SIGN IN PAGE
router.get("/signin", (req, res) => {
    res.render("users/signin.ejs")
})


module.exports = router