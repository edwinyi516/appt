const express = require("express")
const router = express.Router()
const Appointment = require("../models/appointments.js")
const app = express()

//INDEX
router.get("/", async (req, res) => {
    let appointments = await Appointment.find({})
    res.render("index.ejs", { appointments })
})

module.exports = router