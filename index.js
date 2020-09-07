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
h6.innerHTML = `Last loaded: ${hours}:${minutes}`;

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
  let h2 = document.querySelector("h2");
  let tempElement = document.querySelector("#tempNow");
  let descriptionElement = document.querySelector(`#description`);
  let iconElement = document.querySelector(`#iconnow`);
  let wind = Math.round(response.data.wind.speed);
  let currentHumidity = response.data.main.humidity;

  celsiusTemperature = response.data.main.temp;

  h2.innerHTML = `${response.data.name}`;
  tempElement.innerHTML = `${temperature}°C`;
  humidity.innerHTML = `Humidity ${currentHumidity}%`;
  windspeed.innerHTML = `Wind ${wind}m/s`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

// function for Celsius and Fahrenheit
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displaycelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displaycelsiusTemperature);

// function for forecast
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
              <div class="col-2">
              <h3>
              ${formatHours(forecast.dt * 1000)}
              </h3>
              <img
                src="http://openweathermap.org/img/wn/${
                  forecast.weather[0].icon
                }@2x.png"
                alt=""
              />
              <div class="weather-forecast-temperature">
                <strong>${Math.round(
                  forecast.main.temp_max
                )}°</strong>${Math.round(forecast.main.temp_min)}°
              </div>
            </div>
            `;
  }
}
