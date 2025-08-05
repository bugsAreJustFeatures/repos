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

//favicon route - delete if i want an icon in tab
router.get("/favicon.ico", (req, res) => {
    res.status(204)
});

// sign up routes
router.get("/signUp", routesController.getSignUpRoute);
router.post("/signUpPost", routesController.postSignUpRoute);

//login routes
router.get("/", routesController.loginChecker, routesController.getLoginRoute);
router.get("/loginRedirect", routesController.getLoginRedirectRoute);
router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
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
router.get("/:folderName", routesController.getFolderRoute);

//edit folder routes
router.get("/:folderName/edit", routesController.getEditFolderRoute);
router.post("/:folderName/editName", routesController.postEditFolderName);
router.post("/:folderName/delete", routesController.postDeleteFolder);

//edit file routes
router.get("/:fileName/editFile", routesController.getEditFileRoute);
router.post("/:fileName/editFileName", routesController.postEditFileNameRoute);
router.post("/:fileName/fileDelete", routesController.postFileDeleteRoute);

module.exports = router;    