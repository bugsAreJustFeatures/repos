const express = require("express")
const router = express.Router()
const dbControllers = require("../controllers/dbControllers.js")

router.get("/", dbControllers.renderHomePage)

router.get("/new", dbControllers.renderFormPage)
router.post("/new", dbControllers.sendForm)

module.exports = router