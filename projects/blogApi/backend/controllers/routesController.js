import passport from "passport";
import jwt from "jsonwebtoken";

import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

import { validationResult, body } from "express-validator";

import { hash, compare } from "bcrypt";

const signUpValidation = [
    body("username")
        .trim()
        .isLength({ min: 3, max: 15}).withMessage("Username needs to be 3 and 15 characters long")
        .isAlphanumeric().withMessage("Username can only contain A-Z, a-z, 0-9"),
    body("password")
        .trim()
        .isLength({ min: 5, max: 30 }).withMessage("Password can only be between 5 and 30 character long")
        .matches(/^[\x21-\x7E]+$/).withMessage("Password can only contain letters, numbers, symbols"), // this regex code allows letters, symbols and numbers but not spaces
    body("passwordConfirm")
        .trim()
        .custom((passwordConfirm, { req }) => { //custom validator that checks if passwords match, if false it then adds the fail message to validation results which i will loop through later on
            return passwordConfirm === req.body.password;
        }).withMessage("Passwords do not match."),
];

const createOrEditBlogValidation = [
    body("blogTitle")
        .trim()
        .isAscii().withMessage("Title can only include letters, numbers and symbols. ")
        .isLength({ min: 5, max: 50 }).withMessage("Title has to be between 5 and 50 characters long. "),
    body("blogContent")
        .trim()
        .isAscii().withMessage("Blog can only contain letter, numbers and symbols. ")
        .isLength({ min: 100, max: 1000 }).withMessage("Blog can only be between 100 and 1000 characters long. "),
];

const createCommentValidation = [
    body("commentTitle")
        .trim()
        .optional({ checkFalsy: true })
        .isAscii().withMessage("Comment title can only contain letter, numbers and symbols. ")
        .isLength({ max: 20 }).withMessage("Comment title can only be between 1 and 20 characters long. "),
    body("commentContent")
        .trim()
        .isAscii("Comment can only contain letter, numbers and symbols. ")
        .isLength({ min: 1, max: 200 }).withMessage("Comment can only be between 1 and 200 characters long. "),
];

const postSignUpRoute = [
    signUpValidation,
    async (req, res) => { 
    
    const username = req.body.username;
    const password = req.body.password;
    const hashedPassword = await hash(password, 10);
    console.log("just made: ", hashedPassword)

    // the result of validation
    const result = validationResult(req);

    // if there are errors
    if (!result.isEmpty()) {
        return res.status(400).json({ msg: "Form was not field out correctly ", validationErrors: result.array() });
    };

    try {
        const usernameExists = await prisma.users.findFirst({
            where: {
                username: username,
            },
        });

        if (usernameExists) {
            return res.status(400).json({ msg: "Username already exists" });
        };
    } catch (err) {
        return res.status(500).json({ err, line: 77 });
    };

    try {
        console.log("just before add: ", hashedPassword)
        const addUser = await prisma.users.create({
            data: {
                username: username,
                password: hashedPassword,
            },
        });

        if (!addUser) {
            return res.status(400).json({ msg: "User could not be added, try again "});
        };

        return res.status(201).json({ msg: "User has been signed up" });
    } catch (err) {
        return res.status(500).json({ err, line: 94 });
    };
    },
];


function postLoginRoute(req, res, next) {
    // use local strategy and dont just redirect but login user and then issue a jwt just before 
    passport.authenticate("local", { session: true }, (err, user, info) => {
        // no user could be found using local strategy
        if (err || !user) {
            return res.status(500).json({ err: info.msg, line: 106 });
        };
        
        // create a login session and when its done and returns a user in the form of req.user when completed
        req.login(user, { session: true }, (err) => {
            if (err) {
                return res.status(500).json({ err, line: 112 });
            };
        
            // issue a jwt 
            const token = jwt.sign(
                { sub: user.id },
                process.env.JWT_SECRET);

            // return jwt in the form of token and then log user in
            return res.json({token});
        });

        // call authenticate function
    })(req, res, next); 
};

function postLogoutRoute(req, res) {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ msg: "User could not be signed out. ", err });
        } else {
            // destroys parts of session that i want -  in this case its the cookies
            req.session.destroy(() => {
                res.clearCookie("connect.sid");
                return res.status(201).json({ msg: "User logged out" });
            });
        };
    });
};

async function getGetPublishedRoute(req, res) {
    try {
        const getBlogs = await prisma.blogs.findMany({
            where: {
                is_published: true,
            },
            select: {
                blog_title: true,
                creation_time: true,
                last_modified: true,
                users: {
                    select: {
                        username: true,
                    },
                },
            },
        });

        if (!getBlogs) {
            return res.status(500).json({ msg: "Error whilst serching database for blogs" });
        };

        res.status(201).json({ msg: "Blog search was a success ", blogs: getBlogs });
    } catch (err) {
        res.status(500).json({ err: err });
    };
};

async function getGetBlogRoute(req, res) {
    const blogName = req.params.blogName;
    console.log(req.user)

    if (!req.user) {
        return res.status(401).json({ msg: "User is not signed in"});
    };

    try {
        const getBlog = await prisma.blogs.findFirst({
            where: {
                blog_title: blogName,
            },
        });

        return res.status(201).json({ msg: "Found user blogs", blog: getBlog });
    } catch (err) {
        return res.status(401).json({ error: err });
    };
};

