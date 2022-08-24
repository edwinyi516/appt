const LocalStrategy = require("passport-local").Strategy
const bcrypt = require('bcrypt')

const ServiceProvider = require("../models/serviceproviders.js")
const Customer = require("../models/customers.js")

const passport = (passport) => {
    let sessionEmail = null
    passport.use(
        new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
            sessionEmail = email
            //Match Service Provider
            ServiceProvider.findOne({ email: email }, (err, foundSP) => {
                if (!foundSP) {
                    Customer.findOne({ email: email })
                    .then(user => {
                        if(!user) {
                            return done(null, false, { message: "Email or password is invalid" })
                        }
                        //Match password
                        bcrypt.compare(password, user.password, (err, isMatch) => {
                            if(err) throw err
                            if(isMatch) {
                                return done(null, user)
                            }
                            else {
                                return done(null, false, { message: "Email or password is invalid"})
                            }
                        })
                    })
                    .catch(err => console.log(err))
                }
                else {
                    ServiceProvider.findOne({ email: email })
                    .then(user => {
                        if(!user) {
                            return done(null, false, { message: "Email or password is invalid" })
                        }
                        //Match password
                        bcrypt.compare(password, user.password, (err, isMatch) => {
                            if(err) throw err
                            if(isMatch) {
                                return done(null, user)
                            }
                            else {
                                return done(null, false, { message: "Email or password is invalid"})
                            }
                        })
                    })
                    .catch(err => console.log(err))
                }
            })
        })
    )
    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        ServiceProvider.findOne({ email: sessionEmail }, (err, foundSP) => {
            if (!foundSP) {
                Customer.findById(id, (err, user) => {
                    done(err, user)
                })
            }
            else {
                ServiceProvider.findById(id, (err, user) => {
                    done(err, user)
                })
            }
        })
    })
}

module.exports = passport