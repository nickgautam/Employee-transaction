const mongoose= require("mongoose")
const employeeModel= require("../models/employeeModel.js")
const moment = require("moment")

const { isValidString, isValidNumber, isValidName, isValidMobileNo, isValidEmailId, isValidDate, isValidEmployeeId } = require("../validation/validation.js")


exports.createEmployee= async (req,res)=>{
    try{
        const data= req.body
        let {firstName, lastName, employeeID, gender, DOB, email, mobile, address, ...rest}=data
        
        if (Object.keys(data).length == 0) return res.status(400).send({
            status: false,
            msg: "Please mention some data"
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
        
        if(!gender)return res.status(400).send({
            status:false, 
            msg:"Please mention gender"
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

        const registerCustomerID = await employeeModel.find({ employeeID: employeeID })
        if (registerCustomerID.length != 0) return res.status(400).send({
            status: false,
            msg: "employeeID is already registered"
        })

        const saveData = await employeeModel.create(data)
        return res.status(201).send({
            status: true,
            msg: "Employee Created Successfully",
            data: saveData
        })

    }catch(err){return res.status(500).send({status:false, msg:err.message})}
}