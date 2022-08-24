const express = require("express")
const router = express.Router({ mergeParams: true })
const ServiceProvider = require("../models/serviceproviders.js")

const appointmentController = require("../controllers/appointmentController.js")
const Appointment = require("../models/appointments")


//INDEX
router.get("/", async (req, res) => {
    let serviceProviders = await ServiceProvider.find({})
    console.log(serviceProviders)
    res.render("indexSP.ejs", { serviceProviders: serviceProviders })
})

//RE-ROUTE TO APPOINTMENT CONTROLLER
router.use("/:id/appointments", appointmentController, (req, res) => {
    Appointment.findById(req.params.id, () => {
        res.send("Appointments page")
    })
})

//SHOW
router.get("/:id", async (req, res) => {
    let serviceProvider = await ServiceProvider.findById(req.params.id) 
    res.render("showSP.ejs", {
        serviceProvider: serviceProvider
    })
})

// //CREATE
// router.post("/", (req, res) => {
//     const { firstName, lastName, company, phone, email, password, password2 } = req.body
//     let errors = []
//     //Check required fields
//     if(!firstName || !lastName || !company || !phone || !email || !password || !password2) {
//         errors.push({ msg: "Please fill in all fields" })
//     }
//     //Check passwords match
//     if(password !== password2) {
//         errors.push({ msg: "Passwords do not match" })
//     }
//     //Check passwords length
//     if(password.length < 6) {
//         errors.push({ msg: "Password must be at least 6 characters" })
//     }
//     if(errors.length > 0) {
//         res.render("users/newServiceProvider.ejs", {
//             errors,
//             firstName,
//             lastName,
//             company,
//             email,
//             phone,
//             password,
//             password2
//         })
//     }
//     else {
//         res.send("PASS!")
//     }
//     // ServiceProvider.create(req.body, (err, createdServiceProvider) => {
//     //     if(err) {
//     //         console.log("error", err)
//     //         res.send(err)
//     //     }
//     //     else {
//     //         res.redirect("/sp")
//     //     }
//     // })
// })


module.exports = router