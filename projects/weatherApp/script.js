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
const rightArrow = document.getElementById("rightArrow");
const leftArrow = document.getElementById("leftArrow");
const date = document.getElementById("date");
const wrapper = document.getElementById("wrapper");

let userLocation;
let tempC;
let tempF;
let feelsLikeC;
let feelsLikeF;
let dewC;
let dewF;
let icon;
let dateNum = 0;
let isCelsius = 1;

function dataFetch() {


    if (locationInput.value === "") {
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

            leftArrow.innerHTML = " < ";
            rightArrow.innerHTML = " > ";
            
            console.log(responseJSON)

            //weather icon 
            icon = responseJSON.days[dateNum].icon;

            //celsius
            tempC = responseJSON.days[dateNum].temp;
            feelsLikeC = responseJSON.days[dateNum].feelslike;
            dewC = responseJSON.days[dateNum].dew;

            //farenheit
            tempF = (tempC * 9/5) + 32;
            feelsLikeF = (feelsLikeC * 9/5 + 32);
            dewF = (dewC * 9/5) + 32;
            
            date.innerHTML = responseJSON.days[dateNum].datetime + " (All times shown are local)";

            searchLocation.innerHTML = responseJSON.resolvedAddress;

            conditions.innerHTML = responseJSON.days[dateNum].conditions;

            description.innerHTML = responseJSON.days[dateNum].description;

            temp.innerHTML = tempC + "°C";

            UVIndex.innerHTML = responseJSON.days[dateNum].uvindex;

            feelsLike.innerHTML = feelsLikeC + "°C";

            precipitation.innerHTML = responseJSON.days[dateNum].precip + " mm"

            dew.innerHTML = dewC + "°C";

            humidity.innerHTML = responseJSON.days[dateNum].humidity + "%";

            cloudCover.innerHTML = responseJSON.days[dateNum].cloudcover + "%";

            precipProb.innerHTML = responseJSON.days[dateNum].precipprob + "%";

            if (responseJSON.days[dateNum].preciptype == null) {
                precipType.innerHTML = "None"
            } else {
                precipType.innerHTML = responseJSON.days[dateNum].preciptype;
            }
            
            pressure.innerHTML = responseJSON.days[dateNum].pressure + "hPa";

            sunrise.innerHTML = responseJSON.days[dateNum].sunrise;

            sunset.innerHTML = responseJSON.days[dateNum].sunset;

            visibility.innerHTML = responseJSON.days[dateNum].visibility + " miles";

            windGust.innerHTML = responseJSON.days[dateNum].windgust + " mph";

            windSpeed.innerHTML = responseJSON.days[dateNum].windspeed + " mph";

            windDirection.innerHTML = responseJSON.days[dateNum].winddir + "°";

            // // if statement for background depending on the weather conditions
            if (icon === "partly-cloudy-day") {
                // document.body.style.backgroundImage = "url('snowy-gif.webp')";
                document.body.style.backgroundRepeat = "no-repeat";
                document.body.style.backgroundSize = "cover";
            };
        }
    )
    .then (
        locationInput.value = ""
    )
    .catch ((err) => {
        console.log(err)
    })
}


searchBtn.addEventListener("click", function(event) {
    event.preventDefault();
    dataFetch();
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

leftArrow.addEventListener("click", function() {
    if (dateNum < 1) {
        return;
    } else {
        dateNum--;
        dataFetch();
    }

})

rightArrow.addEventListener("click", function() {
    // console.log(dateNum)
    if (dateNum === 14) {
        dateNum = 0;
        dataFetch();
    } else {
        dateNum++;
        dataFetch();
    }
})

dataFetch();

