const express = require('express');
const forecastData = require('./forecast.json');
const app = express();

app.get('', (req, res) => {
  res.send('<h1>Hello express perfect</h1>');
});

app.get('/help', (req, res) => {
  res.send({ name: 'Boris Mateev', class: 'Fullstack Engineer' });
});

app.get('/about', (req, res) => {
  res.send('<h1>About</h1>');
});

app.get('/weather', async (req, res) => {
  return res.send(forecastData);
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
