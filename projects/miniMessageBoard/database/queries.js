const pool = require("./pool")

async function getRows() {
    const empty = "Table is empty, no messages are there."
    const { rows } = await pool.query("SELECT * FROM messageboard;");
    if (rows.length > 0) {
         return rows
    } else {
         return empty   
    }
}

async function addMessage(nameInput, messageInput, dateInput) {
    // add name to db table
    await pool.query('INSERT INTO messageboard (name, message, date) VALUES ($1, $2, $3);',
        [nameInput, messageInput, dateInput]
    )
}

module.exports = {
    getRows,
    addMessage
}