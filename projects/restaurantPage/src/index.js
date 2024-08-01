import "./style.css";

const homeBtn = document.getElementById("homeBtn");
const menuBtn = document.getElementById("menuBtn");
const aboutBtn = document.getElementById("aboutBtn");
const contactBtn = document.getElementById("contactBtn");
const mainContent = document.getElementById("content");
const title = document.getElementById("navText");
const pageTitle = document.getElementById("pageTitle");

console.log("this is the index page")

import { homePage } from "./homePage.js"
homeBtn.addEventListener("click", () => {
    homePage()
})
import { menuPage } from "./menuPage.js"
menuBtn.addEventListener("click", () => {
    menuPage()
})
import { aboutPage } from "./aboutPage.js"
aboutBtn.addEventListener("click", () => {
    aboutPage()
})
import { contactPage } from "./contactPage.js"
contactBtn.addEventListener("click", () => {
    contactPage()
})

title.addEventListener("click", () => {
    homePage()
})

document.addEventListener("DOMContentLoaded", () => {
    homePage()
})
