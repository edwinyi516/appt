const express = require("express")
const router = express.Router({ mergeParams: true })
const Customer = require("../models/customers.js")

const Appointment = require("../models/appointments")
const appointmentController = require("../controllers/appointmentController.js")


//INDEX
router.get("/", (req, res) => {
    res.send("Customer")
})

//RE-ROUTE TO APPOINTMENT CONTROLLER
router.use("/:id/appointments", appointmentController, (req, res) => {
    Appointment.findById(req.params.id, () => {
        res.send("Appointments page")
    })
})

//SHOW
router.get("/:id", async (req, res) => {
    let customer = await Customer.findById(req.params.id) 
    res.render("showC.ejs", {
        customer: customer
    })
})


module.exports = router