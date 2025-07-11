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
        const result = await pool.query(`SELECT id, animal_class, species_name, native_to, animal_breed FROM inventory WHERE NOT animal_class = '';`) // makes sure its not empty, its onyl needed in development since i havent paramatised anything yet and havent validated it.
        return result
    } catch (err) {
        console.log("Error with querying: ", err)
    }
}

async function getCategories() {
    try {
        const result = await pool.query(`SELECT DISTINCT animal_class FROM inventory WHERE NOT animal_class = '';`)
        return result
    } catch (err) {
        console.log("Error whilst querying: ", err)
    }
}

async function deleteRow(row_id) {
    try {
        await pool.query(`DELETE FROM inventory WHERE id = ($1);`, [row_id])
    } catch (err) {
        console.log("Error whilst querying: ", err)
    }
}

async function editRow(row_id, animalClass, speciesName, nativeTo, breed) {
    try {
        await pool.query(`UPDATE inventory SET animal_class = ($1), species_name = ($2), native_to = ($3), animal_breed = ($4) WHERE id = ($5);`, [animalClass, speciesName, nativeTo, breed, row_id])
    } catch (err) {
        console.log("Error whilst querying: ", err)
    }
}

module.exports = {
    addRow,
    getData,
    getCategories,
    deleteRow,
    editRow
}