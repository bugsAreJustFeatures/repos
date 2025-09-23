// import prisma ORM
import { PrismaClient } from "../database/generated/prisma/index.js";
const prisma = new PrismaClient();

// import bcrypt
import { hash, compare } from "bcrypt";

//import jwt 
import jwt from "jsonwebtoken";

// import express validator
import { validationResult, body } from "express-validator";

// validation for forms using express validator
const registerValidation = [
    body("username")
        .trim()
        .isAlphanumeric().withMessage("Username can only contain numbers and letters")
        .isLength({ min: 3, max: 15 }).withMessage("Username can only be 3 - 15 characters long")
        .custom(async (username) => { // custom test to check if username is taken
            const usernameExists = await prisma.users.findFirst({
                where: {
                    username,
                },
            });
            // flip boolean to make it so if a user exists i throw error and fail the validation which will trigger the validation err and send a message to the frontend otherwise if the username is not already in use, allow it
            if (usernameExists) {
                throw new Error("Username already exists")
            } else {
                return true;
            };
        }),
    body("password")
        .trim()
        .matches(/^[^\s]+$/).withMessage("Password cannot contain spaces") // this allows letters numbers and symbols but not spaces
        .isLength({ min: 3, max: 20 }).withMessage("Password can only be between 3 and 30 characters long."),
    body("confirmPassword")
        .trim()
        .custom((confirmPassword, { req }) => {
            if (confirmPassword == req.body.password) {
                return true;
            } else {
                return false;
            };
        }).withMessage("Passwords do not match"),
];

async function postLogin(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    // find user in db with provided username from user
    try {
        const user = await prisma.users.findFirst({
            where: {
                username,
            },
        });

        // check there was a user
        if (!user) {
            return res.status(202).json({ msg: "No user could be found" });
        };

        // a user was found so continue with login process

        // compare passwords
        const match = await compare(password, user.password);

        // password did not match
        if (!match) {
            return res.status(202).json({ msg: "Password is incorrect" });
        };

        // everything was good so issue jwt

        const accessToken = jwt.sign(
            { sub: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" },
        );

        return res.status(202).json({ accessToken });
    } catch (err) {
        return res.status(500).json({ msg: "Error occured whilst checking user details. ", err });
    };

};

const postRegister = [
    registerValidation,
    async (req, res, next) => {

    // get the result of the validation of this route
    const errors = validationResult(req).errors;

    // check if there were any errors, if so it will send them to the frontend and stop
    if (errors.length !== 0) {
        return res.status(400).json({ validationErrors: errors });
    };

    // no validation errors so carry on
    const username = req.body.username;
    const password = req.body.password;

    // check the username existance
    try {
        const alreadyExists = await prisma.users.findFirst({
            where: {
                username,
            },
        });

        // check if username is already existing
        if (alreadyExists) {
            return res.status(409).json({ msg: "Username already exists" });
        };

    } catch (err) {
        return res.status(500).json({ msg: "Error whilst trying to check user existance. ", err });
    };

    // register user
    try {
        // hash password
        const hashedPassword = await hash(password, 10);

        // add user to db
        const newUser = await prisma.users.create({
            data: {
                username,
                password: hashedPassword,
            },
        });

        // check user was registered
        if (!newUser) {
            return res.status(500).json({ msg: "Something went wrong whilst registering user." });

        } else { // all went well 
            return res.status(201).json({ msg: "User was registered successfully"});
        };
    } catch (err) {
        res.status(500).json({ msg: "Error whilst trying to register user.", err });
    };
}];

async function postCreateChat(req, res, next) {

    const usernames = [req.body.username];
    const currentUserId = { id: req.user.sub }; // the user making the chat in the form that the prisma query below will be like so i can easily push into the array made below
    let chatUsers = [];
    
    // try to check users exist and add all their id's into an array if they do
    try {
        chatUsers = await prisma.users.findMany({
            where: {
                username: { in: usernames },
            },
            select: {
                id: true,
            },
        });

        console.log("usernames: ", usernames)
        console.log("usernamesLength: ", usernames.length)
        console.log("chatUsers: ", chatUsers)
        console.log("chatUsersLength: ", chatUsers.length)


        // if one or more users doesnt exist
        if (chatUsers.length !== usernames.length) {
            return res.status(400).json({ msg: "One or more of the users could not be found." });
        } else { // all found so add the current user to it
            chatUsers.push(currentUserId)
            console.log(chatUsers)
        };

    } catch (err) {
        return res.status(500).json({ err });
    };

    // try to create a chat and put these users inside of it - updates both tables
    try {
        const createChat = await prisma.chats.create({
            data: {
                users: {
                    create: chatUsers.map(user => ({
                        user: {
                            connect: { id: user.id },
                        },
                    })),
                },
            },
        });

        console.log(createChat)

        if (!createChat) {
            return res.status(500).json({ msg: "Could not create chat." });
        };
    } catch (err) {
        return res.status(500).json({ msg: "Error whilst making chat", err })
    }
};

export {
    postLogin,
    postRegister,
    postCreateChat,
}