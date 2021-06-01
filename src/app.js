
//display temp, name, weather description, humidity, wind and pressure of searched city
function displayTemperature (response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let conditionElement = document.querySelector("#description");
  //return description with first letter capitalized
  conditionElement.innerHTML = response.data.weather[0].description.charAt(0).toUpperCase() + response.data.weather[0].description.slice(1);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let pressureElement = document.querySelector("#pressure");
  pressureElement.innerHTML = response.data.main.pressure;
  console.log(response.data);
}

//api setup
let apiKey = "d6e2bec016185eb7671ad91c5f507030";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=${apiKey}&units=imperial`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);