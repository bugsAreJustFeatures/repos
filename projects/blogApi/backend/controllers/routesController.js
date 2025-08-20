import passport from "passport";
import jwt from "jsonwebtoken";

function postLoginRoute(req, res, next) {
    // use local strategy and dont just redirect but login user and then issue a jwt just before 
    passport.authenticate("local", { session: false }, (err, user) => {
        // no user could be found using local strategy
        if (err || !user) {
            return res.status(401).json({message: "invalid details entered"});
        };

        // create a login session and when its done and returns a user in the form of req.user when completed
        req.login(user, { session: false }, (err) => {
            if (err) {
                return res.status(500).json({message: "login failed"});
            };
        
            // issue a jwt 
            const token = jwt.sign(
                { sub: user.id },
                "secret"); // change to env

            // return jwt in the form of token and then log user in
            return res.json({token});
        });
        // call authenticate function
    })(req, res, next); 
};

function getBlogsRoute(req, res) {
    console.log(req.user)
    return res.json({"page": "blogs", "Token": req.headers.authorization})
};

export {
    postLoginRoute,
    getBlogsRoute,
}