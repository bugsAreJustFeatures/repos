const databaseControllers = require("./databaseControllers")
const { body, validationResult } = require("express-validator")

const alphaCheckMessage = `Please enter valid letter of A-Z or a-z`

const validateUser = [
    body("animalClassInput").trim()
        .isAlpha().withMessage(alphaCheckMessage)
        .toLowerCase(),
    body("animalSpeciesInput").trim()
        .isAlpha().withMessage(alphaCheckMessage)
        .toLowerCase(),
    body("animalNativeToInput").trim()
        .isAlpha().withMessage(alphaCheckMessage)
        .toLowerCase(),
    body("animalBreedInput").trim()
        .isAlpha().withMessage(alphaCheckMessage)
        .toLowerCase()
]

// , errors: !validationResult(req) ? "Please Fix: " + validationResult(req) : ""} -- this is to tell errors when filling out a from

exports.getIndexRoute = async (req, res) => {
        console.log("validation Result: ", validationResult(req))
        const data = await databaseControllers.getDataFromServer()
        console.log("data: ", data.rows)
        const { rows } = data
        res.render("homePage", {data: rows})
    }


exports.postIndexRoute = [
    validateUser, 
    async (req, res) => {
        let animalClass = req.body.animalClassInput;
        let animalSpecies = req.body.animalSpeciesInput;
        let animalNative = req.body.animalNativeToInput;
        let animalBreedInput = req.body.animalBreedInput;
        let imageURL = null // not using at the moment and only added for later if i want to implement images
    
        await databaseControllers.sendFormDataToServer(animalClass, animalSpecies, animalNative, animalBreedInput, imageURL)
    
        res.redirect("/")
    }
]

exports.getCategoriesRoute = async (req, res) => {
    const data = await databaseControllers.getAnimalClassFromServer()
    const { rows } = data
    res.render("categoryPage", {data: rows})
}

exports.getEditRoute = (req, res) => {
    res.render("editPage", {data: ""})
}

exports.getEditDataRoute = (req, res) => {
    res.render("editData", {id: req.params.id})
}

exports.postEditDataRoute = async (req, res) => {
    let id = req.params.id
    let animalClass = req.body.animalClassInput;
    let animalSpecies = req.body.animalSpeciesInput;
    let animalNative = req.body.animalNativeToInput;
    let animalBreedInput = req.body.animalBreedInput;

    await databaseControllers.editRowFromServer(id, animalClass, animalSpecies, animalNative, animalBreedInput)

    res.redirect("/")
}

exports.postDeleteRoute = async (req, res) => {
    const id = req.params.id
    await databaseControllers.deleteRowFromServer(id)
    res.redirect("/")
}


