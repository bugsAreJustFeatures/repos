const { body, validationResult } = require("express-validator");
const databaseController = require("./databaseController");

// length messages

//-----worry about validation last------//
const firstNameLengthMessage = `First name should be between 3 and 10 characters.`;
const firstNameAlphaMessage = `First name should be A-Z and a-z characters.`;
const lastNameLengthMessage = `Last name should be between 1 and 15 characters.`;
const lastNameAlphaMessage = `Last name should be A-Z and a-z characters.`;
const usernameLengthMessage = `Username should be between 3 and 12 characters long.`;
const usernameAlphanumericMessage = `Username should be only numbers and letters.`;
const passwordLengthMessage = `Password needs to be between 8 and 20 characters long.`;
const passwordAlphanumericMessage = `Password needs to be numbers and letters only.`;
const passwordsMatchMessage = `Passwords do not match.`;

function passwordsMatch(value, { req }) {
    return value === req.body.password;
};

// validation fields 
const validateInput = [
    body("firstName").trim()
        .isAlpha().withMessage(firstNameAlphaMessage)
        .toLowerCase()
        .isLength({
            min: 3,
            max: 10,
        }).withMessage(firstNameLengthMessage),
    body("lastName").trim()
        .isAlpha().withMessage(lastNameAlphaMessage)
        .toLowerCase()
        .isLength({
            min: 3,
            max: 10,
        }).withMessage(lastNameLengthMessage),
    body("username").trim()
        .isAlphanumeric().withMessage(usernameAlphanumericMessage)
        .isLength({
            min: 3,
            max: 12,
        }).withMessage(usernameLengthMessage),
    body("password").trim()
        .isAlphanumeric().withMessage(passwordAlphanumericMessage)
        .isLength({
            min: 8,
            max: 20,
        }).withMessage(passwordLengthMessage),
    body("passwordConfirm").trim()
        .custom(passwordsMatch).withMessage(passwordsMatchMessage),
    body("adminOption").optional(),
];

// Index Routes //
async function indexRouteGet(req, res) {
    const otherMessages = await databaseController.getOtherMessagesFromServer();
    res.render("homePage", { otherMessages: otherMessages });
}
// Sign-up routes //
function signUpRouteGet(req, res) {
    res.render("signUpPage", { messages: [] });
}

async function signUpRoutePostHelper(firstName, lastName, username, password, passwordConfirm, adminOption) {

    // check passwords match
    const usernameCheck = await databaseController.searchUsername(username);
    const passwordCheck = password === passwordConfirm;

    let falseMsg = [];

    if (usernameCheck && passwordCheck) { //passwords are same and username doesnt exist yet
        try {
            console.log("Sending data...");
            await databaseController.addUserToServer(firstName, lastName, username, password, adminOption);
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

async function signUpRoutePost(req, res) {

    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.render("signUpPage", { messages: errors.array() })
    }

    const { firstName, lastName, username, password, passwordConfirm, adminOption } = req.body;

    const response = await signUpRoutePostHelper(firstName, lastName, username, password, passwordConfirm, adminOption);

    if (response.length > 0) { // something was wrong such as invalid input
        res.render("signUpPage", { message: response });
    } else { //signed up
        res.redirect("/");
    }
};

function loginRouteGet(req, res) {
    res.render("loginPage");
}

function logoutRouteGet(req, res, next) {
    req.logout((err) => {
        if (err) {
            return next(err);
        } else {
            res.redirect("/");
        };
    });
};

function createRouteGet(req, res) {
    if (!res.locals.currentUser) {
        res.redirect("/login");
    } else {
        res.render("createMessagePage");
    };
};

async function createRoutePost(req, res) {
    let message = req.body.messageInput;

    let id = res.locals.currentUser.id;

    await databaseController.addMessageToServer(message, id);

    res.redirect("create");
};

async function viewOwnMessagesRouteGet(req, res) {
    if (!res.locals.currentUser) {
        res.redirect("/login");
    } else {
        const ownMessages = await databaseController.getOwnMessagesFromServer(res.locals.currentUser.id);

        res.render("viewOwnMessages", { messages: ownMessages });
    }
};

async function deleteGlobalMessageRoutePost(req, res) {
    const messageId = req.body.message_id;
    await databaseController.deleteMessageFromServer(messageId);
    res.redirect("/");
};

async function deleteOwnMessageRoutePost(req, res) {
    const messageId = req.body.message_id;
    await databaseController.deleteMessageFromServer(messageId);
    res.redirect("/view-my-messages");
}
 
module.exports = { 
    validateInput,  
    indexRouteGet,
    signUpRouteGet,
    signUpRoutePost,
    loginRouteGet,
    logoutRouteGet,
    createRouteGet,
    createRoutePost,
    viewOwnMessagesRouteGet,
    deleteGlobalMessageRoutePost,
    deleteOwnMessageRoutePost,
};