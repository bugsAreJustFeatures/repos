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
        }
    )
    .then (
        locationInput.value = ""
    )
    .catch ((err) => {
        console.log(err)
    })
});

// changeBtn.addEventListener("click", function() {

//     let isCelsius;
//     isCelsius = 0;

//     if (isCelsius / 2)

//     if (isCelsius) {
//         //change to farenheit
//         temp.innerHTML = "Temperature: " + tempF.toFixed(2) + "°F";
//         isCelsius += 2;
//         changeBtn.innerHTML = "Change to °C";
//     } else {
//         temp.innerHTML = "Temperature: " + tempC.toFixed(2) + "°C";
//         isCelsius += 1;
//         changeBtn.innerHTML = "Change to °F";
//     };
// })




