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

function showTemperature (response) {
   let temperatureElement = document.querySelector("#temperature-number");
    let cityElement = document.querySelector("#city-name");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let iconElement = document.querySelector("#icon");


    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
    
}


function searchCity(city) {
    let apiKey = "717511f5e1c0dbfc617f361ab073e2e9"; 
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`; 
    axios.get(apiUrl).then(showTemperature);
}

function submitLocation(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
}

let form = document.querySelector("#enter-button");
form.addEventListener("click", submitLocation)



searchCity("Eureka")