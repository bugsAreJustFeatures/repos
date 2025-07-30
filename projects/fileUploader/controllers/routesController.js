const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const { validationResult, body } = require("express-validator");
const bcrypt = require("bcrypt");

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
]

async function getIndexRoute(req, res) {
    console.log("hi")
    res.render("signUpPage", { errors: [] });
}

const postSignUpRoute = [ // need to use an array in order to validate it
    signUpValidation,
    async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors)
        res.render("signUpPage", { errors: errors.array()})
    } else {
        const { username, password, passwordConfirm } = req.body;
            
        // check passwords are the same
        if (password !== passwordConfirm) { //passwords are different
            return res.render("signUpPage", { errors: [`Passwords do not match`]})
        }
        
        //passwords are same, go through with hashing and place user into db
        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            await prisma.users.deleteMany(); // this is to clear db, only use for development, delete when done
    
            await prisma.users.create({
                data: {
                    username: username,
                    password: hashedPassword,
                }
            });

        } catch (err) {
            console.error(err);
        }

        console.log(await prisma.users.findMany())
        res.redirect("/")
    }
}];

module.exports = {
    getIndexRoute,
    postSignUpRoute,
}