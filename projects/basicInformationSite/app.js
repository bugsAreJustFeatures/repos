const fs = require("fs")
const express = require("express")
const app = express();

const PORT = 3000 || process.env.PORT

app.get("/", (req, res) => {
    fs.readFile("index.html", (err, data) => {
        if (err) {
            console.log(err)
            fs.readFile("404.html")
        } else {
            res.write(data)
            res.end()
        }
    })
})

app.get("/about", (req, res) => {
    fs.readFile("about.html", (err, data) => {
        if (err) {
            console.log(err)
            fs.readFile("404.html")

        } else {
            res.write(data)
            res.end()
        }
    })
})

app.get("/contactMe", (req, res) => {
    fs.readFile("contactMe.html", (err, data) => {
        if (err) {
            console.log(err)
            fs.readFile("404.html")
        } else {
            res.write(data)
            res.end()
        }
    })
})

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`connected successfully on port ${PORT}`)
    }
    
})