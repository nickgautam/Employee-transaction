const express = require("express")
const mongoose = require("mongoose")
const route = require("./route/route.js")

const app = express()

app.use(express.json())

mongoose.connect("mongodb+srv://NishantGautam:Ng123@cluster0.45vj3.mongodb.net/Employee-Transaction-DB",
    {
        useNewUrlParser: true
    })

    .then(() => console.log("Hello Nishant! MongoDB is Connected."))
    .catch((err) => console.log(err))

app.use("/", route)

app.listen(process.env.PORT||3000, function(){
    console.log("Express App is running on port "+(process.env.PORT||3000))
})