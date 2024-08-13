let btn = document.querySelector("button");
let body = document.querySelector(".body-section");
let input = document.querySelector(".input-bar");
let weatherImage = document.querySelector("img");
let temperature = document.querySelector(".temperature");
let tempInfo = document.querySelector(".temp-info");
let humidity = document.querySelector("#humidity-count");
let windSpeed = document.querySelector("#wind-count");

async function checkWeather(city){
  const api_key = `3741c940683eafd908240781f0f05347`;  
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  const weather_data = fetch(`${url}`);
  let res = await weather_data;
  let data = await res.json();
  console.log(data);
  temperature.innerHTML = Math.round(data.main.temp - 273) + '°C';
  tempInfo.innerHTML = data.weather[0].main;
  windSpeed.innerHTML = data.wind.speed + 'km/hr';
  humidity.innerHTML = data.main.humidity + '%';
}

btn.addEventListener("click",function(){
   checkWeather(input.value);
})