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

//home page routes
function getHomePage(req, res) {
    res.render("homePage");
};

module.exports = {
    getSignUpRoute,
    postSignUpRoute,
    getLoginRoute,
    getHomePage,
}