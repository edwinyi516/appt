const express = require("express")
const router = express.Router({ mergeParams: true })
const Appointment = require("../models/appointments.js")
const ServiceProvider = require("../models/serviceproviders.js")
const Customer = require("../models/customers.js")
const flatpickr = require("flatpickr")

//INDEX
router.get("/", async (req, res) => {
    // let customer = await Customer.findById(req.params.id)
    let appointments = await Appointment.find({ serviceprovider: `${req.params.id}` })
    let serviceProvider = await ServiceProvider.findById(req.params.id)
    res.render("indexA_SP.ejs", {
        serviceProvider: serviceProvider,
        user: req.user,
        appointments: appointments
    })
})

//NEW
router.get("/new", async (req, res) => {
    let serviceProvider = await ServiceProvider.findById(req.params.id)
    let monday = 10
    let tuesday = 10
    let wednesday = 10
    let thursday = 10
    let friday = 10
    let saturday = 10
    if (serviceProvider.availableSunday === false) {
        sunday = 0
    }
    if (serviceProvider.availableMonday === false) {
        monday = 1
    }
    if (serviceProvider.availableTuesday === false) {
        tuesday = 2
    }
    if (serviceProvider.availableWednesday === false) {
        wednesday = 3
    }
    if (serviceProvider.availableThursday === false) {
        thursday = 4
    }
    if (serviceProvider.availableFriday === false) {
        friday = 5
    }
    if (serviceProvider.availableSaturday === false) {
        saturday = 6
    }
    res.render("newAppointment.ejs", {
        serviceProvider: serviceProvider,
        user: req.user,
        sunday: sunday,
        monday: monday,
        tuesday: tuesday,
        wednesday: wednesday,
        thursday: thursday,
        friday: friday,
        saturday: saturday
    })
})

//SHOW
router.get("/:id", async (req, res) => {
    let appointment = await Appointment.findById(req.params.id)
    res.render("showA.ejs", {
        appointment: appointment
    })
})

//CREATE
router.post("/", (req, res) => {
    Appointment.create(req.body, (err, createdAppointment) => {
        if(err) {
            console.log("error", err)
            res.send(err)
        }
        else {
            res.redirect(`/sp/${req.params.id}/appointments`)
        }
    })
})

//DESTROY
router.delete("/:id", (req, res) => {
    Appointment.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect("/appointments")
    })
})

//EDIT
router.get("/:id/edit", (req, res) => {
    Appointment.findById(req.params.id, (err, foundAppointment) => {
        res.render("edit.ejs", { appointment: foundAppointment })
    })
})

//UPDATE
router.put("/:id", (req, res) => {
    Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedAppointment) => {
        res.redirect(`/appointments/${req.params.id}`)
    })
})

module.exports = router