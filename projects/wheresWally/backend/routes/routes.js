// imports
import express from "express";
import { postCheckResults } from "../controllers/routesController.js";

// make router within express route
const router = express.Router();

router.post("/check/:sceneNumber", postCheckResults);

// export router as default
export default router;