const express = require("express")
const router = express.Router({ mergeParams: true })
const bcrypt = require("bcrypt")
const passport = require("passport")
const ServiceProvider = require("../models/serviceproviders.js")
const Customer = require("../models/customers.js")
const { ensureAuthenticated } = require("../config/auth.js")


//NEW CUSTOMER PAGE
router.get("/register/newcustomer", (req, res) => {
    res.render("users/newCustomer.ejs", {
        user: req.user
    })
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
            user: undefined,
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
                        user: undefined,
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
    res.render("users/newServiceProvider.ejs", {
        user: req.user
    })
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
            user: undefined,
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
                        user: undefined,
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
    res.render("users/register.ejs", {
        user: req.user
    })
})

//EDIT USER
router.get("/editprofile", ensureAuthenticated, (req, res) => {
    res.render("users/edit.ejs", {
        user: req.user
    })
})

//UPDATE USER
router.put("/:id", ensureAuthenticated, (req, res) => {
    if (req.user.usertype === "serviceprovider") {
        const { firstName, lastName, company, phone, email } = req.body
        let errors = []
        //Check required fields
        if(!firstName || !lastName || !company || !phone || !email) {
            errors.push({ msg: "Please fill in all fields" })
        }
        if(errors.length > 0) {
            res.render("users/edit.ejs", {
                user: req.user,
                errors,
                firstName,
                lastName,
                company,
                email,
                phone
            })
        }
        else {
            ServiceProvider.findOne({ email: email })
                .then(foundUser => {
                    if(foundUser && (email != req.user.email)) {
                        errors.push({ msg: "User already exists with that email"})
                        res.render("users/edit.ejs", {
                            user: req.user,
                            errors,
                            firstName,
                            lastName,
                            company,
                            email,
                            phone
                        })
                    }
                    else {
                        ServiceProvider.findByIdAndUpdate(req.user.id, { $set: { firstName: firstName, lastName: lastName, company: company, email: email, phone: phone } }, () => {
                            res.redirect(`/dashboard`)
                        })
                    }
                })
        }
    }
    else {
        const { firstName, lastName, phone, email } = req.body
        let errors = []
        //Check required fields
        if(!firstName || !lastName || !phone || !email) {
            errors.push({ msg: "Please fill in all fields" })
        }
        if(errors.length > 0) {
            res.render("users/edit.ejs", {
                user: req.user,
                errors,
                firstName,
                lastName,
                email,
                phone
            })
        }
        else {
            Customer.findOne({ email: email })
                .then(foundUser => {
                    if(foundUser && (email != req.user.email)) {
                        errors.push({ msg: "User already exists with that email"})
                        res.render("users/edit.ejs", {
                            user: req.user,
                            errors,
                            firstName,
                            lastName,
                            email,
                            phone
                        })
                    }
                    else {
                        Customer.findByIdAndUpdate(req.user.id, { $set: { firstName: firstName, lastName: lastName, email: email, phone: phone } }, () => {
                            res.redirect(`/dashboard`)
                        })
                    }
                })
        }
    }
})

//DELETE USER
router.delete("/deleteuser", ensureAuthenticated, (req, res) => {
    if(req.user.usertype === "serviceprovider") {
        ServiceProvider.findByIdAndRemove(req.user.id, (err, data) => {
            res.redirect("/")
        })
    }
    else {
        Customer.findByIdAndRemove(req.user.id, (err, data) => {
            res.redirect("/")
        })
    }
})

//SIGN IN PAGE
router.get("/signin", (req, res) => {
    res.render("users/signin.ejs", {
        user: req.user
    })
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
router.get("/logout", ensureAuthenticated, (req, res) => {
    req.logout((err) => {
        if(err) { return next(err) }
        req.flash("success_msg", "You have been logged out")
        res.redirect("/")
    })
})


module.exports = router