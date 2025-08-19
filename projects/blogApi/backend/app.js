//use es6 modules (import and exports) since im using react
import dotenv from "dotenv";
dotenv.config();

import express from "express" ;
import session from "express-session";

import routes from "./routes/routes.js";

import passport from "passport";
import {authenticateUserWithJwt, createSessionWithUser} from "./controllers/passportController.js";

// create express app
const app = express();
app.use(express.json())// enable json reading in the express routes
const PORT = process.env.PORT || 3000;

//create session with user details
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.session());
createSessionWithUser(passport);

// app.use("/", (req, res, next) => {
//     console.log("headers.authorization: ", req.headers.authorization);
//     next();
// })
// check jwt is authentic
authenticateUserWithJwt(passport)

app.use("/", (req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

// tell express where routes are located
app.use("/", routes)

// make server
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});