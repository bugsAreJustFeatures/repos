import express from "express";
const router = express().router;

import { getBlogsRoute, postLoginRoute } from "../controllers/routesController.js";
import passport from "passport";

//----- login routes -----//
router.post("/login", postLoginRoute); // i use passport.authenticate("local") in the function

//----- blogs routes -----//
router.get("/blogs",  passport.authenticate("jwt", {session: false }), getBlogsRoute);


export default router