// const mongoose = require("mongoose")
const employeeModel = require("../models/employeeModel.js")
const moment = require("moment")

const { isValidNumber, isValidName, isValidMobileNo, isValidEmailId, isValidDate, isValidObjectId } = require("../validation/validation.js")
const transactionModel = require("../models/transactionModel.js")


exports.createEmployee = async (req, res) => {
    try {
        const data = req.body
     
        if (Object.keys(data).length == 0) return res.status(400).send({
            status: false,
            msg: "Please mention some data"
        })
        
        let { firstName, lastName, gender, DOB, email, mobile, address, ...rest } = data
        
        if (Object.keys(rest).length > 0) return res.status(400).send({
            status: false,
            msg: "Mention these fields only:- { firstName, lastName, gender, DOB, email, mobile, address }"
        })
        
        if (!firstName) return res.status(400).send({
            status: false,
            msg: "Please mention firstName"
        })
        
        if (!lastName) return res.status(400).send({
            status: false,
            msg: "Please mention lastName"
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
        
        if (["male", "female", "other"].indexOf(gender) == -1) return res.status(400).send({
            status: false,
            msg: "Enter a valid gender 'male' or 'female' or 'other'",
        })
             
        if (!isValidName(firstName)) return res.status(400).send({
            status: false,
            msg: "firstName is invalid. It must be like this:--> 'Nishant' "
        })
        
        if (!isValidName(lastName)) return res.status(400).send({
            status: false,
            msg: "lastName is invalid. It must be like this:--> 'Gautam' "
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
        
        data.firstName = data.firstName.toLowerCase()

        data.lastName = data.lastName.toLowerCase()

        const saveData = await employeeModel.create(data)
        await transactionModel.create({fullName: saveData.firstName +" "+ saveData.lastName, employeeID: saveData._id, operation: "add"})
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

exports.getEmployeeWithID = async (req, res) => {
    try {
        let employeeId= req.params.id
        console.log(employeeId)
        let saveData = await employeeModel.findOne({ _id:employeeId,isDeleted: false })
        console.log(saveData)
        if (!saveData) return res.status(404).send({ status: false, msg: "No data found" })

            saveData.firstName = saveData.firstName[0].toUpperCase() + saveData.firstName.slice(1)

            saveData.lastName = saveData.lastName[0].toUpperCase() + saveData.lastName.slice(1)

  
        return res.status(200).send({ status: true, msg:"Particular Employee", data: saveData })
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

        if (Object.keys(rest).length > 0) return res.status(400).send({
            status: false,
            msg: "You can only update these fields:- { firstName, lastName, gender, DOB, email, mobile, address }"
        })

        let saveData = await employeeModel.findOne({ _id: employeeID, isDeleted: false })

        if (!saveData) return res.status(404).send({ status: false, msg: "No data found with this employeeID" })

        if (firstName) {

            if (!isValidName(firstName)) return res.status(400).send({
                status: false,
                msg: "firstName is invalid. It must be like this:--> 'Nishant' "
            })

            saveData.firstName = firstName.toLowerCase()
        }

        if (lastName) {

            if (!isValidName(lastName)) return res.status(400).send({
                status: false,
                msg: "lastName is invalid. It must be like this:--> 'Gautam' "
            })

            saveData.lastName = lastName.toLowerCase()
        }

        if (gender) {
          
            if (["male", "female", "other"].indexOf(gender) == -1) return res.status(400).send({
                status: false,
                message: "Enter a valid gender 'male' or 'female' or 'other'",
            })

            saveData.gender = gender
        }

        if (DOB) {
            if (!isValidDate(DOB)) return res.status(400).send({
                status: false,
                msg: "DOB is invalid. It must be like this:--> '1999-03-01' "
            })

            DOB = new Date().toISOString()
            DOB = DOB
            saveData.DOB = DOB
        }

        if (email) {
         
            if (!isValidEmailId(email)) return res.status(400).send({
                status: false,
                msg: "email ID is invalid. It must be like this:--> 'nk123@gmail.com' "
            })

            saveData.email = email
        }

        if (mobile) {
            if (!isValidMobileNo(mobile)) return res.status(400).send({
                status: false,
                msg: "mobile number is invalid. It must be Indian No:--> '9058503601' "
            })

            saveData.mobile = mobile
        }

        if (address) {
            if (!isValidNumber(address)) return res.status(400).send({
                status: false,
                msg: "address can't be a number"
            })

            saveData.address = address
        }

        let updateData = await employeeModel.findOneAndUpdate({ _id: employeeID }, saveData, { new: true, upsert: true })
        await transactionModel.create({fullName: updateData.firstName +" "+ updateData.lastName, employeeID: updateData._id, operation: "edit"})

        return res.status(200).send({ status: true, msg: "Employee's Data Update Successfully", data: updateData })
    } catch (err) { return res.status(500).send({ status: false, msg: err.message }) }
} 


exports.deleteEmployee= async (req, res)=> {
    try{
        let data = req.body

        if (Object.keys(data).length==0) return res.status(400).send({
            status: false,
            msg: "Please mention employeeID in the req.body"
        })
          
        let {employeeID} = data
        
        if (!isValidObjectId(employeeID)) return res.status(400).send({
            status: false,
            msg: "employeeID is invalid. It must be object ID like this:- '63aca753d12c8ed9579313d7'"
        })

        let  alreadyDeleted = await employeeModel.findOne({ _id: employeeID })
        if (!alreadyDeleted) return res.status(404).send({
            status: false,
            msg: "This employeeID is not exist"
        })

        if (alreadyDeleted.isDeleted === true) return res.status(400).send({
            status: false,
            msg: "Employee Already Deleted"
        })
        let deleteData= await employeeModel.findOneAndUpdate(
            { _id: employeeID },
            { $set: { isDeleted: true, deletedAt: moment().format("YYYY-MM-DDThh:mm:ss.SSS[Z]") } },
            { new: true, upsert: true, strict: false }
        )
        await transactionModel.create({fullName: deleteData.firstName +" "+ deleteData.lastName, employeeID: deleteData._id, operation: "delete"})
        return res.status(200).send({ status: true, msg: "Employee Deleted Successfully" })

    } catch (err) { return res.status(500).send({ status: false, msg: err.message }) }
}