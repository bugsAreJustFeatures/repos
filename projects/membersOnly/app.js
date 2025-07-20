//allow env
require("dotenv").config()

// import modules
const express = require("express")
const app = express()
const passport = require("passport")
const session = require("express-session")

//tell exporess how i want to set up
app.set("view engine", "ejs")
app.use(express.urlencoded( { extended: false } ))

// pass session objects and options
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))
//allows passport to make a session available
app.use(passport.session())

//use module to make the session how i want, in this case its a local strategy
const createSession = require("./controllers/sessionController");
createSession(passport)

//show express where to find the routes
const routes = require("./routes/routes")
app.use("/", routes)

//local host setup
const PORT = 3000 // put in .env
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})