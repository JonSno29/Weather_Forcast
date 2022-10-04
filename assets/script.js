/* variables */
var apiKey = "708b801eb3ec231e80bf6c6a79e0fafb";
var apiUrl = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon=";
var geoApiUrl = "api.openweathermap.org/data/2.5/forecast?q=";
var exclude = "&exclude=minutely,hourly,alerts&units=imperial";
var searchBtn = $("#searchBtn");
var clearBtn = $("#clearBtn");
var searchForm = $("#search-form");
var cityInput = $("#searchCityName");
var cityExample = "Phoenix";
var day = 1;

/* load from local storage function */
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

/* Search City */
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

    /* fetching geoApiUrl */
    fetch(geoApiUrl + currentCity + "&appid=" + apiKey).then(function (response) {
      response.json().then(function (data) {
        
        /* using lat and lon from geoApiUrl and entering into onecall apiUrl */
        fetch(apiUrl + "lat=" + data[0].lat + "&lon=" + data[0].lon + exclude + "&appid=" + apiKey).then(function (weatherData) {
          return weatherData.json();
        }).then(function (currentData) {
          console.log(currentData);
        
         /* USE MOMENT.JS TO SHOW DATE */
         var currentDate = new Date(currentData.current.dt * 1000);
         /* display searched city name */
         $("#city-search").text(
           currentCity + " " + moment(currentDate).format("dddd, MMMM Do YYYY")
         );
         /* add icon */
         var iconCode = currentData.current.weather[0].icon;
         $(".wicon").attr(
           "src",
           `http://openweathermap.org/img/w/${iconCode}.png`
         );
         /* display current */
         $("#temp-now").text(
           "Temperature: " + currentData.current.temp + " \u00B0F"
         );
         /* display current wind speed */
         $("#wind-now").text(
           "Wind Speed: " + currentData.current.wind_speed + " MPH"
         );
         /* display current humidity */
         $("#humidity-now").text(
           "Humidity: " + currentData.current.humidity + " %"
         );
         /* display current uv index */
         $("#uv-now").text(currentData.current.uvi);
 
         //* uv level styling */
         var uvClassName = "";
         if (currentData.current.uvi < 3) {
           uvClassName = "uvGreen";
         } else if (currentData.current.uvi > 3 && currentData.current.uvi < 6) {
           uvClassName = "uvYellow";
         } else {
           uvClassName = "uvRed";
         }
         $("#uv-now").removeClass("uvGreen uvYellow uvRed");
         $("#uv-now").addClass(uvClassName);
 
         /* call 5 day forecast function */
         futureForecast(currentData);
        })
    })
})
}




















