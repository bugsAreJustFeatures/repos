const http = require("node:http");
const fs = require("fs")

const port = 8080

// Create a server to receive data from
const server = http.createServer((req, res) => {

    let file;
    if (req.url === "/") {
        file = "index.html"
    } else if (req.url === "/about") {
        file = "about.html"
    } else if (req.url === "/contact-me") {
        file = "contactMe.html"
    } else {
        file = "404.html"
    }

    res.writeHead(200, {"content-type": "text/html"})
    fs.readFile(file, (err, data) => {
        if (err) {
            console.log(err)
            res.writeHead(404, {"content-type": "text/html"})
            fs.readFile("404.html")
        } else {
            res.write(data)
        }
        res.end()
    })
});

// makes sure the port is good
server.listen(port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`listening on port, ${port}`)
    }
})

