// app.js
const express = require("express");
const app = express();
const usersRouter = require("./routes/usersRouter");


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Express app listening on port ${PORT}!`)
    }
}
    );
