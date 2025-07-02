const express = require("express")
const app = express()

// tell express to use ejs
app.set("view engine", "ejs")

// get data from form into req.body
app.use(express.urlencoded({ extended: true }));

// index route
const indexRouter = require("./routes/indexRoute")
app.use("/", indexRouter)

// form (/new) route
const formRouter = require("./routes/newMessageRoute")
app.use("/", formRouter)

app.listen(3000, () => {
    console.log("Running on port 3000")
})