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