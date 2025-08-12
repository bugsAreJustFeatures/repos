require("dotenv").config();
const express = require("express");
const app = express();
const passport = require("passport");
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { PrismaClient } = require("/generated/prisma");


//session setup
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: false,
    store: new PrismaSessionStore(
        new PrismaClient(),
        {
            checkPeriod: 2 * 60 * 1000, //ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    ),
}));

//create the session space
app.use(passport.session());

//make the session for the user
const createSession = require("./controllers/sessionController");
createSession(passport);

//tell express about ejs
app.set("view engine", "ejs");
app.use(express.urlencoded( { extended: true } ) );

//allow use of res.locals.currentUser
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

//tell express where to find routes
const routes = require("./routes/routes");
app.use("/", routes);

//setup local server
let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("App is running");
});