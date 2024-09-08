const btn = document.querySelector("button");
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

let userLocation;
userLocation = "london"



btn.addEventListener("click", function() {
    fetch (`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${userLocation}?unitGroup=uk&key=A7F4BSEBQN5MBP9CX6QRGQQUQ`)
    .then (
        function(response) {
            return(response.json())
        })
    .then (
        function(responseJSON) {
            console.log(responseJSON)
            // weatherIcon.src = responseJSON.currentConditions.icon
            searchLocation.innerHTML = "Location: " + responseJSON.resolvedAddress;
            conditions.innerHTML = "Conditions: " + responseJSON.currentConditions.conditions;
            description.innerHTML = "Description: " + responseJSON.description;
            temp.innerHTML = "Temperature: " + responseJSON.currentConditions.temp + "°C"
            feelsLike.innerHTML = "Feels Like: " + responseJSON.currentConditions.feelslike + "°C";
            precipitation.innerHTML = "Precipitation: " + responseJSON.currentConditions.precip + " mm"
            dew.innerHTML = "Dew Point: " + responseJSON.currentConditions.dew + "°";
            humidity.innerHTML = "Humidity: " + responseJSON.currentConditions.humidity + "%";
        }
    )
    .catch ((err) => {
        console.log(err)
    })
})




