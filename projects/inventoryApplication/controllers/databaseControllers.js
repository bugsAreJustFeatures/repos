const db = require("../database/queries")

async function sendFormDataToServer(animalClass, speciesName, nativeTo, breed, imageURL) {
    try {
        console.log("Sending data...")
        await db.addRow(animalClass, speciesName, nativeTo, breed, imageURL)    
        console.log("Data sent!")
    } catch (err) {
        console.log("Error sending data to server: ", err)
    }
}

async function getDataFromServer() {
    try {
        console.log("Getting data...")
        const result = await db.getData()
        console.log("Fetched Data Successfully!")
        return result
    } catch (err) {
        console.log("Error getting data from server: ", err)
    }
}

module.exports = {
    sendFormDataToServer,
    getDataFromServer,
}