import jwt from "jsonwebtoken";

function checkJwt(req, res, next) {

    const bearerToken = req.headers.authorization; // get the authorization header

    // check the header is there
    if (bearerToken) {
        const token = bearerToken.split(" ")[1]; // get the jwt from the bearer token in header
    
        // decrypt the token to check its valid
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            // jwt was invalid 
            if (err) {
                return res.status(403).json({ msg: "JWT was invalid" });
            };
    
            // valid jwt
            req.user = user;
            return res.status(200).json({ msg: "JWT is valid" });
        });
    } else {
        // no jwt 
        return res.status(401).json({ msg: "No JWT could be found" });
    };
};

export {
    checkJwt,
}