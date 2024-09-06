const btn = document.querySelector("button");
const weatherIcon = document.getElementById("weatherIcon");
const conditions = document.getElementById("conditions");
const dew = document.getElementById("dew");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");


let userLocation;
userLocation = "England"
let response;

btn.addEventListener("click", async function() {
    fetch (`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${userLocation}?key=A7F4BSEBQN5MBP9CX6QRGQQUQ`)
    .then (
        function(response) {
            return(response.json())
        })
    .then (
        function(responseJSON) {
            console.log(responseJSON)
            // weatherIcon.src = responseJSON.currentConditions.icon
            conditions.innerHTML = "Conditions: " + responseJSON.currentConditions.conditions;
            dew.innerHTML = "Dew: " + responseJSON.currentConditions.dew;
            feelsLike.innerHTML = "Feels Like: " + responseJSON.currentConditions.feelslike;
            humidity.innerHTML = "Conditions: " + responseJSON.currentConditions.humidity;
            
        }
    )
    .catch ((err) => {
        console.log(err)
    })
})




