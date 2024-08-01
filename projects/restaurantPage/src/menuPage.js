
export function menuPage() {

    const mainContent = document.getElementById("content");
    pageTitle.innerHTML = "Menu Page";
    mainContent.innerHTML = "";


    const menuContent = document.createElement("div");
menuContent.classList.add("menuContent")
mainContent.appendChild(menuContent);

function menuItemCreator(n) {
    for (let i = 0; i < n; i++) {
    let menuItem = document.createElement("div");
    menuItem.innerHTML = "Description: This dish is a .... and includes .... with the optional sides of .... . We recommend you try .... with some .... and with some complimentary .... to wash it down. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Contains: ... . This is also Vegetarian/vegan"
    menuItem.classList.add("menuItem");
    menuContent.appendChild(menuItem);
    let menuItemImg = document.createElement("img");
    menuItemImg.classList.add("menuItemImg")
    menuItemImg.src = "https://khni.kerry.com/wp-content/uploads/2019/02/Restaurant-meal.jpg";
    menuItem.appendChild(menuItemImg);
    let menuItemSecondImg = document.createElement("img");
    menuItemSecondImg.classList.add("menuItemSecondImg")
    menuItemSecondImg.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHjyu2ypcRkZch9vOTgj2HbCBGcUtChz-WYg&s";
    menuItem.appendChild(menuItemSecondImg);
}
}

menuItemCreator(5)
}


