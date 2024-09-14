const searchBtn = document.getElementById("searchBtn");
const changeBtn = document.getElementById("changeBtn");
const weatherIcon = document.getElementById("weatherIcon");
const searchLocation = document.getElementById("location");
const conditions = document.getElementById("conditions");
const description = document.getElementById("description");
const temp = document.getElementById("temp");
const dew = document.getElementById("dew");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const UVIndex = document.getElementById("UVIndex");
const precipitation = document.getElementById("precipitation");
const locationInput = document.getElementById("locationInput");

let userLocation;
let tempC;
let tempF;
let feelsLikeC;
let feelsLikeF;
let dewC;
let dewF;
let icon;
let isCelsius = 1;
let background = document.body.style.backgroundImage;


searchBtn.addEventListener("click", function(event) {
    event.preventDefault()

    if (locationInput.value == "") {
         userLocation = "London";
    } else {
        userLocation = locationInput.value;
    };
    
    fetch (`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${userLocation}?unitGroup=uk&key=A7F4BSEBQN5MBP9CX6QRGQQUQ`)
    .then (
        (response) => {
            return response.json()
        })
    .then (
        (responseJSON) => {
            console.log(responseJSON)

            //weather icon 
            icon = responseJSON.currentConditions.icon

            //celsius
            tempC = responseJSON.currentConditions.temp;
            feelsLikeC = responseJSON.currentConditions.feelslike;
            dewC = responseJSON.currentConditions.dew;

            //farenheit
            tempF = (tempC * 9/5) + 32;
            feelsLikeF = (feelsLikeC * 9/5 + 32);
            dewF = (dewC * 9/5) + 32;
            
            searchLocation.innerHTML = "Location: " + responseJSON.resolvedAddress;

            conditions.innerHTML = "Current Weather: " + responseJSON.currentConditions.conditions;

            description.innerHTML = "Description: " + responseJSON.description;

            temp.innerHTML = "Temperature: " + tempC + "°C";

            UVIndex.innerHTML = "UV Index: " + responseJSON.currentConditions.uvindex;

            feelsLike.innerHTML = "Feels Like: " + feelsLikeC + "°C";

            precipitation.innerHTML = "Precipitation: " + responseJSON.currentConditions.precip + " mm"

            dew.innerHTML = "Dew Point: " + dewC + "°C";

            humidity.innerHTML = "Humidity: " + responseJSON.currentConditions.humidity + "%";

            // // if statement for background depending on the weather conditions
            // if (icon = "snow") {
            //     background.src = "snowy-gif.webp"
            // } else if (icon === "partly-cloudy-day") {
            //     // background.src = "./stormy-gif.webp"
            //     document.body.style.backgroundColor = "black"
            // }
        }
    )
    .then (
        locationInput.value = ""
    )
    .catch ((err) => {
        console.log(err)
    })
});

changeBtn.addEventListener("click", function(event) {
    event.preventDefault()
    isCelsius++;

    if (isCelsius % 2 === 0) {
         //even and true so change to farenheit
        temp.innerHTML = "Temperature: " + tempF.toFixed(1) + "°F";
        feelsLike.innerHTML = "Feels Like: " + feelsLikeF.toFixed(1) + "°F"
        dew.innerHTML = "Dew Point: " + dewF.toFixed(1) + "°F"
        changeBtn.innerHTML = "°F";
    } else {
        //odd and false so change to celsius
        temp.innerHTML = "Temperature: " + tempC.toFixed(1) + "°C";
        feelsLike.innerHTML = "Feels Like: " + feelsLikeC.toFixed(1) + "°C"
        dew.innerHTML = "Dew Point: " + dewC.toFixed(1) + "°C"
        changeBtn.innerHTML = "°C";
    };
})



