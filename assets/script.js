// api key
const apiKey = "af27b186d6260f55ec571432b7737b78";

//date items
var date = "";
var dateTime = "";

// form item/button
var searchBtn = document.getElementById("searchBtn");
var searchInput = document.getElementsByClassName("searchInput");

// additional aside/form items
var cityNameEl = document.getElementById("cityName");
var currentDate = document.getElementsByClassName("currentDate");
var searchHistory = document.getElementsByClassName("pastCityList");
var iconEl = document.getElementById("weatherIcon");

// current city weather items/card items
var tempEl = document.getElementById("temp");
var humiEl = document.getElementById("humidity");
var windEl = document.getElementById("wind");
var uvEl = document.getElementById("uv");
var cardRow = document.getElementById("cardRow");

// future forecast
var futureForecast = document.querySelector(".cardRow");

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
  // console.log(city);
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      // console.log(data);
      var cityToSave = {
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
      }
      // console.log(cityToSave);
      var historyToCheck = localStorage.getItem("searchHistory");
      // console.log(historyToCheck);
      var historyCheck = JSON.parse(historyToCheck);
      // console.log(historyCheck);
      if (historyCheck === null) {
        var arrayToSave = [cityToSave];
        var arrayToString = JSON.stringify(arrayToSave);
        // console.log(arrayToString);
        localStorage.setItem('searchHistory', arrayToString);
        // console.log(localStorage.getItem('searchHistory'));
        renderBtns(arrayToSave);
      }else{
        // console.log('historyExists');
        var searchedCity = JSON.parse(localStorage.getItem('searchHistory'));
        searchedCity.unshift(cityToSave);
        localStorage.setItem('searchHistory', JSON.stringify(searchedCity));
        // console.log(searchedCity);
        renderBtns(searchedCity);
        uvIndex(data.coord.lat, data.coord.lon);
      }
    })
}

// Creating city buttons in search history
function renderBtns(cityArr) {
  $( "#pastCityList").empty();
  // console.log('functionToRenderBtns', cityArr);
  for (let index = 0; index < cityArr.length; index++) {
    const element = cityArr[index];
    // console.log(element);
    var test = $(`<button>${element.name}</button>`).click(function () {
      // console.log('test');
    });
  $('#pastCityList').append(test);
  }
  // create button, contains city name, long/lat attribute
  //event listener/click for each
  //create for loop that creates button with this info in an array from local storage
  // how to not search an already searched name, if === true, if false add to array
}

function uvIndex(lat, lon) {
var fiveDayFore = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&unit=standard&appid=${apiKey}`;
    fetch(fiveDayFore)
    .then(function(response) {
      // console.log(response)
      return response.json();
    })
    .then(function(data) {
      cardRow.innerHTML = ''
      console.log("data: ", data);
      // var main = document.querySelector('.weatherInfo');
      // var index = document.createElement('div');
      var temp = `Temp: ${data.current.temp}`;
      var wind = `Wind: ${data.current.wind_speed}`;
      var humidity = `Humidity: ${data.current.humidity}`;
      var uv =`UV Index: ${data.current.uvi}`;
      var icon =` ${data.current.weather.icon}`;
      tempEl.textContent = temp;
      windEl.textContent = wind;
      humiEl.textContent = humidity;
      uvEl.textContent = uv;
      // iconEl.href = icon;
      console.log(tempEl, windEl, humiEl, uvEl)
      // main.appendChild(index);

      // for (var i = 0; i < data.daily.length; i++) {
      //   if (i <= 5 && i > 0) {
      //     var p = document.createElement('p');
      //     var upcoming = `
      //     <img src="http://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png"/>
      //     <p>
      //     Temp: ${Math.round(data.daily[i].temp.day)} °F
      //     </p>
      //     <p>
      //     Wind: ${data.daily[i].wind_speed} MPH
      //     </p>
      //     <p>
      //     Humidity: ${data.daily[i].humidity}%
      //     </p>
      //     `;
      //     p.innerHTML = upcoming;
      //     cardRow.appendChild(p);
      //   }
      // }
    }).catch((error) => {
      console.error(error);
    });
}
// grr. Why isn't this working?!?!


