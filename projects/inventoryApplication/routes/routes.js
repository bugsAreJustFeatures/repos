const express = require("express")
const router = express.Router()
const databaseControllers = require("../controllers/databaseControllers")
const routeControllers = require("../controllers/routeController")

router.get("/", async (req, res) => {
    
    const data = await databaseControllers.getDataFromServer()
    console.log("data", data.rows)
    const { rows } = data
    res.render("homePage", {data: rows})
})

router.post("/", (req, res) => {
    // get input from form to send
    let animalClass = req.body.animalClassInput;
    let animalSpecies = req.body.animalSpeciesInput;
    let animalNative = req.body.animalNativeToInput;
    let animalBreedInput = req.body.animalBreedInput;
    let imageURL = null // not using at the moment and only added for later futures

    databaseControllers.sendFormDataToServer(animalClass, animalSpecies, animalNative, animalBreedInput, imageURL)

    res.redirect("/")
})

router.get("/categories", (req, res) => {
    res.render("categoryPage", {data: "hi there this is categories"})
})

router.get("/edit", (req, res) => {
    res.render("editPage", {data: "hi there this is edit"})
})

module.exports = router