//use es6 modules (import and exports) since im using react
import dotenv from "dotenv";
dotenv.config();

import express from "express" ;
import session from "express-session";

import routes from "./routes/routes.js";

import passport from "passport";
import {authenticateUserWithJwt, createSessionWithUser} from "./controllers/passportController.js";

import cors from "cors";
const PORT = process.env.PORT || 3000;

// create express app
const app = express();

//allow frontend to communicate across ports
app.use(cors({
    origin: "http://localhost:5173/", // this is react port and makes it so only this port can communicate, limiting chance of an attack
}));

//allow use of json
app.use(express.json())// enable json reading in the express routes

//create session with user details
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.session());
createSessionWithUser(passport);

// check jwt is authentic
authenticateUserWithJwt(passport)

// tell express where routes are located, and then what to do when a request with /api gets called
app.use("/api", routes);

// make server
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});