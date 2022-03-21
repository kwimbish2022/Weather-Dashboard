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

// future forecast
var futureForecast = document.querySelector("forecast");

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
        uvIndex(data.coord.lat, data.coord.lon);
      }
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

function uvIndex(lat, lon) {
var fiveDayFore = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    fetch(fiveDayFore)
    .then(function(response) {
      return response.json();
    })
    console.log()
    .then(function(data) {
      futureForecast.innerHTML = ''
      console.log(data);
      var main = document.querySelector('.weatherInfo');
      var index = document.createElement('div');
      var uv =`UV Index: ${data.current.uvi}`;
      index.innerHTML = uv;
      main.appendChild(index);

      for (var i = 0; i < data.daily.length; i++)
      if (i <= 5 && i > 0) {
        var p = document.createElement('p');
        var upcoming = `
        <img src="http://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png"/>
        <p>
        Temp: ${Math.round(data.daily[i].temp.day)} °F
        </p>
        <p>
        Wind: ${data.daily[i].wind_speed} MPH
        </p>
        <p>
        Humidity: ${data.daily[i].humidity}%
        </p>
        `;
        p.innerHTML = upcoming;
        futureForecast.appendChild(p);
      }
    });
}
// grr. Why isn't this working?!?!


