const db = require("../database/queries")

async function logUsersGet (req, res) {
    const usernames = await db.getAllUsernames()
    console.log("Usernames: ", usernames)
    res.render("index", {title: "Index Page - With users", users: usernames.map(user => user.username).join(", ")})
}

function createUserGet (req, res) {
    res.render("createUser", {title: "Create User Page"})
}

async function createUserPost (req, res) {
    const { username } = req.body
    await db.insertUsername(username);
    res.redirect("/")
}  

async function searchThroughUsernames(req, res) {
    const string = req.query.searchBox;
    const names = await db.searchUsernames(string)
    res.render("findUsers", {users: names})
    // console.log(names)
}

function displaySearchPage(req, res) {
    res.render("search")
}

async function deleteAllUsersGet(req, res) {
    db.deleteUsernames()
    res.redirect("/")
}

module.exports = {
    logUsersGet,
    createUserGet,
    createUserPost,
    searchThroughUsernames,
    displaySearchPage,
    deleteAllUsersGet
}