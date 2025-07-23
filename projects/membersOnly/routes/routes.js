const router = require("express").Router();
const passport = require("passport");
const routesController = require("../controllers/routesController");
const databaseController = require("../controllers/databaseController");

//--- HOME ROUTES ---//
router.get("/", async (req, res) => {
    console.log(req.user)
    const otherMessages = await databaseController.getOtherMessagesFromServer();
    res.render("homePage", { otherMessages: otherMessages })
})

//--- SIGN UP ROUTES ---//
router.get("/sign-up", (req, res) => {
    res.render("signUpPage", { message: null })
})

router.post("/sign-up", async (req, res) => {
    // put this all into the controller function
    const { firstName, lastName, username, password, passwordConfirm, adminOption } = req.body
    const response = await routesController.signUpPost(firstName, lastName, username, password, passwordConfirm, adminOption);
    if (response.length > 0) {
        res.render("signUpPage", { message: response })
    } else {
        res.redirect("/")
    }
})

//--- LOGIN ROUTES ---//
router.get("/login", (req, res) => {
    res.render("loginPage")
})

router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login"
        
    }));



//--- LOGOUT ROUTES ---//
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        } else {
            console.log("You have been logged out!")
            res.redirect("/")
        }
    })
})
    

//--- CREATE ROUTES ---//
router.get("/create", (req, res) => {
    console.log(req.user)
    res.render("createMessagePage");
}) 

router.post("/create", async (req, res) => {
    console.log(req.user);
    let message = req.body.messageInput;
    let id = req.user.id;
    await databaseController.addMessageToServer(message, id);
    res.redirect("/");
})

//--- VIEW-MY-MESSAGES ROUTES ---//
router.get("/view-my-messages", async (req, res) => {
        console.log(req.user)

    const ownMessages = await databaseController.getOwnMessagesFromServer(req.user.id); // need to loop through on ejs to dusplay each messages
    res.render("viewOwnMessages", { messages: ownMessages });
})

module.exports = router