// src/index.js
import "./styles.css";

console.log("Working");

const key = "B7866RFQXY9AH8LCVSL22JW3T";
const accessURL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=B7866RFQXY9AH8LCVSL22JW3T";

async function getWeatherData(url) {
  const response = await fetch(url);
  const responseData = await response.json();
  return responseData;
}

async function getUsableData(url) {
  // return data.currentConditions
  const data = await getWeatherData(url);

  const info = {
    location: data.address,
    conditions: data.currentConditions.conditions,
    currentTime: data.currentConditions.datetime,
    feelsLike: data.currentConditions.feelslike,
    temp: data.currentConditions.temp,
    weekConditions: data.description,
  };
  return info;
}

const searchForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const msgDisplay = document.querySelector(".msg");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = searchInput.value;
  const accessURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city.toLowerCase()}?key=B7866RFQXY9AH8LCVSL22JW3T`;

  getUsableData(accessURL).then((data) => {
    console.log(data)
    // displayWeather(data.conditions)
    const location =
      data.location.charAt(0).toUpperCase() + data.location.slice(1);
    const conditions = data.conditions.toLowerCase();
    const currentTime = data.currentTime;
    const weekConditions = data.weekConditions.toLowerCase();
    const measurement = "Celsius";
    const temp = data.temp + " " + measurement;
    const feelsLike = data.feelsLike + " " + measurement;

    msgDisplay.textContent = `${location} at ${currentTime} is currently ${conditions}, it is currently ${temp} but it feels like ${feelsLike}. The week forecast is ${weekConditions}`;
    console.log(data);
  });
});

const img = document.querySelector("img");

async function displayWeather(conditions) {
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=twFGArayW07V8dN1iso8otCHe1H4GhKa&s=weather${conditions}`,
  );
  const weatherData = await response.json();
  img.src = weatherData.data.images.original.url;
}
