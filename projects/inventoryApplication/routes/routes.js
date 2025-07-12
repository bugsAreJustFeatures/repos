const express = require("express")
const router = express.Router()
const databaseControllers = require("../controllers/databaseControllers")
const routeControllers = require("../controllers/routeController")

// need to make use of routeController
// need to place the functions in there
// and then make sure these routes only call a function with the req.body at most rather than like POST("/")
// OVERALL --- NEED TO REFACTOR ALL CODE --- //

router.get("/", routeControllers.getIndexRoute)

router.post("/", routeControllers.postIndexRoute)


// --------------- CATEGORIES PAGE ROUTES ----------------- //

router.get("/categories", routeControllers.getCategoriesRoute)

// --------------- EDIT PAGE ROUTES ----------------- //

router.get("/edit", routeControllers.getEditRoute)

router.get("/:id/edit-data", routeControllers.getEditDataRoute)

router.post("/:id/edit-data", routeControllers.postEditDataRoute)

// --------------- DELETE ROUTES ----------------- //

router.post("/:id/delete", routeControllers.postDeleteRoute)

module.exports = router