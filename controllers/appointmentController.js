const express = require("express")
const router = express.Router({ mergeParams: true })
const Appointment = require("../models/appointments.js")
const ServiceProvider = require("../models/serviceproviders.js")
const Customer = require("../models/customers.js")
const { ensureAuthenticated } = require("../config/auth.js")


//NEW
router.get("/new", ensureAuthenticated, async (req, res) => {
    let serviceProvider = await ServiceProvider.findById(req.params.id)
    let bookedAppointmentsArray = []
    let joinedTime = ""
    let bookedAppointments = await Appointment.find({ serviceProvider: `${req.params.id}` })
    for (i = 0; i < bookedAppointments.length; i++) {
        let newTime = bookedAppointments[i].chosenTime
        if (bookedAppointments[i].chosenTime.length === 6 && bookedAppointments[i].chosenTime[3] === "0") {
            newTime = bookedAppointments[i].chosenTime.split('')
            newTime[3] = "1"
            joinedTime = newTime.join('')
        }
        else if (bookedAppointments[i].chosenTime.length === 6 && bookedAppointments[i].chosenTime[3] === "5") {
            newTime = bookedAppointments[i].chosenTime.split('')
            newTime[3] = "6"
            joinedTime = newTime.join('')
        } 
        else if (bookedAppointments[i].chosenTime.length === 7 && bookedAppointments[i].chosenTime[4] === "0") {
            newTime = bookedAppointments[i].chosenTime.split('')
            newTime[4] = "1"
            joinedTime = newTime.join('')
        } 
        else if (bookedAppointments[i].chosenTime.length === 7 && bookedAppointments[i].chosenTime[4] === "5") {
            newTime = bookedAppointments[i].chosenTime.split('')
            newTime[4] = "6"
            joinedTime = newTime.join('')
        }
        bookedAppointmentsArray.push([bookedAppointments[i].chosenTime, joinedTime]);
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

//DESTROY (CANCEL)
router.delete("/:id/cancel", (req, res) => {
    Appointment.findByIdAndRemove(req.params.id, (err, data) => {
        req.flash("success_msg", "Your appointment has been cancelled")
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