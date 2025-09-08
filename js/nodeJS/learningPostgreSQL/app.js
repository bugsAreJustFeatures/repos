require("dotenv").config()

const express = require("express")
const app = express()
const dbRoutes = require("./routes/dbRoutes")

const PORT = 3000 || process.env.PORT

app.set("view engine", "ejs") // tell express im using ejs

// allow to parse data through req.body
app.use(express.urlencoded({ extended: true }));

// tell express where to look for routes when the page gets visited - needs to come after urlencoded
app.use("/", dbRoutes)


app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Listening on port ${PORT}`)
    }
})