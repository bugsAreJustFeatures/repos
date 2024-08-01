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

console.log("This is the about page"); // testing pages loading correctly

// -------About Page------- //

const aboutContent = document.createElement("div");
aboutContent.classList.add("aboutContent");
mainContent.appendChild(aboutContent);


//one
const aboutOne = document.createElement("div");
aboutOne.classList.add("aboutOne");
aboutContent.appendChild(aboutOne);

const aboutOneImg = document.createElement("img");
aboutOneImg.classList.add("aboutImg");
aboutOneImg.id = "aboutImgOne"
aboutOneImg.src = "https://www.yourviva.com/storage/app/uploads/public/5c0/f9a/203/5c0f9a2039d29595660780.jpg";
aboutOne.appendChild(aboutOneImg);

const aboutOneText = document.createElement("p");
aboutOneText.classList.add("aboutText");
aboutOneText.id = "aboutTextOne"
aboutOneText.innerHTML = "Food Haven, a cozy and vibrant restaurant, was founded in 2016 by a team of passionate culinary enthusiasts. We all shared a vision to establish a haven for food lovers, focusing on fresh, locally-sourced ingredients and innovative recipes. Our combined expertise and dedication to the culinary arts brought Food Haven to life, creating a unique dining experience that quickly resonated with the local community.";
aboutOne.appendChild(aboutOneText);


//two
const aboutTwo = document.createElement("div");
aboutTwo.classList.add("aboutTwo");
aboutContent.appendChild(aboutTwo);

const aboutTwoImg = document.createElement("img");
aboutTwoImg.classList.add("aboutImg");
aboutTwoImg.id = "aboutImgTwo"
aboutTwoImg.src = "https://i.ytimg.com/vi/OjaLVf10UKY/maxresdefault.jpg";
aboutTwo.appendChild(aboutTwoImg);

const aboutTwoText = document.createElement("p");
aboutTwoText.classList.add("aboutText");
aboutTwoText.id = "aboutTextTwo"
aboutTwoText.innerHTML = "Today, Food Haven is thriving more than ever. The business is flourishing, with a steady stream of loyal customers and glowing reviews. The team behind Food Haven couldn't be happier with the restaurant's success. Our dedication to fresh, locally-sourced ingredients and innovative recipes has paid off, making Food Haven a beloved dining destination. We are overjoyed to see our vision come to life and to witness the community's continued support and appreciation for our culinary haven. The team's commitment to excellence has not only enhanced our reputations, but also reaffirmed our passion in providing an exceptional dining experience."
aboutTwo.appendChild(aboutTwoText);


//three
const aboutThree = document.createElement("div");
aboutThree.classList.add("aboutThree");
aboutContent.appendChild(aboutThree);

const aboutThreeImg = document.createElement("img");
aboutThreeImg.classList.add("aboutImg");
aboutThreeImg.id = "aboutImgThree"
aboutThreeImg.src = "https://thumbs.dreamstime.com/b/future-plans-billboard-future-plans-wall-light-box-billboard-background-isolated-white-113052227.jpg";
aboutThree.appendChild(aboutThreeImg);

const aboutThreeText = document.createElement("p");
aboutThreeText.classList.add("aboutText");
aboutThreeText.id = "aboutTextThree"
aboutThreeText.innerHTML = "Looking ahead, we at Food Haven are excited about the future and have ambitious plans for the next few years. The aim is to expand te menu with new and seasonal offerings that continue to celebrate local ingredients and innovative cooking techniques. Additionally, we are exploring opportunities to open new locations, bringing the Food Haven experience to a broader audience while maintaining the intimate, personalized touch that their current patrons cherish. The team is also committed to enhancing our community involvement through local partnerships and sustainable practices, reinforcing their dedication to both their customers and the environment."
aboutThree.appendChild(aboutThreeText);