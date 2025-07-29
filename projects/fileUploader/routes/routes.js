const express = require("express");
const router = express.Router();
const routesController = require("../controllers/routesController");

router.get("/", routesController.getIndexRoute);

router.post("/signUpPost", routesController.postSignUpRoute);

module.exports = router;