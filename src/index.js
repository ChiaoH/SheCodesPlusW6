//feature 1
let now = new Date();

let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let dayofWeek = week[now.getDay()];
let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}

let currentMinute = ("0" + now.getMinutes()).slice(-2);

let currentDate = document.querySelector("#currentDate");
currentDate.innerHTML = `${dayofWeek} ${currentHour}:${currentMinute}`;

//feature 2

function changeWeather(response) {
  let newTemp = document.querySelector("#current-temp");
  newTemp.innerHTML = Math.round(response.data.main.temp);

  let newDescription = document.querySelector("#description");
  newDescription.innerHTML = response.data.weather[0].description;

  let newHumidity = document.querySelector("#humidity");
  newHumidity.innerHTML = response.data.main.humidity;

  let newWind = document.querySelector("#wind");
  newWind.innerHTML = Math.round(response.data.wind.speed);
}

function searchWeather(city) {
  let apiKey = "001bc651977f4b024af4d84282b0f02a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  https: axios.get(apiUrl).then(changeWeather);
}

function changeCity(event) {
  event.preventDefault();
  let searchText = document.querySelector("#search-input-text");
  let cityName = document.querySelector("#cityName");
  cityName.innerHTML = searchText.value;

  searchWeather(searchText.value);
}

let searchForm = document.querySelector(".searchSection");
searchForm.addEventListener("submit", changeCity);
searchWeather("Malmö");

//current location weather
function showCurrentWeather(response) {
  let cityName = document.querySelector("#cityName");
  cityName.innerHTML = response.data.name;

  let newTemp = document.querySelector("#current-temp");
  newTemp.innerHTML = Math.round(response.data.main.temp);

  let newDescription = document.querySelector("#description");
  newDescription.innerHTML = response.data.weather[0].description;

  let newHumidity = document.querySelector("#humidity");
  newHumidity.innerHTML = response.data.main.humidity;

  let newWind = document.querySelector("#wind");
  newWind.innerHTML = Math.round(response.data.wind.speed);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "3980a7c8f2a782241a093131b099f993";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCurrentWeather);
}

function getCurrentLocation(location) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-btn");
currentButton.addEventListener("click", getCurrentLocation);
