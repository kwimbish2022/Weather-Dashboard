// api key
const apiKey = "af27b186d6260f55ec571432b7737b78";

//date items
var date = "";
var dateTime = "";

// form item/button
var searchBtn = document.getElementById("searchBtn");
var searchInput = document.getElementsByClassName("searchInput");

// additional aside/form items
var cityName = document.getElementsByClassName("cityName");
var currentDate = document.getElementsByClassName("currentDate");
var searchHistory = document.getElementsByClassName("pastCityList");
var weatherIcon = document.getElementsByClassName("weatherIcon");

// current city weather items/card items
var temp = document.getElementsByClassName("temp");
var humi = document.getElementsByClassName("humidity");
var wind = document.getElementsByClassName("wind");
var uv = document.getElementsByClassName("uv");
var cardRow = document.getElementsByClassName("cardRow");

// to create the current date, borrowed from work-day-scheduler assignment
var today = function() {
  date = moment(new Date());
  dateTime.html(date.format('MMMM Do YYYY'));
}

$(document).ready(function() {
  dateTime = $("#currentDate");
  today();
});

//Is there existing history or not?
//If not...just have it say none in the console *AT LOAD*
if (JSON.parse(localStorage.getItem("searchHistory")) === null) {
  console.log("none")
}else{
  console.log("searchHistoryArr loaded");
}

function renderWeatherData(cityName, cityTemp, cityHumidity, cityWindSpeed, cityWeatherIcon, uvVal) {
  cityName.text(cityName)
  currentDate.text(`(${today})`)
  temp.text(`Temperature: ${cityTemp} °F`);
  humi.text(`Humidity: ${cityHumidity}%`);
  wind.text(`Wind Speed: ${cityWindSpeed} MPH`);
  uv.text(`UV Index: ${uvVal}`);
  weatherIcon.attr("src", cityWeatherIcon);
}

// event listener for search button
searchBtn.addEventListener("click", getWeather);

// calling api data on click, storing to localStorage, call renderBtns.
function getWeather(searchedCity) {
  searchedCity.preventDefault()
  var city = document.getElementById("searchInput").value;
  console.log(city);
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      console.log(data);
      var cityToSave = {
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
      }
      console.log(cityToSave);
      var historyToCheck = localStorage.getItem("searchHistory");
      console.log(historyToCheck);
      var historyCheck = JSON.parse(historyToCheck);
      console.log(historyCheck);
      if (historyCheck === null) {
        var arrayToSave = [cityToSave];
        var arrayToString = JSON.stringify(arrayToSave);
        console.log(arrayToString);
        localStorage.setItem('searchHistory', arrayToString);
        console.log(localStorage.getItem('searchHistory'));
        renderBtns(arrayToSave);
      }else{
        console.log('historyExists');
        var searchedCity = JSON.parse(localStorage.getItem('searchHistory'));
        searchedCity.unshift(cityToSave);
        localStorage.setItem('searchHistory', JSON.stringify(searchedCity));
        console.log(searchedCity);
        renderBtns(searchedCity);
      }
    })
    .then(function(weatherData) {
      console.log(weatherData);
      var cityObj = {
        cityName: data.name,
        cityTemp: data.main.temp,
        cityHumidity: data.main.humidity,
        cityWindSpeed: data.wind.speed,
        cityUVIndex: data.coord,
        cityWeatherIconName: data.weather[0].icon
      }
    })
    .then(function(coord) {
      return fetch(`https://api.openweathermap.org/data/2.5forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&units=inperial&appid=${apiKey}`)
    })
    .then(function(response) {
      return response.json();
    })
}

// Creating city buttons in search history
function renderBtns(cityArr) {
  $( "#pastCityList").empty();
  console.log('functionToRenderBtns', cityArr);
  for (let index = 0; index < cityArr.length; index++) {
    const element = cityArr[index];
    console.log(element);
    var test = $(`<button>${element.name}</button>`).click(function () {
      console.log('test');
    });
  $('#pastCityList').append(test);
  }
  // create button, contains city name, long/lat attribute
  //event listener/click for each
  //create for loop that creates button with this info in an array from local storage
  // how to not search an already searched name, if === true, if false add to array
}

