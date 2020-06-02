const request = require('postman-request');
const process = require('process');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast.js');

const lo = console.log;

const city = process.argv[2];

geocode(city, (err, geocodeData) => {
  if (err) return lo('error:', err);

  const { latitude, longitude, placeName } = geocodeData;
  forecast(latitude, longitude, (err, forecastData) => {
    if (err) return lo('error:', err);
    lo(forecastData + ` At: ${placeName}`);
  });
});
