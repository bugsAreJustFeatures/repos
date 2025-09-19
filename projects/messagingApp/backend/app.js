// allow use of enironment variables through dotenv 
import { config } from "dotenv";
config({ path: "./database/.env" }); // path to the env file

import router from "./routes/routes.js"; // import routes

const PORT = process.env.PORT || 3000; // choose between either the env.PORT or localhost:3000

import express from "express"; // import express server
import cors from "cors"; // import cors

const app = express(); // initialise the server

// allow cors
app.use(cors({
    origin: "http://localhost:5173"
}));

//allow json reading across routes and between frontend and backend such as through forms
app.use(express.json());

// tell express where to find routes and what to append the routes onto
app.use("/api", router);

// get correct port number for server to listen for requests
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});