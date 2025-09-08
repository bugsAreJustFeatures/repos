const pool = require("./pool")

async function getAllUsernames() {
    const { rows } = await pool.query('SELECT * FROM usernames;');
    return rows;
}

async function insertUsername(username) {
    await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username])
}

async function searchUsernames(string) {
    let { rows }  = await pool.query(`SELECT username FROM usernames WHERE username LIKE '%${string}%';`)
    if (rows.length > 0) {
        return rows.map(row => row.username).join(", ")
    } else {
        rows = "No users could match your search"
        return rows
    }
    
}

async function deleteUsernames() {
    await pool.query("TRUNCATE TABLE usernames;")
}

module.exports = {
    getAllUsernames,
    insertUsername,
    searchUsernames,
    deleteUsernames
}