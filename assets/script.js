function initPage() {
    var inputEl = document.getElementById("city-input");
    var serchEl = document.getElementById("search-button");
    var clearEl = document.getElementById("clear-history");
    var nameEl = document.getElementById("city-name");
}
//     var currentPicEl = document.getElementById("current-pic");
//     var currentTempEl = document.getElementById("tempterature");
//     var currentHumidityEl = document.getElementById("humidity");
//     var currentWindEl = document.getElementById("wind-speed");
//     var currentUVEl = document.getElementById("Uv-index");
    var historyEl = document.getElementById("history");
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];


//     var APIKey =""

//     function fetchWeather(cityName) {
//         var url = "https://api.openweathermap.org/data/2.5/weather?lat=44.34&" + cityName +"&=10.99&units=imperial&appid=6664bf33879baa3aa533134f77a65620"
        
//         fetch(url)
//         .then((response) => response.json())
//         .then((data) => console.log(data));
//     }
//     fetchWeather("searchEl");
// }
// searchEl.addEventListener("click",function() {
//     var searchedItems = imputEl.value;
//     fetchWeather(searchedItems);
//     searchHistory.push(searchedItems);
//     localStorage.setItem("search", JSON.stringify(searchHistory));
//     searchHistory();
// })

// clearEl.addEventListener("click",function() {
//     searchHistory = [];
//     searchHistory();
// })

// https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&units=imperial&appid=6664bf33879baa3aa533134f77a65620

function renderWeather(weather) {
    console.log("weather");
    var resultsContainer = document.querySelector("#weather-results")
    var city = document.createElement("h2");
    city.textContent = weather.name;
    resultsContainer.append(city);

    var temp = document.createElement("p");
    temp.textContent = "Temp: " + weather.main.temp + "F";
    resultsContainer.append(temp);

    var humidity = document.createElement("p");
    humidity.textContent = "Humidity: " + weather.main.humidity + "%";
    resultsContainer.append(humidity);

    var wind = document.createElement("p");
    wind.textContent = "Wind: " + weather.wind.speed + "mph, " + weather.wind.deg + "°";
    resultsContainer.append(wind);

    var weatherDetails = weather.weather[0];
        if (weatherDetails && weatherDetails.description);
        var description = document.createElement("p");
        description.textContent = weatherDeatails.description;
        resultsContainer.append(description);


}

console.log("helloworld");
function fetchWeather(query) {
            var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=6664bf33879baa3aa533134f77a65620"
            
            fetch(url)
            .then((response) => response.json())
            .then((data) => renderWeather(data));

}

fetchWeather("cityName");

