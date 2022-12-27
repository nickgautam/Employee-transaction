// const mongoose = require("mongoose")
const employeeModel = require("../models/employeeModel.js")
const moment = require("moment")

const { isValidString, isValidNumber, isValidName, isValidMobileNo, isValidEmailId, isValidDate, isValidEmployeeId } = require("../validation/validation.js")


exports.createEmployee = async (req, res) => {
    try {
        const data = req.body

        data.firstName = data.firstName.toLowerCase()

        data.lastName = data.lastName.toLowerCase()

        let { firstName, lastName, employeeID, gender, DOB, email, mobile, address, ...rest } = data

        if (Object.keys(data).length == 0) return res.status(400).send({
            status: false,
            msg: "Please mention some data"
        })

        if (Object.keys(rest).length > 0) return res.status(400).send({
            status: false,
            msg: "Mention these fields only:- { firstName, lastName, employeeID, gender, DOB, email, mobile, address }"
        })

        if (!firstName) return res.status(400).send({
            status: false,
            msg: "Please mention firstName"
        })

        if (!lastName) return res.status(400).send({
            status: false,
            msg: "Please mention lastName"
        })

        if (!employeeID) return res.status(400).send({
            status: false,
            msg: "Please mention employeeID"
        })

        if (!gender) return res.status(400).send({
            status: false,
            msg: "Please mention gender"
        })

        if (!DOB) return res.status(400).send({
            status: false,
            msg: "Please mention DOB"
        })

        if (!email) return res.status(400).send({
            status: false,
            msg: "Please mention email"
        })

        if (!mobile) return res.status(400).send({
            status: false,
            msg: "Please mention mobile number"
        })

        if (!address) return res.status(400).send({
            status: false,
            msg: "Please mention address"
        })


        if (!isValidString(firstName)) return res.status(400).send({
            status: false,
            msg: "firstName must be string. Example:--> 'Nishant' "
        })

        if (!isValidString(lastName)) return res.status(400).send({
            status: false,
            msg: "lastName must be string. Example:--> 'Gautam' "
        })

        if (!isValidString(employeeID)) return res.status(400).send({
            status: false,
            msg: "employeeID must be string. Example:--> 'UUID' "
        })

        if (!isValidString(gender)) return res.status(400).send({
            status: false,
            msg: "gender must be string. Example:--> 'male' or 'female' or 'other' "
        })

        if (["male", "female", "other"].indexOf(gender) == -1) return res.status(400).send({
            status: false,
            message: "Enter a valid gender 'male' or 'female' or 'other'",
        })

        if (!isValidString(email)) return res.status(400).send({
            status: false,
            msg: "email must be string. Example:--> 'nk123@gmail.com' "
        })

        if (!isValidString(address)) return res.status(400).send({
            status: false,
            msg: "address must be string. Example:--> 'Rohini Sector 63' "
        })

        if (!isValidName(firstName)) return res.status(400).send({
            status: false,
            msg: "firstName is invalid. It must be like this:--> 'Nishant' "
        })

        if (!isValidName(lastName)) return res.status(400).send({
            status: false,
            msg: "lastName is invalid. It must be like this:--> 'Gautam' "
        })

        if (!isValidEmployeeId(employeeID)) return res.status(400).send({
            status: false,
            msg: "employeeID is invalid. It must be like this:--> 'UUID' "
        })

        if (!isValidDate(DOB)) return res.status(400).send({
            status: false,
            msg: "DOB is invalid. It must be like this:--> '1999-03-01' "
        })

        DOB = new Date().toISOString()
        DOB = DOB

        if (!isValidEmailId(email)) return res.status(400).send({
            status: false,
            msg: "email ID is invalid. It must be like this:--> 'nk123@gmail.com' "
        })

        if (!isValidMobileNo(mobile)) return res.status(400).send({
            status: false,
            msg: "mobile number is invalid. It must be Indian No:--> '9058503601' "
        })

        if (!isValidNumber(address)) return res.status(400).send({
            status: false,
            msg: "address can't be a number"
        })

        const registerMobileNumber = await employeeModel.find({ mobile: mobile })
        if (registerMobileNumber.length != 0) return res.status(400).send({
            status: false,
            msg: "mobile number is already registered"
        })

        const registerEmailID = await employeeModel.find({ email: email })
        if (registerEmailID.length != 0) return res.status(400).send({
            status: false,
            msg: "email ID is already registered"
        })

        const registerEmployeeID = await employeeModel.find({ employeeID: employeeID })
        if (registerEmployeeID.length != 0) return res.status(400).send({
            status: false,
            msg: "employeeID is already registered"
        })

        const saveData = await employeeModel.create(data)
        return res.status(201).send({
            status: true,
            msg: "Employee Created Successfully",
            data: saveData
        })

    } catch (err) { return res.status(500).send({ status: false, msg: err.message }) }
}


exports.getEmployee = async (req, res) => {
    try {
        let saveData = await employeeModel.find({ isDeleted: false })

        if (saveData.length == 0) return res.status(404).send({ status: false, msg: "No data found" })

        for (let i = 0; i < saveData.length; i++) {

            saveData[i].firstName = saveData[i].firstName[0].toUpperCase() + saveData[i].firstName.slice(1)

            saveData[i].lastName = saveData[i].lastName[0].toUpperCase() + saveData[i].lastName.slice(1)

        }
        return res.status(200).send({ status: true, msg: "All Employee's List", data: saveData })
    } catch (err) { return res.status(500).send({ status: false, msg: err.message }) }
}


