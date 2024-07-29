import "./style.css"; // importing the page styling 


//linking dom to html elements
const homeBtn = document.getElementById("homeBtn");
const menuBtn = document.getElementById("menuBtn");
const aboutBtn = document.getElementById("aboutBtn");
const contactBtn = document.getElementById("contactBtn");
const mainContent = document.getElementById("content");
const title = document.getElementById("navText");

//nav buttons events for pages
homeBtn.addEventListener("click", () => {
    alert("Hey this is the home btn that does not work yet")
})

menuBtn.addEventListener("click", () => {
    alert("Hey this is the menu btn that does not work yet")
})

aboutBtn.addEventListener("click", () => {
    alert("Hey this is the about btn that does not work yet")
})

contactBtn.addEventListener("click", () => {
    alert("Hey this is the contact btn that does not work yet")
})

title.addEventListener("click", () => {
    
})

console.log("This is the contact page"); // testing pages loading correctly





