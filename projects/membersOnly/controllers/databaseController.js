const queries = require("../database/queries");
const bcrypt = require("bcrypt");

async function addUserToServer(firstName, lastName, username, password, adminOption) {
    //hash password here with bcrypt here
    
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await queries.addUser(firstName, lastName, username, hashedPassword, adminOption);
        console.log("Sent successfully!");
    } catch (err) {
        console.log("Error whilst querying: ", err);
    }
};

async function searchUsername(username) {
    try {
        const isNew = await queries.checkUserIsNew(username);

        if (isNew) {// user doesnt exist yet
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log("Error whilst querying: ", err);
    }
};

async function addMessageToServer(msg, id) {
    try {
        await queries.addMessage(msg, id);
    } catch (err) {
        console.log("Error whilst sending: ", err);
    }
};

async function getOwnMessagesFromServer(id) {
    try {
        const data = await queries.getOwnMessages(id);
        return data;
    } catch (err) {
        console.log("Error whilst querying: ", err);
    }
};

async function getOtherMessagesFromServer() {
    try {
        const data = await queries.getOtherMessages();
        return data;
    } catch (err) {
        console.log("Error whilst querying: ", err);
    }
};

module.exports = {
    addUserToServer, 
    searchUsername,
    addMessageToServer,
    getOwnMessagesFromServer,
    getOtherMessagesFromServer,
}