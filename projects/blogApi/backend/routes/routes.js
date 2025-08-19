import express from "express";
const router = express().router;

import { getBlogsRoute, getIndexRoute, getLoginRoute, getSignupRoute, postLoginRoute } from "../controllers/routesController.js";
import passport from "passport";

//----- index routes -----//
router.get("/", getIndexRoute);

//----- sign-up routes -----//
router.get("/signup", getSignupRoute);

//----- login routes -----//
router.get("/login", getLoginRoute);

router.post("/login", postLoginRoute);;

//----- blogs routes -----//
router.get("/blogs",  passport.authenticate("jwt", {session: false }), getBlogsRoute);


export default router