import "./style.css";

import { homePage } from "./homePage.js"
import { menuPage } from "./menuPage.js"
import { aboutPage } from "./aboutPage.js"
import { contactPage } from "./contactPage.js"

homeBtn.addEventListener("click", homePage())
menuBtn.addEventListener("click", menuPage())
aboutBtn.addEventListener("click", aboutPage())
contactBtn.addEventListener("click", contactPage())
