const mongoose = require("mongoose")

const employeeSchema = new mongoose.Schema({

    firstName: { type: String, required: true, trim: true, },

    lastName: { type: String, required: true, trim: true, },

    gender: { type: String, required: true, enum: ["male", "female", "other"], trim: true },

    DOB: { type: String, required: true, trim: true },

    email: { type: String, required: true, unique: true, trim: true },

    mobile: { type: String, required: true, unique: true, trim: true },

    address: { type: String, required: true, trim: true },

    isDeleted: { type: Boolean, default: false, trim: true },

}, { timestamps: true })

module.exports = mongoose.model("Employee", employeeSchema)