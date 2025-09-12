// imports
import express from "express";
import { postFinishGame, postCheckResults, postStartTimer, postHomeRoute } from "../controllers/routesController.js";
import passport from "passport";

// make router within express route
const router = express.Router();

router.post("/", postHomeRoute);

router.post("/check/:sceneNumber", passport.authenticate("jwt", { session: false }), postCheckResults);

router.post("/start-timer", passport.authenticate("jwt", { session: false }), postStartTimer);

router.post("/finish-game", passport.authenticate("jwt", { session: false }), postFinishGame);

// export router as default
export default router;