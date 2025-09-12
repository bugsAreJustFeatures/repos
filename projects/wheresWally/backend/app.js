//import dotenv and use config 
import dotenv from "dotenv";
dotenv.config({ path: "./database/.env" });

// main imports
import express from "express";
import cors from "cors";

// jwt and passport imports
import passport from "passport";
import authoriseWithJwt from "./controllers/jwt.js";

// routes imports
import routes from "./routes/routes.js"

// create express server
const app = express();

// express middleware that needs to run every request
// tells cors to use this url has the default url instead of having to write it out every route
app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(express.json());
// authorise jwt
authoriseWithJwt(passport);
// tell express where routes are
app.use("/api", routes);

// if ive pushed to production it will use a premade PORT env otherwise use my local host 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});