async function getGetCommentsRoute(req, res) {
    const blogName = req.params.blogName;
    let blogId;

    try {
        blogId = await prisma.blogs.findFirst({
            where: {
                blog_title: blogName,
            },
            select: {
                id: true,
            },
        });

    } catch (err) {
        return res.status(500).json({ msg: "An error occured when getting blogId for comments", error: err });
    };

    try {
        const getComments = await prisma.comments.findMany({
            where: {
                blogId: blogId.id,
            },
            select: {
                creation_time: true,
                comment_title: true,
                comment_content: true,
                users: {
                    select: {
                        username: true,
                    },
                },
            },
        });

        if (getComments.length < 1) {
            return res.status(201).json({ msg: "Successful search, blog has no comments", comments: []});
        };

        return res.status(201).json({ msg: "Successful search", comments: getComments });
    } catch (err) {
        return res.status(500).json({ msg: "An error occured when getting comments from database", err: err });
    };
};

const postCreateCommentRoute = [
    
    createCommentValidation, 
    async (req, res) => {

    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(400).json({ msg: "Comment was not created correctly ", validationErrors: result.array() });
    };

    const blogName = req.body.blogName;
    const commentTitle = req.body.commentTitle;
    const commentContent = req.body.commentContent;

    let getBlogId;

    try {
        getBlogId = await prisma.blogs.findFirst({
            where: {
                blog_title: blogName,
            },
            select: {
                id: true,
            },
        });

        if (!getBlogId) {
            console.error("blog could not be found to add comment to. ");
            return res.status(404).json({ msg: "blog could not be found to add comment to. "});
        };
    } catch (err) {
        console.error("Unexpected server side error: ", err);
        return res.status(500).json({err: err, line: 161});
    };


    try {
        const addComment = await prisma.comments.create({
            data: {
                userId: req.user.id,
                blogId: getBlogId.id,
                comment_title: commentTitle,
                comment_content: commentContent,
            },
        });

        if (!addComment) {
            console.error("Server side error and comment was not added");
            return res.status(500).json({err: "comment could not be added" });
        };

        return res.status(201).json({ msg: "Comment has been added" });
    } catch (err) {
        res.status(500).json({err, line: 181});
    };
    },
]

async function getMyBlogsRoute(req, res) {

    //check user is logged in
    if (!req.user) {
        return res.status(401).json({ msg: "User is not authenticated" });
    };

    try {
        const getBlogs = await prisma.blogs.findMany({
            where: {
                userId: req.user.id,
            },
            select: {
                creation_time: true,
                blog_title: true,
                is_published: true,
            },
        });

        if (!getBlogs) {
            return res.status(404).json({ msg: "Could not find any blogs from user. "});
        };  

        res.status(200).json({ msg: "Found user blogs", blogs: getBlogs });
    } catch (err) {
        throw new Error("Unexpected error has occured: ", err);
    };
};

const postPublishBlogRoute = [

    createOrEditBlogValidation,
    async (req, res) => {

    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(400).json({ msg: "Blog was not created corrected ", validationErrors: result.array() });
    };

    const blogTitle = req.body.blogTitle;
    const blogContent = req.body.blogContent;
    
    try {
        const addBlog = await prisma.blogs.create({
            data: {
                blog_content: blogContent,
                userId: req.user.id,
                blog_title: blogTitle,
                is_published: true,
            },
        });
    
        return res.status(201).json({ msg: "Blog has been published.", blog: addBlog });
    } catch (err) {
        // console.error("Unexpected Error: ", err);
        res.status(500).json({ error: "Blog could not be published." });
    };
    },
];


const postSaveBlogRoute = [
    createOrEditBlogValidation,

    async (req, res) => {

        const result = validationResult(req);

        if(!result.isEmpty()){
            return res.status(400).json({ msg: "Blog was not created corretly ", validationErrors: result.array() });
        };

        const blogTitle = req.body.blogTitle;
        const blogContent = req.body.blogContent;
    
        try {
            const addBlog = await prisma.blogs.create({
                data: {
                    blog_content: blogContent,
                    userId: req.user.id,
                    blog_title: blogTitle,
                },
            });
    
            return res.status(201).json({ msg: "Blog has been saved.", blog: addBlog });
        } catch (err) {
            // console.error("Unexpected Error: ", err);
            return res.status(500).json({ error: "Blog could not be saved." });
        };
    },
];

async function postEditBlogRoute(req, res) {
    const currentBlogTitle = req.params.blogName;
    const newBlogTitle = req.body.newBlogTitle;
    const newBlogContent = req.body.newBlogContent;

    let blogId;

    // find blogId since the update "where" clause only accepts one field 
    try {
        blogId = await prisma.blogs.findFirst({
            where: {
                userId: req.user.id,
                blog_title: currentBlogTitle,
            },
            select: {
                id: true,
            },
        });

        if (!blogId) {
            return res.status(404).json({ err: "Could not find user's blog "});
        };
    } catch (err) {
        res.status(500).json({ err });
    };

    try {
        const updateBlog = await prisma.blogs.update({
            where: {
                id: blogId.id,
            },
            data: {
                blog_title: newBlogTitle,
                blog_content: newBlogContent,
            },
        });

        if (!updateBlog) {
            res.status(404).json({msg: "Failed update on blog"})
        };

        return res.status(201).json({ msg: "Successful update on blog "});
    } catch (err) {
        return res.status(500).json({err: err});
    };
};

export {
    postSignUpRoute,
    postLoginRoute,
    postLogoutRoute,
    getGetPublishedRoute,
    getGetBlogRoute,
    getGetCommentsRoute,
    postCreateCommentRoute,
    getMyBlogsRoute,
    postPublishBlogRoute,
    postSaveBlogRoute,
    postEditBlogRoute,
}