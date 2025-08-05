// allow the use of prisma
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

// express validator
const { validationResult, body } = require("express-validator");
const bcrypt = require("bcrypt");

// validation fields
const signUpValidation = [
    body("username").trim()
        .isAlphanumeric().withMessage(`Username only accepts letters and numbers.`)
        .isLength({ min: 1, max: 12 }).withMessage(`Username must be 1-12 characters long.`),
    body("password").trim()
        .isAlphanumeric().withMessage(`Password must only contain letters and numbers`)
        .isLength({ min: 3, max: 15 }).withMessage(`Password must be 3-15 characters long.`),
    body("passwordConfirm").trim()
        .custom((passwordConfirm, { req }) => {
            return passwordConfirm === req.body.password
        }).withMessage(`Passwords do not match.`)
];

// sign up routes
async function getSignUpRoute(req, res) {
    res.render("signUpPage", { errors: [] });
};

// posting sign up - making an account
const postSignUpRoute = [ // need to use an array in order to validate it
    signUpValidation,
    async (req, res) => {

    // check that form was filled out correctly
    const errors = validationResult(req);

    // if the error array is not empty - there are errors so return them and make user refill form
    if (!errors.isEmpty()) {
        return res.render("signUpPage", { errors: errors.array()})

    } else {
        const { username, password, passwordConfirm } = req.body;
            
        // check passwords are the same
        if (password !== passwordConfirm) { //passwords are different
            return res.render("signUpPage", { errors: [`Passwords do not match`]})
        }
        
        //passwords are same so carry out hashing
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            await prisma.users.create({
                data: {
                    username: username,
                    password: hashedPassword,
                }
            });
        } catch (err) {
            console.error(err);
            await prisma.$disconnect();
        }

        console.log(await prisma.users.findMany()); // display all users, in this case the one i just made since im deleting all the previos ones at the top of the try block (line 53)
        await prisma.$disconnect();
        res.redirect("/");

    }
}];

//login routes
function getLoginRoute(req, res) {
    res.render("loginPage", { errors: [] });
};

function getLoginRedirectRoute(req, res) {
    res.render("loginPage", { errors: [{ msg: `Invalid username or password` }]});
};

function loginChecker(req, res, next) { //checks if user is authorised
    // req.session holds session info, passport is only created when user is authorised, so if it exists theres no need to go back to the login page and if the user tries to go there they get redirected to home
    if (req.session.passport) {
        return res.redirect("/home");
    } else {
        next();
    };
};

//logout routes
function getLogoutRoute(req, res, next) {
    req.logout((err) => {
        if (err) {
            return next(err);
        } else {
            res.redirect("/")
        };
    });
};

//home page routes
async function getHomePage(req, res) {
    const id = req.session.passport.user;
    let userFolders;

    try {
        userFolders = await prisma.folders.findMany({
            where: {
                userId: id,
            },
        });
    } catch (err) {
        console.error(err);
    };

    userFolders.forEach(folder => {console.log("The users folders: ", folder)})
    res.render("homePage", { folders: userFolders ? userFolders : [] });
};

//upload routes
async function getUploadRoute(req, res) {
    let userFolders;
    try {
        userFolders = await prisma.folders.findMany({
            where: {
                userId: req.user.id,
            },
        });
    } catch (err) {
        console.log("Error whilst getting folders during upload page: ", err);
        return;
    };

    console.log(userFolders)
    res.render("uploadPage", { folders: userFolders });
};

async function postUploadRoute(req, res) {
    const fileName = req.body.fileName;
    const folderName = req.body.folderName;
    const fileSize = req.file.size;
    const fileLink = req.file.path; // i will get rid of this and make the link inside of the db come from a cloud provider where the file will be stored but for now this will be a placeholder of sorts since its required
    const wholeDate = new Date();
    const userId = req.user.id;
    let folderId;
    // console.log(`fileName: ${fileName}`);
    // console.log(`fileSize: ${fileSize} Bytes`);
    console.log(folderName)
    
    //get folderId from the inputed folder name from user
    try {
        folderId = await prisma.folders.findFirst({
            where: {
                folder_name: folderName,
            },
            select: {
                id: true,
            },
        });
    } catch (err) {
        console.log("Error whilst getting folderId in the upload route: ", err);
    };
    try {
        await prisma.files.create({
            data: {
                link: fileLink,
                userId: userId,
                folderId: folderId.id,
                file_size: fileSize,
                uploaded_date: wholeDate,
                file_name: fileName,
            },
        });
    } catch (err) {
        console.log("Error whilst trying to upload file to database: ", err);
    };
    // console.log(`folderId: ${folderId.id}`)
    res.redirect("/upload");
};

//create folder 
function getCreateFolder(req, res) {
    res.render("createFolder");
};

