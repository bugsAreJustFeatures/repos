
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
    alert("This should take you to the home page when clicked")
})

console.log("This is the home page"); // testing pages loading correctly


// ------- DOM Creation ------- //

const homeContent = document.createElement("div");
homeContent.classList.add("homeContent");
mainContent.appendChild(homeContent);

const homeInformation = document.createElement("div");
homeInformation.classList.add("homeInfo");
homeInformation.innerHTML = 
"Welcome to Food Haven, where culinary artistry meets warm hospitality. Nestled in the heart of downtown, our restaurant is a sanctuary for food enthusiasts seeking an unforgettable dining experience. Our chefs craft each dish with locally sourced, fresh ingredients, blending innovative techniques with timeless flavors. From our elegantly plated appetizers to our decadent desserts, every bite is a celebration of taste and tradition. Whether you're here for a romantic dinner, a family gathering, or a casual brunch with friends, Food Haven promises an ambiance of sophistication and comfort. Join us and savor the extraordinary—where every meal is a masterpiece."

const homeInfoImg = document.createElement("img");
homeInfoImg.classList.add("restaurantImg");
homeInfoImg.src = "https://cdn.sortiraparis.com/images/80/100789/834071-too-restaurant-too-hotel-paris-photos-menu-entrees.jpg";
homeContent.appendChild(homeInfoImg);


homeContent.appendChild(homeInformation);
