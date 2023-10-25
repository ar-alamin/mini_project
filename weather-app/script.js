const inputBox = document.querySelector(".inputBox");
const searchBtn = document.querySelector("#searchBtn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.querySelector("#humidity");
const wind_speed = document.querySelector("#wind-speed");
const location_not_found = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".weather-body");

// weather check
async function checkWeather(city) {
  const api_key = "d91c1d5b9d031d7a0486b66006204778";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const weather_data = await fetch(url).then((response) => response.json());

  // not found location
  if (weather_data.cod === "404") {
    location_not_found.style.display = "flex";
    weather_body.style.display = "none";
    return;
  }

  weather_body.style.display = "flex";
  location_not_found.style.display = "none";
  temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
  humidity.innerHTML = `${weather_data.main.humidity}%`;
  description.innerHTML = `${weather_data.weather[0].description}`;
  wind_speed.innerHTML = `${weather_data.wind.speed} km/h`;

  // check weather
  switch (weather_data.weather[0].main) {
    case "Clouds":
      weather_img.src = "assets/cloud.png";
      break;
    case "Clear":
      weather_img.src = "assets/clear.png";
      break;
    case "Mist":
      weather_img.src = "assets/mist.png";
      break;
    case "Rain":
      weather_img.src = "assets/rain.png";
      break;
    case "Snow":
      weather_img.src = "assets/snow.png";
      break;
  }
}

// search button click
inputBox.addEventListener("keyup", function (e) {
  e.preventDefault();
  if (e.keyCode === 13) {
    console.log("enter key press");
    searchBtn.click();
  }
});

searchBtn.addEventListener("click", function () {
  checkWeather(inputBox.value);
});
