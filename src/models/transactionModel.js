const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({

    transactionID: { type: String, required: true, unique: true, trim: true },

    employeeID: { type: String, required: true, unique: true, trim: true },

    fullName: { type: String, required: true, trim: true },

    amount: { type: Number, required: true, trim: true },

    month: { type: Date, required: true, trim: true },

    status: { type: String, enum: ["pending", "successful", "failed"], default: "pending", trim: true },


}, { timestamps: true })

module.exports = mongoose.model("Transaction", transactionSchema)