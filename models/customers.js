const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    img: { data: Buffer, contentType: String },
    usertype: { type: String, required: true, default: "customer" }
})

const Customer = mongoose.model("Customer", customerSchema)

module.exports = Customer