const router = require("express").Router();
const passport = require("passport");
const routesController = require("../controllers/routesController");
const databaseController = require("../controllers/databaseController");

//--- HOME ROUTES ---//
router.get("/", routesController.indexRouteGet);

//--- SIGN UP ROUTES ---//
router.get("/sign-up", routesController.signUpRouteGet);

router.post("/sign-up", routesController.signUpRoutePost);

//--- LOGIN ROUTES ---//
router.get("/login", routesController.loginRouteGet);

router.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login"
        
    }));

//--- LOGOUT ROUTES ---//
router.get("/logout", routesController.logoutRouteGet);
    
//--- CREATE ROUTES ---//
router.get("/create", routesController.createRouteGet);

router.post("/create", routesController.createRoutePost);

//--- VIEW-MY-MESSAGES ROUTES ---//
router.get("/view-my-messages", routesController.viewOwnMessagesRouteGet);

//--- DELETE MESSAGE ROUTES ---//
router.post("/deleteGlobalMessage", routesController.deleteGlobalMessageRoutePost);

router.post("/deleteOwnMessage", routesController.deleteOwnMessageRoutePost);

module.exports = router