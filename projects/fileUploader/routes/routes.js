const express = require("express");
const router = express.Router();
const routesController = require("../controllers/routesController");
const passport = require("passport");

//multer diskStorage
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
});
const upload = multer({ storage });

// sign up routes
router.get("/signUp", routesController.getSignUpRoute);
router.post("/signUpPost", routesController.postSignUpRoute);

//login routes
router.get("/", routesController.loginChecker, routesController.getLoginRoute);
router.get("/loginRedirect", routesController.getLoginRedirectRoute);
router.post("/login", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/loginRedirect",
}));

//logout routes
router.get("/logout", routesController.getLogoutRoute);

//home page routes
router.get("/home", routesController.getHomePage);

//upload routes
router.get("/upload", routesController.getUploadRoute);
router.post("/upload", upload.single("fileUpload"), routesController.postUploadRoute);

//create folder
router.get("/createFolder", routesController.getCreateFolder);
router.post("/createFolder", routesController.postCreateFolder);

// view folder
router.get("/:folderName", routesController.getFolderRoute)

module.exports = router;    