const mongoose = require("mongoose")

const appointmentSchema = new mongoose.Schema({
    title: String,
    description: String
})

const Appointment = mongoose.model("Appointment", appointmentSchema)

module.exports = Appointment