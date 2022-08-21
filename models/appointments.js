const mongoose = require("mongoose")

const appointmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    serviceprovider: { type: String, required: true },
    customer: { type: String, required: true }
})

const Appointment = mongoose.model("Appointment", appointmentSchema)

module.exports = Appointment