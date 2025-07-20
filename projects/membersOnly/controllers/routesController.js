const { body, validationResult } = require("express-validator");
const databaseController = require("./databaseController");

// length messages

//-----worry about validation last------//
const firstNameLengthMessage = `First name should be between 1 and 10 characters.`;
const lastNameLengthMessage = `Last name should be between 1 and 15 characters.`;
const usernameLengthMessage = `Username should be between 1 and 12 characters long.`;
const passwordLengthMessage = `Password needs to be between 8 and 20 characters long.`;
// validation fields 
const validateInput = [
    body("firstName").trim().toLowerCase()
];
//-----worry about validation last------//

//--------------------NEED TO IMPLEMENT ALL ROUTES FUINCTIONALITY HERE-------------------------//
async function signUpPost(firstName, lastName, username, password, passwordConfirm) {

    // check passwords match
    const usernameCheck = await databaseController.searchUsername(username);
    const passwordCheck = password === passwordConfirm;

    let falseMsg = [];

    if (usernameCheck && passwordCheck) { //passwords are same and username doesnt exist yet
        try {
            console.log("Sending data...");
            await databaseController.addUserToServer(firstName, lastName, username, password);
            return falseMsg;

        } catch (err) {
            console.log("Error whilst sending data: ", err);
        };
    } else  if (!usernameCheck && passwordCheck) {
        falseMsg.push("Username already exists.");
    } else if (username && !passwordCheck) {
        falseMsg.push("Passwords do not match");
    };
    return falseMsg;
};

module.exports = {
    signUpPost
};