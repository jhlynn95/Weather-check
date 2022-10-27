
var searchInput = document.querySelector(".inputValue");
var searchBtn = document.querySelector(".searchBtn");
var currentDate = moment();
var cityDateIcon = document.querySelector(".city-date-icon");
var topContainer = document.querySelector(".current-weather");
var temp = document.querySelector(".temp");
var humidity = document.querySelector(".humidity");
var wind = document.querySelector(".wind");
var uvi = document.querySelector(".uvi");
var search = JSON.parse(localStorage.getItem("recents") || "[]");
var history1 = $("#recent");
var inputValue = $("#inputValue");
var clear = $("#clearHistory");

renderRecents();

// History of previously searched cities
function renderRecents() {
  history1.empty();

  for (let i = 0; i < search.length; i++) {
    var recentInput = $("<input>");
    recentInput.attr("type", "text");
    recentInput.attr("readonly", true);
    recentInput.attr("class", "form-control-lg text-black");
    recentInput.attr("value", search[i]);
    recentInput.on("click", function() {
      getWeather($(this).attr("value"));
    });
    history1.append(recentInput);
  }
}

var searchSubmitHandler = function (event) {
  event.preventDefault;

  var city = searchInput.value.trim();

  if (city) {
    getCityWeather(city);

    searchInput.value = "";
  } else if (userInput == "") {
    alert("Please enter a city.");
  }
};
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
// found the async function
async function getWeather(city) {
    var apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=6664bf33879baa3aa533134f77a65620";
//   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
// using await instead of promise
    var response = await fetch(apiUrl);
    if (response.ok) {
      var data = await response.json();
      var name = data.name;
      var temp = data.main.temp;
      var hum = data.main.humidity;
      var wind = data.wind.speed;
      console.log(data);
      var lat = data.coord.lon;
      var lon = data.coord.lat;
      await uvIndex(data.coord.lat, data.coord.lon);
      var icon = data.weather[0].icon;
//   allows predicted icon to appear of the sky
      var weatherURL = `https://openweathermap.org/img/wn/${icon}.png`;
      var icon = `<img src="${weatherURL}"/>`;
  
      cityDateIcon.innerHTML =
        name + currentDate.format(" (M/DD/YYYY) ") + icon;
      temp.innerHTML = "Temperature: " + temp + " °F";
      humidity.innerHTML = "Humidity: " + hum + "%";
      wind.innerHTML = "Wind Speed: " + wind + " MPH";
        topContainer.classList.remove("hide");
      

      var newWeatherItem = city;
    //   https://www.w3schools.com/jsref/jsref_filter.asp
    // method creates a new array filled with elements that pass a test provided by a function.
      const newSearches = search.filter((search) => {
          if (search.city === newWeatherItem.city) {
              return false;
          } else {
              return true;
          }
      }
      );
    }
    
  };

  function setLocalStorage(city) {
    if (search.indexOf(city) === -1) {
      search.push(city);
      localStorage.setItem("recents", JSON.stringify(search));
    }
  }

searchBtn.addEventListener("click", () => {
  var userInput = inputValue.val().trim();
  if (userInput !== "") {
    getWeather(searchInput.value);
    setLocalStorage(searchInput.value);
renderRecents();
    inputValue.val("");
  }
});

clear.on("click", function() {
  localStorage.removeItem("recents");
  search.length = 0;
  renderRecents();
});
//  https://www.here.com/learn/blog/how-to-use-geocoding-in-java-with-the-here-geocoding-search-api
//  I struggled with this understanding but a class mate helped me out and this website
async function uvIndex(lat, lon) {
  var uviUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&appid=bb000260f32ea33d23e9b5228978c47a";
  var response = await fetch(uviUrl);

  if (response.ok) {
    // console.log(response);
    var data = await response.json();
    // console.log(data);
    var uviValue = data.current.uvi;
    var daysData = data.daily;
    // console.log(fiveDayData);
    var uviLine = document.querySelector(".uviValue")
    uviLine.textContent = uviValue;


    var cardString = "";
    var fiveDayHeader = document.querySelector(".five-day-forecast");
    var fivedays = document.querySelector(".fiveDayHeader");
    fivedays.textContent="5-Day Forecast:";
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/prepend
    fiveDayHeader.prepend(fivedays);
    for (var i = 0; i < daysData.length; i++) {
      if (i >= 5) break;
      var cardData = daysData[i];
      var cardTemp = cardData.temp.day;
      var cardHumidity = cardData.humidity;
      var iconImage = cardData.weather[0].icon;
      var weatherURL = `https://openweathermap.org/img/wn/${iconImage}.png`;
      var icon = `<img src="${weatherURL}" style="width: 75px"/>`;
      cardString += `
            <div class="card fiveDayCard" style="flex: 1">
                <h4 class="dateHeader">${moment(new Date(cardData.dt * 1000)).format(
                  " M/DD/YYYY"
                )}</h4>
                    ${icon}
                <p>Temp: ${cardTemp}&deg;F</p>
                <p>Humidity: ${cardHumidity}%</p>
            </div>
        `;
    }
    // console.log(cardString);
    var fiveDayCardContainer = document.querySelector("#cards");
    fiveDayCardContainer.innerHTML = cardString;
  }
}