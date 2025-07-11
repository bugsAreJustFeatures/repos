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

async function getAnimalClassFromServer() {
    try {
        console.log("Getting categories...")
        const result = await db.getCategories()
        console.log("Fetched data!")
        return result
    } catch (err) {
        console.log("Error getting data: ", err)
    }
}

async function deleteRowFromServer(row_id) {
    try {
        await db.deleteRow(row_id)
        console.log("Row has been deleted!")
    } catch (err) {
        console.log("Error deleting data from server: ", err)
    }
}

async function editRowFromServer(row_id, animalClass, speciesName, nativeTo, breed) {
    try {
        await db.editRow(row_id, animalClass, speciesName, nativeTo, breed)
        console.log("Server has been updated!")
    } catch (err) {
        console.log("Error editing data from server: ", err)
    }
} 

module.exports = {
    sendFormDataToServer,
    getDataFromServer,
    getAnimalClassFromServer,
    deleteRowFromServer,
    editRowFromServer
}