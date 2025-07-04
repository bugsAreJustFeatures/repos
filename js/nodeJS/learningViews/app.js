const path = require("node:path")

const express = require("express")
const app = express()

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")


const links = [
    {href: "/", text: "Home" },
    {href: "about", text: "About"},
]

const users = ["Rose", "Cake", "Biff"]

app.get("/", (req, res) => {
    res.render("index", {links: links, users: users})
})

app.get("/about", (req, res) => {
    res.render("about", {aboutMessage: "This is about page!", links:links})
})


const PORT = 3000

app.listen(PORT, (req, res, err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("I am running")
    }
})

