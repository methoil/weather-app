const path = require('path');
const express = require('express');
const forecastData = require('./forecast.json');

const app = express();

const lo = console.log;

const publicDir = path.join(__filename, '../public');
app.use(express.static(publicDir));

app.use('/help', express.static(path.join(publicDir, '/help.html')));
app.use('/about', express.static(path.join(publicDir, '/about.html')));

app.get('/weather', async (req, res) => {
  return res.send(forecastData);
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
