const { Router } = require("express");
const router = Router();
const passport = require("passport");

const routesController = require("../controllers/routesController");

router.get("/", routesController.getIndexRoute);

router.post("/", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/",
}));

router.get("/home", routesController.getHomeRoute);

module.exports = router;