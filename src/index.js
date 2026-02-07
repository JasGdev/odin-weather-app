// src/index.js
import "./styles.css";

console.log("Working");


const key = "B7866RFQXY9AH8LCVSL22JW3T";
const accessURL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=" +
  key;




async function getWeatherData(accessURL) {
  const response = await fetch(accessURL);
  const responseData = await response.json()
  console.log(responseData)
  return responseData
}

function getUsableData(data){
  const info = {
    conditions: data.currentCondition.conditions,
    currentTime: data.currentCondition.datetime,
    feelsLike: data.currentConditions.feeslike,
    humidity: data.currentConditions.humidity,
    temp: data.currentConditions.temp,
    windspeed: data.currentConditions.windspeed,
    weekConditions: data.descriptions,
  } 

  return info
}




getWeatherData(accessURL);