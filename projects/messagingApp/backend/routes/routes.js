import { Router } from "express";
const router = Router();

import { postLogin, postRegister } from "../controllers/routesController.js";

router.post("/login", postLogin);

router.post("/register", postRegister);


export default router;