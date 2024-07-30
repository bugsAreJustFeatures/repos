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

const contactContent = document.createElement("div");
contactContent.classList.add("contactContent");
mainContent.appendChild(contactContent);

const contactInfo = document.createElement("div");
contactInfo.classList.add("contactInfo");
contactInfo.innerHTML = "<u>Telephone:</u> &nbsp;&nbsp;+44 01234 567890 <br><br><br> <u>Email:</u> &nbsp;&nbsp;Info@FoodHaven.co.uk <br><br><br> <u>Location:</u> &nbsp;&nbsp;No. 10 Downing Street, London, England"
contactContent.appendChild(contactInfo);

const contactImg = document.createElement("img");
contactImg.classList.add("contactImg")
contactImg.src = "https://d.ibtimes.co.uk/en/full/1386743/google-maps-london-underground-logo.png?w=1600&h=1200&q=88&f=4e3b79ac62ed993b702a55d723c38ea5";
contactContent.appendChild(contactImg);



