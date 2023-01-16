function showTemperature(response){
    
}

let apiKey = "1d3t1f02a4o0e7ef8cc4fb4cbdca4d5e";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Eureka&key=${apiKey}&units=imperial`;
axios.get(apiUrl).then(showTemperature)