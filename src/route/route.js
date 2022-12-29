const express= require("express")
const {createEmployee, getEmployee, getEmployeeWithID, updateEmployee, deleteEmployee}= require("../controllers/employeeController.js")
const router= express.Router()


router.post("/employee", createEmployee)
router.get("/employee/:id", getEmployeeWithID)
router.get("/employee", getEmployee)
router.put("/employee", updateEmployee)
router.delete("/employee", deleteEmployee)



// router.post("/transaction", createTransaction)
// router.get("/transaction", getTransaction)
// router.put("/transaction", updateTransaction)
// router.delete("/transaction", deleteTransaction)

router.all('/**', function (req, res) {
    res.status(404).send({
        status: false,
        message: "The api you requested is not available. Make sure your endpoint is correct or not."
    })
})



module.exports= router






