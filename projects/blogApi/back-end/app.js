require("dotenv").config();
const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const passportController = require("./controllers/passportController");

// config for session
app.use(session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false, 
    saveUninitialized: false,
}));

//initialise the session
app.use(passport.session())

// tell express to allow the use of encoded values, such as from forms (req.body)
app.use(express.urlencoded({ extended: true }));

// create the session with passport in module
passportController.createSession(passport);

// allow use of currentUser
app.use("/", (req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

// get jwt after authorising user
passportController.authoriseWithJWT(passport);

//tell express where the routes are and what to do with each url request
const routes = require("./routes/routes");
app.use("/", routes);

// run server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running!");
});