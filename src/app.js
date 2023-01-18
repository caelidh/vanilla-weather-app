let now = new Date();
console.log(now);
let today = now.getDate();
let days = ["Sunday",
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday"]
let day = days[now.getDay()];
let year = now.getFullYear();
let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[now.getMonth()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`
  }

  let currentDate = document.querySelector("#date");
  currentDate.innerHTML = `${day} ${month} ${today} ${year} ${hours}:${minutes}`


function formatDate(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}


function showForecast(response) {
let dailyForecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");


let forecastHTML =  `<div class="row">`;

dailyForecast.forEach(function(dailyForecast){
 forecastHTML = forecastHTML + `
    <div class="col-2">
        <div class="weather-forecast-date">
            ${formatDate(dailyForecast.dt)} </div>
            <img src ="http://openweathermap.org/img/wn/${
                dailyForecast.weather[0].icon
              }@2x.png"
              alt=""
              width="42" />
        
    </div>
        <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max">${Math.round(dailyForecast.temp.max)}°</span>
            <span class="weather-forecast-temperature-min">${Math.round(dailyForecast.temp.min)}°</span>
        </div>
    </div>`;   
})



forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
   ;
}

function getForecast(coordinates){
    let apiKey = "50fa4024e3b1d5eac2f51ab18a47e997"
    let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial
    `;
    axios.get(apiUrl).then(showForecast);
}


function showTemperature (response) {
   let temperatureElement = document.querySelector("#temperature-number");
    let cityElement = document.querySelector("#city-name");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let iconElement = document.querySelector("#icon");



    fahrenheitTemperature = Math.round(response.data.main.temp);

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);
}

function searchCity(city) {
    let apiKey = "50fa4024e3b1d5eac2f51ab18a47e997"; 
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`; 
    axios.get(apiUrl).then(showTemperature);
}

function submitLocation(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
}

function convertToCelsius(event) {
    event.preventDefault();
let celsiusTemperature = (fahrenheitTemperature - 32) * 5/9;
celsiusLink.classList.add("active");
fahrenheitLink.classList.remove("active");
let temperatureElement = document.querySelector("#temperature-number");
temperatureElement.innerHTML = Math.round(celsiusTemperature)
}

function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature-number");
    fahrenheitLink.classList.add("active");
    celsiusLink.classList.remove("active");
temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let form = document.querySelector("#enter-button");
form.addEventListener("click", submitLocation)

let fahrenheitTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius)

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

searchCity("Eureka");

