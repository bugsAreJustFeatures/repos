require("dotenv").config()
const express = require("express")
const app = express()

app.set("view engine", "ejs")

app.use(express.urlencoded( { extended: true } ))

const routes = require("./routes/routes")
app.use("/", routes)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`I am listening on Port ${PORT}`)
})

