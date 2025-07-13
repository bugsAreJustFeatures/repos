const databaseControllers = require("./databaseControllers")
const { body, validationResult } = require("express-validator")

const alphaCheckMessage = `Please enter valid letter of A-Z or a-z`

const validateUser = [
    body("animalClassInput").trim()
        .isAlpha().withMessage("Animal Class: " + alphaCheckMessage)
        .toLowerCase(),
    body("animalSpeciesInput").trim()
        .isAlpha().withMessage("Species: " + alphaCheckMessage)
        .toLowerCase(),
    body("animalNativeToInput").trim()
        .isAlpha().withMessage("Native To: " + alphaCheckMessage)
        .toLowerCase(),
    body("animalBreedInput").trim()
        .isAlpha().withMessage("Breed: " + alphaCheckMessage)
        .toLowerCase()
]

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

        const { errors } = validationResult(req)
        console.log("errors: ", errors)

        let animalClass = req.body.animalClassInput;
        let animalSpecies = req.body.animalSpeciesInput;
        let animalNative = req.body.animalNativeToInput;
        let animalBreedInput = req.body.animalBreedInput;
        let imageURL = null // not using at the moment and only added for later if i want to implement images
    
        if (errors.length > 0) {
            res.render("editPage", {pleaseFixMessage: errors ? "Please Fix: " : "", errors: errors ? errors : "", animalClassValue: animalClass, animalSpeciesValue: animalSpecies, animalNativeToValue: animalNative, animalBreedValue: animalBreedInput})
        } else {
          await databaseControllers.sendFormDataToServer(animalClass, animalSpecies, animalNative, animalBreedInput, imageURL)
          res.redirect("/") 
        }        
        
    }
]

exports.getCategoriesRoute = async (req, res) => {
    const data = await databaseControllers.getAnimalClassFromServer()
    const { rows } = data
    res.render("categoryPage", {data: rows})
}

exports.getEditRoute = (req, res) => {
        res.render("editPage", {pleaseFixMessage: "", errors: "", animalClassValue: "", animalSpeciesValue: "", animalNativeToValue: "", animalBreedValue: ""})
    }


exports.getEditDataRoute = (req, res) => {
    res.render("editData", {id: req.params.id, pleaseFixMessage: "", errors: "", animalClassValue: "", animalSpeciesValue: "", animalNativeToValue: "", animalBreedValue: ""})
}

exports.postEditDataRoute = [
    validateUser, 
    async (req, res) => {
    let id = req.params.id
    let animalClass = req.body.animalClassInput;
    let animalSpecies = req.body.animalSpeciesInput;
    let animalNative = req.body.animalNativeToInput;
    let animalBreedInput = req.body.animalBreedInput;

    const { errors } = validationResult(req)
    if (errors.length > 0) {
        res.render("editData", {id: req.params.id, pleaseFixMessage: errors ? "Please Fix: " : "", errors: errors ? errors : "", animalClassValue: animalClass, animalSpeciesValue: animalSpecies, animalNativeToValue: animalNative, animalBreedValue: animalBreedInput})
    } else {
      await databaseControllers.editRowFromServer(id, animalClass, animalSpecies, animalNative, animalBreedInput)
      res.redirect("/")  
    }

    
}
]

exports.postDeleteRoute = async (req, res) => {
    const id = req.params.id
    await databaseControllers.deleteRowFromServer(id)
    res.redirect("/")
}


