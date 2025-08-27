import express from "express";
const router = express.Router();

import { postSignUpRoute, getMyBlogsRoute, postLoginRoute, getGetBlogRoute, getGetCommentsRoute, postPostBlogRoute, postSaveBlogRoute, postLogoutRoute, postCreateCommentRoute, getGetPublishedRoute, postEditBlogRoute } from "../controllers/routesController.js";

import passport from "passport";

//----- signup routes -----//
router.post("/sign-up", postSignUpRoute);

//----- login routes -----//
router.post("/login", postLoginRoute); // i use passport in the function

//----- logout routes -----//
router.post("/log-out", postLogoutRoute); 

router.get("/getPublishedBlogs", passport.authenticate("jwt", { session: false }), getGetPublishedRoute);

//----- my-blog routes -----//
router.get("/my-blogs",  passport.authenticate("jwt", { session: false }), getMyBlogsRoute);

//----- view blogs routes -----//
router.get("/view-blogs/:blogName", passport.authenticate("jwt", { session: false }), getGetBlogRoute);

router.get("/view-blogs/:blogName/comments", passport.authenticate("jwt", { session: false }), getGetCommentsRoute);

//----- create comment routes -----//
router.post("/createComment", passport.authenticate("jwt", { session: false }), postCreateCommentRoute);

//----- publish blog routes -----//
router.post("/postBlog", passport.authenticate("jwt", { session: false }), postPostBlogRoute);

//----- save blog routes -----//
router.post("/saveBlog", passport.authenticate("jwt", { session: false }), postSaveBlogRoute);

//----- edit blog routes -----//
router.post("/update-blog/:blogName", passport.authenticate("jwt", { sessions: false }), postEditBlogRoute)


export default router