//calculate date
function formatDate(timestamp){
  let date = new Date(timestamp);
  let hours = date.getHours();
  //show two digits in time
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

//display temp, name, weather description, humidity, wind and pressure of searched city
function displayTemperature (response) {
  let cityElement = document.querySelector("#city");
  let countryElement = document.querySelector("#country");
  let temperatureElement = document.querySelector("#temperature");
  let conditionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let pressureElement = document.querySelector("#pressure");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  cityElement.innerHTML = response.data.name;
  countryElement.innerHTML = response.data.sys.country;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  //return description with first letter capitalized
  conditionElement.innerHTML = response.data.weather[0].description.charAt(0).toUpperCase() + response.data.weather[0].description.slice(1);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  pressureElement.innerHTML = response.data.main.pressure;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

//making api call for searched city
function search (city) {
  let apiKey = "d6e2bec016185eb7671ad91c5f507030";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}

//set search value to city input
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input"); 
  search(cityInputElement.value);
}

search("New York");
let form  = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);