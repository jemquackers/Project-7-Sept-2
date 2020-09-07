let now = new Date();

let h4 = document.querySelector("h4");
let h6 = document.querySelector("h6");

let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

h4.innerHTML = `${day} ${month} ${date} ${year}`;
h6.innerHTML = `Last updated: ${hours}:${minutes}`;

// button for location
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "80f827f1223261e54bfb7371ee94cdd0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

// search city and then temp

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#search");
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${input.value}`;
  let apiKey = "80f827f1223261e54bfb7371ee94cdd0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);
}
let form = document.querySelector("form");
form.addEventListener("submit", search);

// function for both button and search field

function showTemp(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  console.log(temperature);
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${response.data.name}`;
  let tempElement = document.querySelector("h5");
  tempElement.innerHTML = `${temperature}°C`;
  let iconElement = document.querySelector("#iconnow");

  celsiusTemperature = response.data.main.temp;

  let description = response.data.weather["0"].description;
  let wind = Math.round(response.data.wind.speed);
  let currentHumidity = response.data.main.humidity;
  humidity.innerHTML = `Humidity ${currentHumidity}%`;
  windspeed.innerHTML = `Wind ${wind}m/s`;
  weatherDescription.innerHTML = `${description}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

// function for Celsius and Fahrenheit
function toFahr(event) {
  event.preventDefault();
  let tempElement = document.querySelector("h5");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32);
  tempElement.innerHTML = fahrenheitTemperature;
}

function toCels(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  tempElement.innerHTML = celsiusTemperature;
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
followLink.addEventListener("click", toFahr);

let celsiusLink = document.querySelector("#celsius-link");
followsLink.addEventListener("click", toCels);
