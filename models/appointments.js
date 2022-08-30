const mongoose = require("mongoose")

const appointmentSchema = new mongoose.Schema({
    chosenAppointmentTypeDuration: { type: String, required: true },
    chosenAppointmentType: { type: String, required: true },
    chosenDate: { type: Date, required: true },
    chosenTime: { type: String, required: true },
    serviceprovider: { type: String, required: true },
    serviceproviderName: { type: String, required: true },
    serviceproviderPhone: { type: String, required: true },
    serviceproviderEmail: { type: String, required: true },
    customer: { type: String, required: true },
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerEmail: { type: String, required: true }
})

const Appointment = mongoose.model("Appointment", appointmentSchema)

module.exports = Appointment