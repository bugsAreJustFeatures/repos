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
const cloudCover = document.getElementById("cloudCover");
const precipProb = document.getElementById("precipProb");
const precipType = document.getElementById("precipType");
const pressure = document.getElementById("pressure");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const visibility = document.getElementById("visibility");
const windGust = document.getElementById("windGust");
const windSpeed = document.getElementById("windSpeed");
const windDirection = document.getElementById("windDirection");

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
    
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${userLocation}?unitGroup=uk&key=A7F4BSEBQN5MBP9CX6QRGQQUQ`)
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
            
            searchLocation.innerHTML = responseJSON.resolvedAddress;

            conditions.innerHTML = responseJSON.currentConditions.conditions;

            description.innerHTML = responseJSON.description;

            temp.innerHTML = tempC + "°C";

            UVIndex.innerHTML = responseJSON.currentConditions.uvindex;

            feelsLike.innerHTML = feelsLikeC + "°C";

            precipitation.innerHTML = responseJSON.currentConditions.precip + " mm"

            dew.innerHTML = dewC + "°C";

            humidity.innerHTML = responseJSON.currentConditions.humidity + "%";

            cloudCover.innerHTML = responseJSON.currentConditions.cloudcover + "%";

            precipProb.innerHTML = responseJSON.currentConditions.precipprob + "%";

            if (responseJSON.currentConditions.preciptype == null) {
                precipType.innerHTML = "None"
            } else {
                precipType.innerHTML = responseJSON.currentConditions.preciptype;
            }

            //----------- !!!!!! this causes error because there is no precip so preciptype = null, need to find a way of making it say None if there is no precip !!!!!!!!!! -----------// also need to add button in top right corner to make days change
            

            pressure.innerHTML = responseJSON.currentConditions.pressure + "hPa";

            sunrise.innerHTML = responseJSON.currentConditions.sunrise + " (local time)";

            sunset.innerHTML = responseJSON.currentConditions.sunset + " (local time)";

            visibility.innerHTML = responseJSON.currentConditions.visibility + " miles";

            windGust.innerHTML = responseJSON.currentConditions.windgust + " mph";

            windSpeed.innerHTML = responseJSON.currentConditions.windspeed + " mph";

            windDirection.innerHTML = responseJSON.currentConditions.winddir + "°";

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
        temp.innerHTML = tempF.toFixed(1) + "°F";
        feelsLike.innerHTML = feelsLikeF.toFixed(1) + "°F"
        dew.innerHTML = dewF.toFixed(1) + "°F"
        changeBtn.innerHTML = "°F";
    } else {
        //odd and false so change to celsius
        temp.innerHTML = tempC.toFixed(1) + "°C";
        feelsLike.innerHTML = feelsLikeC.toFixed(1) + "°C"
        dew.innerHTML = dewC.toFixed(1) + "°C"
        changeBtn.innerHTML = "°C";
    };
})



