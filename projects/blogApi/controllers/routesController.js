function getIndexRoute(req, res) {
    res.render("loginPage");
};

function getHomeRoute(req, res) {
    res.render("homePage");
};

module.exports = {
    getIndexRoute,
    getHomeRoute,
}