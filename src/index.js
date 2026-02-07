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
const searchInput = document.querySelector(".search");
const msgDisplay = document.querySelector(".msg");
const fahrenheitRadio = document.getElementById('Fahrenheit')
const container = document.querySelector('.container')
const labels = document.querySelectorAll('label')




searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = searchInput.value;
  const accessURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city.toLowerCase()}?key=B7866RFQXY9AH8LCVSL22JW3T`;

  getUsableData(accessURL).then((data) => {
    //   06:00–17:59 → day
// 18:00–05:59 → night
    const time = data.currentTime
    let dayNight = ''




    if (time > '06:00' && time < '18:00'){
      dayNight = 'day' 
      if (container.classList.contains('night')){
        container.classList.remove('night')
        labels.forEach((label) => {
          label.classList.remove('night')
        })
      }
      container.classList.add('day')
      labels.forEach((label) => {
          label.classList.add('day')
        })

      
    } else  {
      dayNight = 'night' 
      if (container.classList.contains('day')){
        container.classList.remove('day')
        labels.forEach((label) => {
          label.classList.remove('day')
        })
      }
      container.classList.add('night')
      labels.forEach((label) => {
          label.classList.add('night')
        })
      
    }
    console.log(dayNight)

    
   






    displayWeather(`${data.conditions} at ${dayNight}`)
    
    const conditions = data.conditions.toLowerCase();
    const currentTime = data.currentTime;
    const weekConditions = data.weekConditions.toLowerCase();
    let temp = data.temp;
    let feelsLike = data.feelsLike;

    if (fahrenheitRadio.checked){
      const measurement = 'fahrenheit'
      temp = `${temp} ${measurement}`
      feelsLike = `${feelsLike} ${measurement}`
    } else {
      const measurement = 'celsius'
      temp = `${fahrenheitToCelsius(temp)} ${measurement}`
      feelsLike = `${fahrenheitToCelsius(feelsLike)} ${measurement}`

    }

    const location =
      city.charAt(0).toUpperCase() + city.slice(1);
    

    msgDisplay.classList.add('visible')
    msgDisplay.textContent = `${location} is currently ${currentTime} and is ${conditions}, it is currently ${temp} but it feels like ${feelsLike}. The week forecast is ${weekConditions}`;
    console.log(data);
  });
});

const img = document.querySelector("img");

async function displayWeather(conditions) {



  const response = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=twFGArayW07V8dN1iso8otCHe1H4GhKa&s=${conditions} weather`,
  );
  const weatherData = await response.json();
  img.src = weatherData.data.images.original.url;
}

function fahrenheitToCelsius(temp){
  return ((temp-32)*5/9).toFixed(2)
}