const express = require("express");
const router = express.Router();
const routesController = require("../controllers/routesController");
const passport = require("passport");

//multer diskStorage (commented out) and multer memoryStorage (in use)
const multer = require("multer");
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "./uploads")
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     },
// });
const upload = multer({ storage: multer.memoryStorage() });

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
router.get("/viewFolder/:folderName", routesController.getFolderRoute);

//edit folder routes
router.get("/edit/:folderName", routesController.getEditFolderRoute);
router.post("/editName/:folderName", routesController.postEditFolderName);
router.post("/delete/:folderName", routesController.postDeleteFolder);

//edit file routes
router.get("/editFile/:fileName", routesController.getEditFileRoute);
router.post("/editFileName/:fileName", routesController.postEditFileNameRoute);
router.post("/fileDelete/:fileName", routesController.postFileDeleteRoute);

//download file route
router.post("/download/:filePath", routesController.postDownloadFile);

// error page route
router.get(/.*/, (req, res) => {
    return res.render("errorPage");
});


module.exports = router;    