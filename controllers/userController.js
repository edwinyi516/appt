const express = require("express")
const router = express.Router({ mergeParams: true })
const ServiceProvider = require("../models/serviceproviders.js")
const Customer = require("../models/customers.js")
const app = express()
const bcrypt = require("bcrypt")
const passport = require("passport")
const { Router } = require("express")

//NEW CUSTOMER PAGE
router.get("/register/newcustomer", (req, res) => {
    res.render("users/newCustomer.ejs")
})

//POST NEW CUSTOMER
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
                                res.redirect("/users/signin")
                            })
                            .catch(err => console.log(err))
                    }))
                }
            })
    }
})

//NEW SERVICE PROVIDER PAGE
router.get("/register/newserviceprovider", (req, res) => {
    res.render("users/newServiceProvider.ejs")
})

//POST NEW SERVICE PROVIDER
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
                                res.redirect("/users/signin/")
                            })
                            .catch(err => console.log(err))
                    }))
                }
            })
    }
})

//REGISTER MAIN PAGE
router.get("/register", async (req, res) => {
    res.render("users/register.ejs")
})

//SIGN IN PAGE
router.get("/signin", (req, res) => {
    res.render("users/signin.ejs")
})

//POST SIGN IN
router.post("/signin", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/users/signin",
        failureFlash: true
    })(req, res, next)
})

//LOGOUT
router.get("/logout", (req, res) => {
    req.logout((err) => {
        if(err) { return next(err) }
        req.flash("success_msg", "You have been logged out")
        res.redirect("/users/signin")
    })
})


module.exports = router