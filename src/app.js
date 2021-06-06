//calculate date
function formatDate(timestamp){
  let date = new Date(timestamp);
  let hours = date.getHours();
  //show two digits in time
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (hours > 12) {
    hours = hours - 12;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let month = months[date.getMonth()];
  return `Last updated: ${day}, ${hours}:${minutes}`;
}


function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}


//display forecast for week
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  //loop through each forecast day
  forecast.forEach(function (forecastDay, index) {
  if (index < 6) {
    forecastHTML = 
    forecastHTML + 
    `
    <div class="col">
      <ul>
        <li class="high-temp list">${formatDay(forecastDay.dt)}</li>
        <li class="forecast-icons list"><img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42"/></li>
      </ul>
     <div class="weather-forecast-temperatures">   
        <span class="high-temp list">${Math.round(forecastDay.temp.max)}&deg;</span>
        <span class="low-temp list">${Math.round(forecastDay.temp.min)}&deg;</span>
      </div>  
    </div>`; 
  }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//make call for forecast
function getForecast(coordinates) {
  let apiKey = "d6e2bec016185eb7671ad91c5f507030";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
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

  //function is setting fahrenheit temp to global variable
  fahrenheitTemperature = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  countryElement.innerHTML = response.data.sys.country;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  //return description with first letter capitalized
  conditionElement.innerHTML = response.data.weather[0].description.charAt(0).toUpperCase() + response.data.weather[0].description.slice(1);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  pressureElement.innerHTML = response.data.main.pressure;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
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

// //change temp to celsius 
// function displayCelsiusTemp(event) {
//   event.preventDefault();
//   //remove active class from fahrenheit link and add it to celsius link
//   fahrenheitLink.classList.remove("active");
//   celsiusLink.classList.add("active");
//   let celsiusTemperature = (fahrenheitTemperature - 32) * 5/9;
//   let temperatureElement = document.querySelector("#temperature");
//   temperatureElement.innerHTML = Math.round(celsiusTemperature);
// }

// //change temp to fahrenheit 
// function displayFahrenheitTemp(event) {
//   event.preventDefault();
//   celsiusLink.classList.remove("active");
//   fahrenheitLink.classList.add("active");
//   let temperatureElement = document.querySelector("#temperature");
//   temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
// }

// //at load fahrenheit temp has no value until search is called
// let fahrenheitTemperature = null;

//get temperature of current location
function searchLocation(position) {
  let apiKey = "d6e2bec016185eb7671ad91c5f507030";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`
  console.log(apiUrl);
  axios.get(apiUrl).then(displayTemperature);
}


//ask for permission to get location
function getMyLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form  = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// let celsiusLink = document.querySelector("#celsius-link");
// celsiusLink.addEventListener("click", displayCelsiusTemp);

// let fahrenheitLink = document.querySelector("#fahrenheit-link");
// fahrenheitLink.addEventListener("click", displayFahrenheitTemp);


let currentLocation = document.querySelector("#currentLocationButton")
currentLocation.addEventListener ("click", getMyLocation);


search("Miami");