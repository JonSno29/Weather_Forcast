/* Variables */
var apiKey = "a481929feec1c9b845af62b585630c7f";
// var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
var geoApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
var exclude = "&units=imperial";
var searchBtn = $("#searchBtn");
var clearBtn = $("#clearBtn");
var searchForm = $("#search-form");
var cityInput = $("#searchCityName");
var cityExample = "Litchfield Park";
var lat = "33.4934";
var lon = "-112.3579";
var day = 1;

/* Load From Local Storage */
function loadLocalStorage() {
    var storedArray = localStorage.getItem("citySearchStorage") ? JSON.parse(localStorage.getItem("citySearchStorage")) : []
  
    $("#searchHistoryList").empty();
    var searchLength = storedArray.length
    for (var i = searchLength - 1; i >= 0; i--) {
      if (i > searchLength - 11) {
        var searchItem = $(`<p class = "text-uppercase">${storedArray[i]}</p>`)
        searchItem.on("click", function () {
          currentForecast($(this).text())
        })
        /* Access Search History */
      $("#searchHistoryList").append(searchItem);
    }
  }
}

/* City Search */
function searchCity(search) {
    search.preventDefault();
  
    var searchCityName = document.getElementById("searchCityName").value;
  
    if (searchCityName) {
      currentForecast(searchCityName);
      cityInput.value = "";
      saveCitySearch(searchCityName);
      loadLocalStorage();
    } else {
      alert("No City Entered")
    }
  }

  /* current weather function */
function currentForecast(currentCity) {

    /* Fetch geoApiUrl */
    fetch(geoApiUrl + currentCity + "&appid=" + apiKey + exclude)
    .then(function (response) {
      response.json()
      .then(function(data) {
        var cityID = data.id
        /* using lat and lon from geoApiUrl and entering into onecall apiUrl */
         fetch("https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + apiKey + exclude).then(function (weatherData) {
           return weatherData.json();
         }).then(function (currentData) {
           console.log(currentData);
      
          /* USE MOMENT.JS TO SHOW DATE */
          var currentDate = new Date;
          /* display searched city name */
          $("#city-search").text(
            currentCity + " " + moment(currentDate).format("dddd, MMMM Do YYYY")
          );
          var iconCode = currentData.list[0].weather[0].icon
          /* add icon */
          var iconurl = "http://openweathermap.org/img/w/"
          $(".wicon").attr(
            "src",
            `http://openweathermap.org/img/w/${iconCode}.png`
          );
          /* display current */
          $("#temp-now").text(
            "Temperature: " + currentData.list[0].main.temp + " \u00B0F"
          );
          /* display current wind speed */
          $("#wind-now").text(
            "Wind Speed: " + currentData.list[0].wind.speed + " MPH"
          );
          /* display current humidity */
          $("#humidity-now").text(
            "Humidity: " + currentData.list[0].main.humidity + " %"
          );
            
          /* call 5 day forecast function */
         futureForecast(futureData);
         })
    })
});
}

/* 5 day forecast function */
function futureForecast(futureData) {

    /* 5 day forecast cards */
      $("#fiveDayForecast").empty();
      for (var i = 1; i < 6; i ++) {
        /* display date using moment.js */
        //var date = new Date(futureData.daily[i].dt * 1000)
  
        /* creates 5 day forecast cards */
        var forecastCard = $("<div class='card col-md-2 col-sm-12 mb-2 card-forecast'></div>")
        forecastCard.html(`<div class="card-body forecast">
        <h6 class="card-title" id="d1">${moment(date).format("ddd, M/D")}</h6>
        <img alt="weather icon" src="http://openweathermap.org/img/w/${futureData.list[i].weather[0].icon}.png"
        <br>
        <p class="card-subtitle pb-2">Temp: ${futureData.list[i].temp.day} \u00B0F</p>
        <p class="card-subtitle pb-2">Wind Speed: ${futureData.daily[i].wind.speed} MPH</p>
        <p class="card-subtitle pb-2">Humidity: ${futureData.daily[i].main.humidity} %</p>
        </div>;`)
        $("#fiveDayForecast").append(forecastCard);
        day++
    }
  }
  
  /* save local storage function */
  function saveCitySearch(currentCity) {
    var citySearchStorage = localStorage.getItem("citySearchStorage");
  
    if (citySearchStorage) {
      var storedArray = JSON.parse(citySearchStorage);
  
      if (!storedArray.includes(currentCity)) {
        storedArray.push(currentCity);
        localStorage.setItem("citySearchStorage", JSON.stringify(storedArray));
      }
    } else {
      localStorage.setItem("citySearchStorage", JSON.stringify([currentCity]));
    }
  }
  
  /* clear local storage function + event listener */
  $("#clearBtn").on("click", function () {
    var localStor = $(this).siblings("#searchHistoryList").text("");
    localStorage.removeItem("citySearchStorage", localStor);
  });
  
  
  currentForecast(cityExample);
  loadLocalStorage();
  
  /* event listeners */
  searchBtn.on("click", searchCity);


















