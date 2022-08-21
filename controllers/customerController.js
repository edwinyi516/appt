const express = require("express")
const router = express.Router({ mergeParams: true })
const Customer = require("../models/customers.js")

const appointmentController = require("../controllers/appointmentController.js")
const Appointment = require("../models/appointments")

//INDEX
router.get("/", (req, res) => {
    res.send("Customer")
})

//SHOW
router.get("/:id", async (req, res) => {
    let customer = await Customer.findById(req.params.id) 
    res.render("showC.ejs", {
        customer: customer
    })
})

//CREATE
router.post("/", (req, res) => {
    Customer.create(req.body, (err, createdCustomer) => {
        if(err) {
            console.log("error", err)
            res.send(err)
        }
        else {
            res.redirect(`/customer/${createdCustomer.id}`)
        }
    })
})


module.exports = router