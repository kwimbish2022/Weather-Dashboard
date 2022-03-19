// api key
const apiKey = "af27b186d6260f55ec571432b7737b78";

// form item/button
var searchBtn = document.getElementById("searchBtn");

// additional aside/form items
var formEl = document.querySelector("#cityForm");
var currentDateEl = document.getElementsByClassName("currentDate");
var searchHistoryEl = document.getElementsByClassName("pastCityList");
var weatherIconEl = document.getElementsByClassName("weatherIcon");
var searchbtn = document.getElementById("searchBtn");

// current city weather items/card items
var tempEl = document.getElementsByClassName("temp");
var humidityEl = document.getElementsByClassName("humidity");
var windEl = document.getElementsByClassName("wind");
var uvEl = document.getElementsByClassName("uv");
var cardRow = document.getElementsByClassName("cardRow");

// to create the current date
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
var today = mm + '/' + dd + '/' + yyyy;

//Is there existing history or not?
  //if not...just have it say none in the console at load
if (JSON.parse(localStorage.getItem("searchHistory")) === null) {
  console.log("none")
  // if there is...load it to the console and the function that stores the history in the aside.
}else{
  console.log("searchHistoryArr loaded");
  //call this to render to the list in the aside...
  renderSearchHistory();
}

// To get our search history to renderSearchHistory to the aside (not just console.log).
function renderSearchHistory(cityName) {
  searchHistoryEl.empty();
  // for arr/localStorage  
  var searchHistoryArr = JSON.parse(localStorage.getItem("searchHistory"));
  for (let i = 0; i < searchHistoryArr.length; i ++) {
    // had to put new search item into loop, it wasn't adding new search to list(just overwriting)
    var newSearchItem = $("<li>").attr("class", "cityHistory");
    // list of prev searched cities into aside li
    newSearchItem.text(searchHistoryArr[i]);
    searchHistoryEl.prepend(newSearchItem);
  }
}

// To get our needed data items for the weather data in assignment parameters (name, temp, hum, wind, icon, uv)
function renderWeatherInfo(cityName, cityTemp, cityHumidity, cityWindSpeed, cityWeatherIcon, uvValue) {
  cityNameEl.text(cityName);
  currentDateEl.text(`(${today})`);
  tempEl.text(`Temperature: ${cityTemp} °F`);
  humidityEl.text(`Humidity: ${cityHumidity} %`);
  windSpeedEl.text(`Wind Speed: ${cityWindSpeed} MPH`);
  uvIndexEl.text(`src`, cityWeatherIcon);
}

// calling api data
function getWeather(e) {
  e.preventDefault()
  var city = document.getElementById("searchInput").value;
  console.log(city);
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
    //   renderSearchHistory();
      console.log(data);
    });
}

// event listener for search button
searchbtn.addEventListener("click", getWeather);
