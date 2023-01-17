function showTemperature (response) {
   let temperatureElement = document.querySelector("#temperature-number");
    let cityElement = document.querySelector("#city-name");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let iconElement = document.querySelector("#icon");


temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.main.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description);
    
}

let apiKey = "717511f5e1c0dbfc617f361ab073e2e9";
let city = "Eureka"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}}&appid=${apiKey}&units=imperial`;
axios.get(apiUrl).then(showTemperature);

search("Eureka")