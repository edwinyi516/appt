const express = require("express")
const router = express.Router({ mergeParams: true })
const ServiceProvider = require("../models/serviceproviders.js")

const appointmentController = require("../controllers/appointmentController.js")
const Appointment = require("../models/appointments")


//INDEX
router.get("/", async (req, res) => {
    let serviceProviders = await ServiceProvider.find({})
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


module.exports = router