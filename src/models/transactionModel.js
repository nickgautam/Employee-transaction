const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({

    employeeID: { type: String, required: true, trim: true },

    fullName: { type: String, required: true, trim: true },

    operation: { type: String, required: true, trim: true },

}, { timestamps: true })

module.exports = mongoose.model("Transaction", transactionSchema)