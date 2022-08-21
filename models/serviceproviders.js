const mongoose = require("mongoose")

const serviceproviderSchema = new mongoose.Schema({
    name: { type: String, required: true },
    company: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    usertype: { type: String, required: true, default: "serviceprovider" }
})

const ServiceProvider = mongoose.model("ServiceProvider", serviceproviderSchema)

module.exports = ServiceProvider