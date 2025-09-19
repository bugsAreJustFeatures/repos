import { Router } from "express";
const router = Router();

import { postLogin, postRegister } from "../controllers/routesController.js";

import { checkJwt } from "../controllers/jwtController.js";

router.post("/login", postLogin);

router.post("/register", postRegister);

router.post("/checkAuth", checkJwt);

export default router;