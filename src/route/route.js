const express= require("express")
const {createEmployee, getEmployee}= require("../controllers/employeeController.js")
const router= express.Router()


router.post("/employee", createEmployee)
router.get("/employee", getEmployee)
// router.put("/employee", updateEmployee)
// router.delete("/employee", deleteEmployee)



// router.post("/transaction", createTransaction)
// router.get("/transaction", getTransaction)
// router.put("/transaction", updateTransaction)
// router.delete("/transaction", deleteTransaction)



module.exports= router






