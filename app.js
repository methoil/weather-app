const request = require('postman-request');
const fs = require('fs');

const base = 'http://api.weatherstack.com/current';
const apiKey = 'e144d7210fc9468eebe637ab9ed62261';
const query = '40.7128,-74.0060';
const url = `${base}?access_key=${apiKey}&query=${query}`;

const lo = console.log;
lo(url);
request({ url }, (err, res) => {
  const data = JSON.parse(res.body);
  fs.writeFileSync('weather-5-30.json', JSON.stringify(data));
});