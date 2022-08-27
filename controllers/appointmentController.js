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
    res.render("newAppointment.ejs", {
        serviceProvider: serviceProvider,
        user: req.user,
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