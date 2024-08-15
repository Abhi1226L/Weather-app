let btn = document.querySelector("button");
let bodyHead = document.querySelector(".body-header");
let bodyFoot = document.querySelector(".body-footer");
let input = document.querySelector(".input-bar");
let weatherImage = document.querySelector("#weather-img");
let error = document.querySelector(".error-image");
let temperature = document.querySelector(".temperature");
let cityName = document.querySelector(".city-name");
let humidity = document.querySelector("#humidity-count");
let windSpeed = document.querySelector("#wind-count");
let empty = document.querySelector(".empty");

async function checkWeather(city) {
  const api_key = `3741c940683eafd908240781f0f05347`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  const weather_data = fetch(`${url}`);
  let res = await weather_data;
  if (res.status == 404) {
    error.style.display = 'flex';
    bodyHead.style.display = 'none';
    bodyFoot.style.display = 'none';
    empty.style.display = 'none';
  } else {
    error.style.display = 'none';
    bodyHead.style.display = 'flex';
    bodyFoot.style.display = 'flex';
    empty.style.display = 'none';
    let data = await res.json();
    console.log(data);
    temperature.innerHTML = Math.round(data.main.temp - 273) + '°C';
    cityName.innerHTML = data.name;
    windSpeed.innerHTML = data.wind.speed + ' km/hr';
    humidity.innerHTML = data.main.humidity + '%';
    if (data.weather[0].main === 'Clouds') {
      weatherImage.src = 'cloud.png';
    } else if (data.weather[0].main === 'Clear') {
      weatherImage.src = 'clear.png';
    } else if (data.weather[0].main === 'Rain') {
      weatherImage.src = 'rain.png';
    } else if (data.weather[0].main === 'Snow') {
      weatherImage.src = 'snow.png';
    } else if (data.weather[0].main === 'Mist') {
      weatherImage.src = 'mist.png';
    } else if (data.weather[0].main === 'Thunderstorm') {
      weatherImage.src = 'thunderstorm.png';
    }
  }
}

btn.addEventListener("click", function () {
  if (input.value === '') {
    empty.innerHTML = '';
    empty.style.display = "block";
    bodyHead.style.display = 'none';
    bodyFoot.style.display = 'none';
    error.style.display = 'none';
    let emptyBox = document.createElement("p");
    emptyBox.classList.add("empty-box");
    emptyBox.innerHTML = "Please enter a city name"
    empty.append(emptyBox);
  } else {
    checkWeather(input.value);
    input.value = '';
  }
})