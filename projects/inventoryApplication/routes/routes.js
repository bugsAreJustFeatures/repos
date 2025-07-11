const express = require("express")
const router = express.Router()
const databaseControllers = require("../controllers/databaseControllers")
const routeControllers = require("../controllers/routeController")

// need to make use of routeController
// need to place the functions in there
// and then make sure these routes only call a function with the req.body at most rather than like POST("/")
// OVERALL --- NEED TO REFACTOR ALL CODE --- //

router.get("/", async (req, res) => {
    const data = await databaseControllers.getDataFromServer()
    console.log("data", data.rows)
    const { rows } = data
    res.render("homePage", {data: rows})
})

router.post("/", (req, res) => {
    // get input from form to send ---- NEED TO PUT THIS IN THE sendFormDataToServer() FUNCTION AND MAKE IT SO I ONLY PASS IN req.body---
    let animalClass = req.body.animalClassInput;
    let animalSpecies = req.body.animalSpeciesInput;
    let animalNative = req.body.animalNativeToInput;
    let animalBreedInput = req.body.animalBreedInput;
    let imageURL = null // not using at the moment and only added for later futures

    databaseControllers.sendFormDataToServer(animalClass, animalSpecies, animalNative, animalBreedInput, imageURL)

    res.redirect("/")
})


// --------------- CATEGORIES PAGE ROUTES ----------------- //

router.get("/categories", async (req, res) => {
    const data = await databaseControllers.getAnimalClassFromServer();
    const { rows } = data
    res.render("categoryPage", {data: rows})
})

// --------------- EDIT PAGE ROUTES ----------------- //

router.get("/edit", (req, res) => {
    res.render("editPage", {data: "hi there this is edit"})
})

router.get("/:id/edit-data", (req, res) => {
    res.render("editData", {id: req.params.id})
})

router.post("/:id/edit-data", async (req, res) => {
    let id = req.params.id
    let animalClass = req.body.animalClassInput;
    let animalSpecies = req.body.animalSpeciesInput;
    let animalNative = req.body.animalNativeToInput;
    let animalBreedInput = req.body.animalBreedInput;

    await databaseControllers.editRowFromServer(id, animalClass, animalSpecies, animalNative, animalBreedInput)

    res.redirect("/")
})

// --------------- DELETE ROUTES ----------------- //

router.post("/:id/delete", async (req, res) => {
    const id = req.params.id
    await databaseControllers.deleteRowFromServer(id)
    res.redirect("/")
})

module.exports = router