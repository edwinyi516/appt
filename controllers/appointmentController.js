const express = require("express")
const router = express.Router()
const Appointment = require("../models/appointments.js")
const app = express()

//INDEX
router.get("/", async (req, res) => {
    let appointments = await Appointment.find({})
    res.render("index.ejs", { appointments })
})

//NEW
router.get("/new", (req, res) => {
    res.render("new.ejs")
})

//SHOW
router.get("/:id", async (req, res) => {
    let appointment = await Product.findById(req.params.id)
    res.render("show.ejs", {
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
            res.redirect("/appointments")
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