const request = require('postman-request');
const process = require('process');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast.js');
const fs = require('fs');

const lo = console.log;

const city = process.argv[2];
getWeatherAtCity(city);


function getWeatherAtCity(city) {
  return geocode(city, (err, geocodeData) => {
    if (err) return lo('error:', err);

    const { latitude, longitude, placeName } = geocodeData;
    return forecast(latitude, longitude, (err, forecastData) => {
      if (err) return lo('error:', err);
      lo(`${forecastData} At: ${placeName}`);
      // fs.writeFileSync(`${forecastData} At: ${placeName}`);
      lo(`${forecastData} At: ${placeName}`);
      fs.writeFileSync('forecast.json', JSON.stringify(forecastData));
    });
  });
}

module.exports = getWeatherAtCity;
