const express = require("express")
const router = express.Router({ mergeParams: true })
const Appointment = require("../models/appointments.js")
const ServiceProvider = require("../models/serviceproviders.js")
const Customer = require("../models/customers.js")
const flatpickr = require("flatpickr")
const { ensureAuthenticated } = require("../config/auth.js")

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
router.get("/new", ensureAuthenticated, async (req, res) => {
    let serviceProvider = await ServiceProvider.findById(req.params.id)

    let bookedAppointmentsArray = []
    let afterTime = ""
    let bookedAppointments = await Appointment.find({ serviceProvider: `${req.params.id}` })
    for (i = 0; i < bookedAppointments.length; i++) {
        let newTest = bookedAppointments[i].chosenTime
        if (bookedAppointments[i].chosenTime.length === 6 && bookedAppointments[i].chosenTime[3] === "0") {
            newTest = bookedAppointments[i].chosenTime.split('')
            newTest[3] = "1"
            afterTime = newTest.join('')
        }
        else if (bookedAppointments[i].chosenTime.length === 6 && bookedAppointments[i].chosenTime[3] === "5") {
            newTest = bookedAppointments[i].chosenTime.split('')
            newTest[3] = "6"
            afterTime = newTest.join('')
        } 
        else if (bookedAppointments[i].chosenTime.length === 7 && bookedAppointments[i].chosenTime[4] === "0") {
            newTest = bookedAppointments[i].chosenTime.split('')
            newTest[4] = "1"
            afterTime = newTest.join('')
        } 
        else if (bookedAppointments[i].chosenTime.length === 7 && bookedAppointments[i].chosenTime[4] === "5") {
            newTest = bookedAppointments[i].chosenTime.split('')
            newTest[4] = "6"
            afterTime = newTest.join('')
        }
        bookedAppointmentsArray.push([bookedAppointments[i].chosenTime, afterTime]);
    }

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
        user: req.user,
        serviceProvider: serviceProvider,
        bookedAppointmentsArray: bookedAppointmentsArray,
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
router.post("/new", (req, res) => {
    Appointment.create(req.body, (err, createdAppointment) => {
        if (err) {
			console.log('error', err);
			res.send(err);
		} else {
            req.flash("success_msg", "Your appointment has been booked!")
            res.redirect("/dashboard")
		}
    })
})

//DESTROY
router.delete("/:id", (req, res) => {
    Appointment.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect("/dashboard")
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