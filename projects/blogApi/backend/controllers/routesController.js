import passport from "passport";
import jwt from "jsonwebtoken";

function getIndexRoute(req, res) {
    console.log(req.user)
    res.json({"page": "index", "Token": "no token"});
};

function getSignupRoute(req, res) {
    res.json({"page": "signup", "Token": "no token"});
};

function getLoginRoute(req, res) {
    res.json({"page": "login", "Token": "no token"});
};

function postLoginRoute(req, res, next) {
    passport.authenticate("local", { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(401).json({message: "invalid details entered"});
        };

        req.login(user, { session: false }, (err) => {
            if (err) {
                return res.status(500).json({message: "login failed"});
            };

            const token = jwt.sign(
                { sub: user.id },
                "secret"); // change to env

            return res.json({token});
        });
    })(req, res, next);
};

function getBlogsRoute(req, res) {
    console.log("hi")
    return res.json({"page": "blogs", "Token": req.headers.authorization})
};

export {
    getIndexRoute, 
    getSignupRoute,
    getLoginRoute,
    postLoginRoute,
    getBlogsRoute,
}