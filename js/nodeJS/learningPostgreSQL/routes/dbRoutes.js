const { Router }= require("express")
const router = Router()
const dbController = require("../controllers/dbController")

router.get("/", dbController.logUsersGet)

router.get("/search", dbController.displaySearchPage)
router.get("/findUsers", dbController.searchThroughUsernames)
router.get("/delete", dbController.deleteAllUsersGet)

router.get("/create", dbController.createUserGet)
router.post("/new", dbController.createUserPost)

module.exports = router