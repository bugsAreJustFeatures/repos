const express = require("express")
const router = express.Router()

router.get("/new", (req, res) => {
    res.render("form")
})

module.exports = router