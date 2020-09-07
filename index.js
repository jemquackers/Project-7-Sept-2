function formatDate(timestamp) {
  let now = new Date(timestamp);
  let date = now.getDate();
  let year = now.getFullYear();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];

  return `${day} ${date} ${month} ${year}`;
}

function formatHours(timestamp) {
  let hours = now.getHours(timestamp);
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}: ${minutes}`;
}

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

navigator.geolocation.getCurrentPosition(showPosition);
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
  let tempElement = document.querySelector("#tempnow");
  tempElement.innerHTML = `${temperature}`;
  let iconElement = document.querySelector("#iconnow");
  let h6 = document.querySelector("h6");
  h6.innerHTML = `Last updated: ${formatHours(response.data.dt * 1000)}`;

  let h4 = document.querySelector("h4");
  h4.innerHTML = `${formatDate(response.data.dt * 1000)}`;

  celsiusTemperature = response.data.main.temp;

  let description = response.data.weather["0"].description;
  let wind = Math.round(response.data.wind.speed);
  let currentHumidity = response.data.main.humidity;
  humidity.innerHTML = `Humidity:  ${currentHumidity}%`;
  windspeed.innerHTML = `Windspeed:  ${wind}m/s`;
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
  let tempElement = document.querySelector("#tempnow");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  tempElement.innerHTML = fahrenheitTemperature;
}

function toCels(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#tempnow");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  tempElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", toFahr);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", toCels);
