//make files
const fs = require("node:fs");

const content = "Some content!";

fs.writeFile("./index.html", content, err => {
  if (err) {
    console.log(err)
  } else {
    //file written 
  }
})

//append files
const addContent = "This sentence has been added!"

fs.appendFile("./index.html", addContent, err => {
  if (err) {
    console.log(err)
  } else {
    //done 
  }
})

//read files
fs.readFile("./index.html", "utf8", (err, data) => {
  if (err) {
    console.log(err)
    return;
  }
  console.log(data)
})

//event emitter
const EventEmitter = require("node:events");

const eventEmitter = new EventEmitter()

eventEmitter.on("start", (num) => {
  console.log(`started running, seen through an event emitter. Look at this number -> ${num}`)
})

eventEmitter.emit("start", 69)