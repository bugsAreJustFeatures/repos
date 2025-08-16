const jwt = require("jsonwebtoken");

function getLoginRoute(req, res) {
    res.render("loginPage");
};

function getHomeRoute(req, res) {
    res.render("homePage");
};

function getBlogRoute(req, res) {
    res.render("blogPage")
};

async function postIssueJwt(req, res) {
    console.log("req.user: ", req.user)
    const user = req.user;

    const token = jwt.sign(user.id, process.env.SECRET_JWT_KEY);

    res.json({ token: token });

};

module.exports = {
    getLoginRoute,
    getHomeRoute,
    getBlogRoute,
    postIssueJwt,
}