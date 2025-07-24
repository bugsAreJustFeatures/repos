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
};

async function addUser(firstName, lastName, username, password, adminOption) {
    try {
        await pool.query(`INSERT INTO members (first_name, last_name, username, password, admin_status) VALUES ($1, $2, $3, $4, $5);`, [firstName, lastName, username, password, adminOption])
    } catch (err) {
        console.log("Error whilst querying: ", err)
    }
};

async function addMessage(msg, id) {
    try {
        await pool.query(`INSERT INTO messages (message, member_id) VALUES ($1, $2);`, [msg, id]);
        console.log("Message added!");
    } catch (err) {
        console.log("Error whilst querying: ", err);
    }
};

async function getOwnMessages(id) {
    try {
        const { rows } = await pool.query('SELECT messages.message, messages.id FROM members LEFT JOIN messages ON members.id = messages.member_id WHERE members.id = $1 AND messages.message IS NOT NULL;', [id]);
        return rows;
    } catch (err) {
        console.log("Error whilst querying: ", err);
    }
};

async function getOtherMessages() {
    try {
        const { rows } = await pool.query(`SELECT username, message, messages.id FROM members LEFT JOIN messages ON members.id = messages.member_id WHERE message IS NOT NULL ORDER BY username ;`);
        return rows
    } catch (err) {
        console.log("Error whilst querying: ", err);
    }
};

async function deleteMessage(messageId) {
    try {
        await pool.query(`DELETE FROM messages WHERE id = $1;`, [messageId]);
    } catch (err) {
        console.log("Error whilst contacting server: ", err);
    }
}

module.exports = {
    checkUserIsNew,
    getUserById,
    getUsername,
    addUser,
    addMessage,
    getOwnMessages,
    getOtherMessages,
    deleteMessage,
}