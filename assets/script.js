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
        /* access search history items */
      $("#searchHistoryList").append(searchItem);
    }
  }
}

/* search city function */
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


















