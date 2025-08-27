import passport from "passport";
import jwt from "jsonwebtoken";

import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

async function postSignUpRoute(req, res) { 
    
    const username = req.body.username;
    const password = req.body.password;
    const passwordConfirm = req.body.passwordConfirm;

    try {

        if (password !== passwordConfirm) {// use bcrypt compare later on
            return res.status(401).json({ error: "Passwords do not match" });
        };

        const addUser = await prisma.users.create({
            data: {
                username,
                password,
            },
        });

        console.log("add user: ", addUser)

        if (!addUser) {
            throw new Error("Server request went wrong")
        }

        res.status(201).json({ msg: "User has been signed up", "welcome": `Welcome ${username}!`});
        return;
    } catch (err) {
        res.status(406).json({ error: "User could not be added "});
        console.error("Error whilst signing user up: ", err);
    };
};

function postLoginRoute(req, res, next) {
    // use local strategy and dont just redirect but login user and then issue a jwt just before 
    passport.authenticate("local", { session: false }, (err, user) => {
        // no user could be found using local strategy
        if (err || !user) {
            return res.status(401).json({message: "invalid details entered"});
        };

        // create a login session and when its done and returns a user in the form of req.user when completed
        req.login(user, { session: false }, (err) => {
            if (err) {
                return res.status(500).json({message: "login failed"});
            };
        
            // issue a jwt 
            const token = jwt.sign(
                { sub: user.id },
                process.env.JWT_SECRET);

            // return jwt in the form of token and then log user in
            console.log(req.user)
            return res.json({token});
        });


        // call authenticate function
    })(req, res, next); 
};

function postLogoutRoute(req, res) {
    req.logout((err) => {
        if (err) {
            throw new Error("Error whilst logging out: ", err);
        };

        return res.status(201).json({ msg: "User logged out" });
    });
};

async function getGetPublishedRoute(req, res) {
    try {
        const getBlogs = await prisma.posts.findMany({
            where: {
                is_posted: true,
            },
            select: {
                post_title: true,
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

        console.log("getBlogs: ", getBlogs);

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
        const getBlog = await prisma.posts.findFirst({
            where: {
                post_title: blogName,
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
        blogId = await prisma.posts.findFirst({
            where: {
                post_title: blogName,
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
                postId: blogId.id,
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
            return res.status(201).json({ msg: "Successful search, post has no comments", comments: []});
        };

        return res.status(201).json({ msg: "Successful search", comments: getComments });
    } catch (err) {
        return res.status(500).json({ msg: "An error occured when getting comments from database", err: err });
    };
};

async function postCreateCommentRoute(req, res) {
    const blogName = req.body.blogName;
    const commentTitle = req.body.commentTitle;
    const commentContent = req.body.commentContent;

    console.log(blogName)
    console.log(commentTitle)
    console.log(commentContent)

    let getBlogId;

    try {
        getBlogId = await prisma.posts.findFirst({
            where: {
                post_title: blogName,
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
                postId: getBlogId.id,
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
};

async function getMyBlogsRoute(req, res) {

    //check user is logged in
    if (!req.user) {
        return res.status(401).json({ msg: "User is not authenticated" });
    };

    try {
        const getBlogs = await prisma.posts.findMany({
            where: {
                userId: req.user.id,
            },
            select: {
                creation_time: true,
                post_title: true,
                is_posted: true,
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

async function postPostBlogRoute(req, res) {
    const blogTitle = req.body.blogTitle;
    const blogContent = req.body.blogContent;

    try {
        const addBlog = await prisma.posts.create({
            data: {
                post_content: blogContent,
                userId: req.user.id,
                post_title: blogTitle,
                is_posted: true,
            },
        });

        return res.status(201).json({ msg: "Blog has been posted.", post: addBlog });
    } catch (err) {
        // console.error("Unexpected Error: ", err);
        res.status(500).json({ error: "Blog could not be posted." });
    };
};

async function postSaveBlogRoute(req, res) {
    const blogTitle = req.body.blogTitle;
    const blogContent = req.body.blogContent;

    try {
        const addBlog = await prisma.posts.create({
            data: {
                post_content: blogContent,
                userId: req.user.id,
                post_title: blogTitle,
            },
        });

        return res.status(201).json({ msg: "Blog has been saved.", post: addBlog });
    } catch (err) {
        // console.error("Unexpected Error: ", err);
        return res.status(500).json({ error: "Blog could not be saved." });
    };
};

async function postEditBlogRoute(req, res) {
    const currentBlogTitle = req.params.blogName;
    const newBlogTitle = req.body.newBlogTitle;
    const newBlogContent = req.body.newBlogContent;

    let postId;

    // find postId since the update "where" clause only accepts one field 
    try {
        postId = await prisma.posts.findFirst({
            where: {
                userId: req.user.id,
                post_title: currentBlogTitle,
            },
            select: {
                id: true,
            },
        });

        if (!postId) {
            return res.status(404).json({ err: "Could not find user's post "});
        };
    } catch (err) {
        res.status(500).json({ err });
    };

    try {
        const updateBlog = await prisma.posts.update({
            where: {
                id: postId.id,
            },
            data: {
                post_title: newBlogTitle,
                post_content: newBlogContent,
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
    postPostBlogRoute,
    postSaveBlogRoute,
    postEditBlogRoute,
}