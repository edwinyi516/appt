const express = require("express")
const router = express.Router({ mergeParams: true })
const ServiceProvider = require("../models/serviceproviders.js")
const Customer = require("../models/customers.js")
const app = express()
const bcrypt = require("bcrypt")

//NEW CUSTOMER
router.get("/register/newcustomer", (req, res) => {
    res.render("users/newCustomer.ejs")
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
                                res.redirect("/users/signin")
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