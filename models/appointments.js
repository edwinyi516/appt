const mongoose = require("mongoose")

const appointmentSchema = new mongoose.Schema({
    chosenAppointmentTypeDuration: { type: String, required: true },
    chosenDate: { type: String, required: true },
    chosenTime: { type: String, required: true },
    serviceprovider: { type: String, required: true },
    customer: { type: String, required: true }
})

const Appointment = mongoose.model("Appointment", appointmentSchema)

module.exports = Appointment