const pool = require("./pool")

async function checkUserIsNew(username, password) {
    try {
        const { rows } = await pool.query(`SELECT * FROM members WHERE username = $1;`, [username]);
        const user = rows[0];

        if (!user) { // user is new and not in the db
            return true
        } else {
            return false
        }
    } catch (err) {
        console.log("Error whilst querying: ", err);
    }
};

async function getUserById(id) {
    try {
        const { rows } = await pool.query(`SELECT * FROM members WHERE id = $1;`, [id]);
        const user = rows[0];
        return user;
    } catch (err) {
        console.log("Error whilst querying: ", err);
    }
};

async function getUsername(username) {
    try {
        const { rows } = await pool.query(`SELECT * FROM members WHERE username = $1;`, [username])
        const user = rows[0]
        return user
    } catch (e) {
        console.log("Error whilst querying: ", e)
    }
}

async function addUser(firstName, lastName, username, password) {
    try {
        await pool.query(`INSERT INTO members (first_name, last_name, username, password) VALUES ($1, $2, $3, $4);`, [firstName, lastName, username, password])
    } catch (err) {
        console.log("Error whilst querying: ", err)
    }
    
}

module.exports = {
    checkUserIsNew,
    getUserById,
    getUsername,
    addUser
}