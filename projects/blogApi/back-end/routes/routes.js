const { Router } = require("express");
const router = Router();
const passport = require("passport");

const routesController = require("../controllers/routesController");

//---- home routes ----//

router.get("/", routesController.getHomeRoute);

//---- login routes ----//

router.get("/login", routesController.getLoginRoute);

router.post("/login", passport.authenticate("local"), routesController.postIssueJwt);
    // call local strategy to authenticate user and log them in
    // then dont resdirect just yet
    // call the jwt strategy 
    // issue jwt and then redirect after this
    // since a success will only happen if there is a user to serialise and place in the payload
    // otherwise if there is no user, can check with passing in user and checking if it exists, then    
    // i will do a failureredirect like above

//---- blog routes ----//
router.get("/blog", routesController.getBlogRoute);

module.exports = router;