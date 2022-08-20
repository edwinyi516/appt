const mongoose = require("mongoose")

const serviceproviderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    company: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }
})

const ServiceProvider = mongoose.model("ServiceProvider", serviceproviderSchema)

module.exports = ServiceProvider