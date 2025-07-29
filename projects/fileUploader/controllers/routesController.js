async function getIndexRoute(req, res) {
    console.log("hi")
    res.render("signUpPage");
}

async function postSignUpRoute(req, res) {
    console.log(req.body)
    res.redirect("/")
    console.log(req.body)

}

module.exports = {
    getIndexRoute,
    postSignUpRoute,
}