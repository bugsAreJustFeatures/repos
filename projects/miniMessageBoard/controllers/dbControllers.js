const db = require("../database/queries")

  async function renderHomePage(req, res) {
    const data = await db.getRows()
    console.log(data)
    res.render("index", {messages: data})
  }

  function renderFormPage(req, res) {
    res.render("form")
  }

  async function sendForm(req, res) {
    let name = req.body.messageName
    let message = req.body.messageText
    let date = new Date().toLocaleString('en-GB')
    await db.addMessage(name, message, date)
    res.redirect("/")
  }

  module.exports = {
    renderHomePage,
    renderFormPage,
    sendForm
  }

