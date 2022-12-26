const mongoose = require("mongoose")


//******************* validation for Object ID ******************/
function isValidObjectId(value) {
    return mongoose.Types.ObjectId.isValid(value)
}

//******************* validation for Empty String ******************/
function isValidString(value) {
    if (value === "undefined" || value === null || value === "") return false
    if (typeof value !== "string" || value.trim().length == 0) return false
    return true
}

//******************* validation for Number ******************/
function isValidNumber(value) {
    return isNaN(value)
}

//******************* validation for Name ******************/
function isValidName(value) {
    return /^[A-Za-z. ]+$/.test(value)
}

//******************* validation for Mobile No ******************/
function isValidMobileNo(value) {
    return /^[0]?[6789]\d{9}$/.test(value)
}

//******************* validation for Email Id ******************/
function isValidEmailId(value) {
    return /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(value)
}

//******************* validation for Date of Birth ******************/
function isValidDate(value) {
    return /^\d{4}-\d{2}-\d{2}$/.test(value)
}

//******************* validation for employeeId ******************/
function isValidEmployeeId(value) {
    return /^[A-Z]{4}$/.test(value)
}

module.exports = { isValidObjectId, isValidString, isValidNumber, isValidName, isValidMobileNo, isValidEmailId, isValidDate, isValidEmployeeId }









