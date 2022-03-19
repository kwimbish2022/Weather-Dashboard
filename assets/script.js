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
//if not...just have it say none in the console *AT LOAD*
if (JSON.parse(localStorage.getItem("searchHistory")) === null) {
  console.log("none")
  // if there is...load it to the console and the function that stores the history in the aside.
}else{
  console.log("searchHistoryArr loaded");
  //call this to render to the list in the aside...
  //renderSearchHistory();
}

// event listener for search button
searchBtn.addEventListener("click", getWeather);

// calling api data on click
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
    });
}

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

