const express = require("express")
const router = express.Router()
const routeControllers = require("../controllers/routeController")

// --------------- INDEX PAGE ROUTES ----------------- //

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

// --------------- ROUTER EXPORT ----------------- //

module.exports = router