exports.updateEmployee = async (req, res) => {
    try {
        let data = req.body

        let { firstName, lastName, employeeID, gender, DOB, email, mobile, address, ...rest } = data

        if (Object.keys(data).length == 0) return res.status(400).send({
            status: false,
            msg: "Please mention some data"
        })

        if (Object.keys(data).length == 1 && employeeID) return res.status(400).send({
            status: false,
            msg: "Please mention other data for updation along with employeeID. You can't update employeeID"
        })

        if (Object.keys(rest).length > 0) return res.status(400).send({
            status: false,
            msg: "You can only update these fields:- { firstName, lastName, gender, DOB, email, mobile, address }"
        })

        if (!employeeID) return res.status(400).send({
            status: false,
            msg: "Please mention employeeID if you want to update employee's data"
        })

        if (!isValidString(employeeID)) return res.status(400).send({
            status: false,
            msg: "employeeID must be string. Example:--> 'UUID' "
        })

        if (!isValidEmployeeId(employeeID)) return res.status(400).send({
            status: false,
            msg: "employeeID is invalid. It must be like this:--> 'UUID' "
        })

        let saveData = await employeeModel.findOne({ employeeID: employeeID, isDeleted: false })

        if (!saveData) return res.status(404).send({ status: false, msg: "No data found with this employeeID" })

        if (data.hasOwnProperty("firstName")) {

            if (!isValidString(firstName)) return res.status(400).send({
                status: false,
                msg: "firstName must be string. Example:--> 'Nishant' "
            })

            if (!isValidName(firstName)) return res.status(400).send({
                status: false,
                msg: "firstName is invalid. It must be like this:--> 'Nishant' "
            })

            saveData.firstName = firstName.toLowerCase()
        }

        if (data.hasOwnProperty("lastName")) {

            if (!isValidString(lastName)) return res.status(400).send({
                status: false,
                msg: "lastName must be string. Example:--> 'Gautam' "
            })

            if (!isValidName(lastName)) return res.status(400).send({
                status: false,
                msg: "lastName is invalid. It must be like this:--> 'Gautam' "
            })

            saveData.lastName = lastName.toLowerCase()
        }

        if (data.hasOwnProperty("gender")) {
            if (!isValidString(gender)) return res.status(400).send({
                status: false,
                msg: "gender must be string. Example:--> 'male' or 'female' or 'other' "
            })

            if (["male", "female", "other"].indexOf(gender) == -1) return res.status(400).send({
                status: false,
                message: "Enter a valid gender 'male' or 'female' or 'other'",
            })

            saveData.gender = gender
        }

        if (data.hasOwnProperty("DOB")) {
            if (!isValidDate(DOB)) return res.status(400).send({
                status: false,
                msg: "DOB is invalid. It must be like this:--> '1999-03-01' "
            })

            DOB = new Date().toISOString()
            DOB = DOB
            saveData.DOB = DOB
        }

        if (data.hasOwnProperty("email")) {
            if (!isValidString(email)) return res.status(400).send({
                status: false,
                msg: "email must be string. Example:--> 'nk123@gmail.com' "
            })

            if (!isValidEmailId(email)) return res.status(400).send({
                status: false,
                msg: "email ID is invalid. It must be like this:--> 'nk123@gmail.com' "
            })

            // According to requirement
            // const registerEmailID = await employeeModel.find({ email: email })
            // if (registerEmailID.length != 0) return res.status(400).send({
            //     status: false,
            //     msg: "email ID is already present. Please mention another email for updation"
            // })

            saveData.email = email
        }

        if (data.hasOwnProperty("mobile")) {
            if (!isValidMobileNo(mobile)) return res.status(400).send({
                status: false,
                msg: "mobile number is invalid. It must be Indian No:--> '9058503601' "
            })

            // According to requirement
            // const registerMobileNumber = await employeeModel.find({ mobile: mobile })
            // if (registerMobileNumber.length != 0) return res.status(400).send({
            //     status: false,
            //     msg: "mobile number is already present. Please mention another mobile no for updation"
            // })

            saveData.mobile = mobile
        }

        if (data.hasOwnProperty("address")) {
            if (!isValidString(address)) return res.status(400).send({
                status: false,
                msg: "address must be string. Example:--> 'Rohini Sector 63' "
            })

            if (!isValidNumber(address)) return res.status(400).send({
                status: false,
                msg: "address can't be a number"
            })

            saveData.address = address
        }

        let updateData = await employeeModel.findOneAndUpdate({ employeeID: employeeID }, saveData, { new: true, upsert: true })

        return res.status(200).send({ status: true, msg: "Employee's Data Update Successfully", data: updateData })
    } catch (err) { return res.status(500).send({ status: false, msg: err.message }) }
} 


exports.deleteEmployee= async (req, res)=> {
    try{
        let employeeID = req.body.employeeID

        if (!employeeID) return res.status(400).send({
            status: false,
            msg: "Please mention employeeID in the req.body"
        })

        let  alreadyDeleted = await employeeModel.findOne({ employeeID: employeeID })
        if (!alreadyDeleted) return res.status(404).send({
            status: false,
            msg: "This employeeID is not exist"
        })

        if (alreadyDeleted.isDeleted === true) return res.status(400).send({
            status: false,
            msg: "Employee Already Deleted"
        })
        await employeeModel.findOneAndUpdate(
            { employeeID: employeeID },
            { $set: { isDeleted: true, deletedAt: moment().format("YYYY-MM-DDThh:mm:ss.SSS[Z]") } },
            { new: true, upsert: true, strict: false }
        )
        return res.status(200).send({ status: true, msg: "Employee Deleted Successfully" })

    } catch (err) { return res.status(500).send({ status: false, msg: err.message }) }
}