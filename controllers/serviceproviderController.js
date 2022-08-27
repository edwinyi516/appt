const express = require("express")
const router = express.Router({ mergeParams: true })
const ServiceProvider = require("../models/serviceproviders.js")

const Appointment = require("../models/appointments")
const appointmentController = require("../controllers/appointmentController.js")


//INDEX
router.get("/", async (req, res) => {
    let serviceProviders = await ServiceProvider.find({})
    res.render("indexSP.ejs", {
        serviceProviders: serviceProviders,
        user: req.user
    })
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

//UPDATE
router.put("/updateavailability", (req, res) => {
    if (req.body.availableSunday === 'on') {
		req.body.availableSunday = true;
	} else {
		req.body.availableSunday = false;
	}
    if (req.body.availableMonday === 'on') {
		req.body.availableMonday = true;
	} else {
		req.body.availableMonday = false;
	}
    if (req.body.availableTuesday === 'on') {
		req.body.availableTuesday = true;
	} else {
		req.body.availableTuesday = false;
	}
    if (req.body.availableWednesday === 'on') {
		req.body.availableWednesday = true;
	} else {
		req.body.availableWednesday = false;
	}
    if (req.body.availableThursday === 'on') {
		req.body.availableThursday = true;
	} else {
		req.body.availableThursday = false;
	}
    if (req.body.availableFriday === 'on') {
		req.body.availableFriday = true;
	} else {
		req.body.availableFriday = false;
	}
    if (req.body.availableSaturday === 'on') {
		req.body.availableSaturday = true;
	} else {
		req.body.availableSaturday = false;
	}
    ServiceProvider.findByIdAndUpdate(req.user.id, req.body, { new: true }, (err, updatedSP) => {
        req.flash("success_msg", "Changes have been saved")
        res.redirect("/dashboard")
    })
})


module.exports = router