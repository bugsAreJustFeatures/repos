import { Router } from "express";
const router = Router();

import { postCreateChat, postLogin, postRegister } from "../controllers/routesController.js";

import { checkJwtMiddleware, checkJwtRouteHandler } from "../controllers/jwtController.js";

router.post("/login", postLogin);

router.post("/register", postRegister);

router.post("/checkAuth", checkJwtRouteHandler);

router.post("/createChat", checkJwtMiddleware, postCreateChat)

export default router;