async function postCreateFolder(req, res) {
    const folderName = req.body.folderName;
    const id = req.session.passport.user;
    
    console.log(`folderName: ${folderName}`);
    console.log(`id: ${id}`);
    try {
        await prisma.folders.create({
            data: {
                folder_name: folderName,
                userId: id,
            },
        });
    } catch (err) {
        console.error(err);
    };

    res.redirect("/");
};

//view folder
async function getFolderRoute(req, res) {
    const folderName = req.params.folderName;
    let findFolderId;
    let folderFiles;

    // getting folder id
    try {
        findFolderId = await prisma.folders.findFirst({
            where: {
                folder_name: folderName,
            },
            select: {
                id: true,
            },
        });

        //check the folder id exists otherwise return with nothing
        if (!findFolderId) {
            console.log(`The folder, ${folderName} could not be found.`);
            return res.render("viewFolder", { files: folderFiles });
        };
    } catch (err) {
        console.log("Error whilst getting folder during the folder route: ", err);
    };

    //using folder id to see what files have that folder id as their parent folder
    try {
        folderFiles = await prisma.files.findMany({
            where: {
                folderId: findFolderId.id,
            },
        });

        // check if there are any files actually existing
        if (!folderFiles) {
            console.log(`There were no files with the folderId of ${findFolderId.id}`)
            folderFiles = [`No files could be found.`]
            return res.render("viewFolder", { files: folderFiles });
        };

    } catch (err) {
        console.log(`Error whilst searching for files that have the parent folder of, ${folderName}: `, err);
    };

    // all went well, files and folder has been found
    return res.render("viewFolder", { files: folderFiles });
};

//edit folder routes
function getEditFolderRoute(req, res) {
    res.render("editFolderPage", { folderName: req.params.folderName });
};

async function postEditFolderName(req, res) {
    const oldFolderName = req.params.folderName;
    const newFolderName = req.body.newFolderName;
    const id = req.user.id;

    try {
        await prisma.folders.updateMany({
            where: {
                folder_name: oldFolderName,
                userId: id,
            }, 
            data: {
                folder_name: newFolderName,
            },
        });
    } catch (err) {
        console.log(`Error whilst changing folder name for, ${oldFolderName}: `, err);
        return;
    };
    return res.redirect("/");
};

async function postDeleteFolder(req, res) {
    const folderName = req.params.folderName;
    const id = req.user.id;
    let findFolderId;

    // find findFolderId to search files that have the parent folder and then delete them from files table
    try {
     findFolderId = await prisma.folders.findFirst({
            where: {
                folder_name: folderName,
                userId: id,
            }, 
            select: {
                id: true
            },
        });
    } catch (err) {
        console.log("Error whilst trying to find findFolderId: ", err);
        return;
    };

    // use foundId to find and delete files belonging to that folder that has just been deleted
    try {
        await prisma.files.deleteMany({
            where: {
                folderId: findFolderId.id,
            },
        });
    } catch (err) {
        console.log("Error whilst trying to find and delete files via findFolderId: ", err);
        return;
    };

    // delete folder from folders table
    try {
        await prisma.folders.deleteMany({
            where: {
                folder_name: folderName,
                userId: id,
            },
        });
    } catch (err) {
        console.log("Error whilst trying to delete folder from server: ", err);
        return;
    };

    res.redirect("/");
};

function getEditFileRoute(req, res) {
    res.render("editFilePage", { fileName: req.params.fileName });
};

async function postEditFileNameRoute(req, res) {
    // console.log(req)
    const userId = req.user.id;
    const oldFileName = req.params.fileName;
    const newFileName = req.body.newFileName;

    try {
        await prisma.files.updateMany({
            where: {
                userId: userId,
                file_name: oldFileName,
            },
            data: {
                file_name: newFileName,
            },
        });
    } catch (err) {
        console.log("Error whilst updating file name: ", err);
        return;
    };

    res.redirect("/");
};

async function postFileDeleteRoute(req, res) {
    const userId = req.user.id;
    const fileName = req.params.fileName;

    try {
        await prisma.files.deleteMany({
            where: {
                userId: userId,
                file_name: fileName,
            },
        });
    } catch (err) {
        console.log("Error whilst trying to delete file: ", err);
        return;
    };
    res.redirect("/");
};

module.exports = {
    getSignUpRoute,
    postSignUpRoute,
    getLoginRoute,
    getLoginRedirectRoute,
    loginChecker,
    getLogoutRoute,
    getHomePage,
    getUploadRoute,
    postUploadRoute,
    getCreateFolder,
    postCreateFolder,
    getFolderRoute,
    getEditFolderRoute,
    postEditFolderName,
    postDeleteFolder,
    getEditFileRoute,
    postEditFileNameRoute,
    postFileDeleteRoute,
}