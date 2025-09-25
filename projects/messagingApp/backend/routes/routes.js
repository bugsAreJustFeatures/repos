import { Router } from "express";
const router = Router();

import { getFetchChats, getFetchMessages, postCreateChat, postLogin, postRegister, postSendMessage } from "../controllers/routesController.js";

import { checkJwtMiddleware, checkJwtRouteHandler } from "../controllers/jwtController.js";

router.get("/fetchChats", checkJwtMiddleware, getFetchChats);

router.get("/fetchMessages/:chatName", checkJwtMiddleware, getFetchMessages);

router.post("/login", postLogin);

router.post("/register", postRegister);

router.post("/checkAuth", checkJwtRouteHandler);

router.post("/createChat", checkJwtMiddleware, postCreateChat);

router.post("/sendMessage", checkJwtMiddleware, postSendMessage);

export default router;