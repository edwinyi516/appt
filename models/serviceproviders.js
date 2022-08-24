const mongoose = require("mongoose")

const serviceproviderSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    company: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    usertype: { type: String, default: "serviceprovider" }
})

const ServiceProvider = mongoose.model("ServiceProvider", serviceproviderSchema)

module.exports = ServiceProvider