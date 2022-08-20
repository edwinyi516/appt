const mongoose = require("mongoose")

const appointmentSchema = new mongoose.Schema({
    title: String,
    date: Date,
    description: String
})

const Appointment = mongoose.model("Appointment", appointmentSchema)

module.exports = Appointment