const pool = require("./pool")

async function addRow(animalClass, speciesName, nativeTo, breed, imageURL) {
    try {
        await pool.query('INSERT INTO inventory (animal_class, species_name, native_to, animal_breed, image_url) VALUES ($1, $2, $3, $4, $5);', [animalClass, speciesName, nativeTo, breed, imageURL])
    } catch (err) {
        console.log("Error inserting row: ", err)
    }
}   

async function getData() {
    try {
        const result = await pool.query(`SELECT animal_class, species_name, native_to, animal_breed FROM inventory WHERE NOT animal_class = '';`) // makes sure its not empty, its onyl needed in development since i havent paramatised anything yet and validated it.
        return result
    } catch (err) {
        console.log("Error with querying: ", err)
    }
}

module.exports = {
    addRow,
    getData,
}