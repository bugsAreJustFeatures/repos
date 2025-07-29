require("dotenv").config();
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded( { extended: true } ) );

const routes = require("./routes/routes");
app.use("/", routes);

app.listen(3000, () => {
    console.log("Im a server thats running");
})