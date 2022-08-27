const mongoose = require("mongoose")

const serviceproviderSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    company: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    description: String,
    availableSunday: { type: Boolean, default: false },
    sundayStart: { type: String, default: "08:00" },
    sundayEnd: { type: String, default: "16:00" },
    availableMonday: { type: Boolean, default: false },
    mondayStart: { type: String, default: "08:00" },
    mondayEnd: { type: String, default: "16:00" },
    availableTuesday: { type: Boolean, default: false },
    tuesdayStart: { type: String, default: "08:00" },
    tuesdayEnd: { type: String, default: "16:00" },
    availableWednesday: { type: Boolean, default: false },
    wednesdayStart: { type: String, default: "08:00" },
    wednesdayEnd: { type: String, default: "16:00" },
    availableThursday: { type: Boolean, default: false },
    thursdayStart: { type: String, default: "08:00" },
    thursdayEnd: { type: String, default: "16:00" },
    availableFriday: { type: Boolean, default: false },
    fridayStart: { type: String, default: "08:00" },
    fridayEnd: { type: String, default: "16:00" },
    availableSaturday: { type: Boolean, default: false },
    saturdayStart: { type: String, default: "08:00" },
    saturdayEnd: { type: String, default: "16:00" },
    unavailableDates: { type: Array, default: [] },
    appointmentTypes: [{ title: { type: String, required: true }, description: { type: String, required: true }, duration: { type: Number, required: true } }],
    usertype: { type: String, default: "serviceprovider" }
})

const ServiceProvider = mongoose.model("ServiceProvider", serviceproviderSchema)

module.exports = ServiceProvider