const express = require("express");
const router = express.Router();
const routesController = require("../controllers/routesController");
const passport = require("passport");

// sign up routes

router.get("/signUp", routesController.getSignUpRoute);
router.post("/signUpPost", routesController.postSignUpRoute);

//login routes
router.get("/", routesController.getLoginRoute);
router.post("/login", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/getLoginRoute",
}));

//home page routes
router.get("/home", routesController.getHomePage);

module.exports = router;    