const router = require("express").Router()
const passport = require("passport")
const routesController = require("../controllers/routesController")

//--- HOME ROUTES ---//
router.get("/", (req, res) => {
    res.render("homePage")
})

//--- SIGN UP ROUTES ---//
router.get("/sign-up", (req, res) => {
    res.render("signUpPage", { message: null })
})

router.post("/sign-up", async (req, res) => {
    // put this all into the controller function
    const { firstName, lastName, username, password, passwordConfirm } = req.body
    const response = await routesController.signUpPost(firstName, lastName, username, password, passwordConfirm);
    if (response.length > 0) {
        res.render("signUpPage", { message: response })
    } else {
        res.redirect("/")
    }
})

//--- LOGIN ROUTES ---//
router.get("/login", (req, res) => {
    console.log(req.user)
    res.render("loginPage")
})

router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login"
    }));

//--- CREATE ROUTES ---//
router.get("/create", (req, res) => {

    console.log(req.user)
    res.render("createMessagePage");
}) 

//--- VIEW-MY-MESSAGES ROUTES ---//
router.get("/view-my-messages", (req, res) => {
    console.log(req.user)
    res.render("viewOwnMessages", { user: req.user })
})

module.exports = router