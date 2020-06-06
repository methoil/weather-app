const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecastData = require('./forecast.json');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();

const lo = console.log;

const publicDir = path.join(__filename, '../public');
const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
lo('registering partials');
hbs.registerPartials(partialsPath);
lo(partialsPath);

// Setup 
app.use(express.static(publicDir));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Boris Methos',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Boris Mateev, put a picture + bio here',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    content: 'Set the location of that you would like to know the weather of',
    name: 'Boris Mateev',
  });
});
// app.use('/help', express.static(path.join(publicDir, '/help.html')));

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help',
    error: 'Help article not found.',
    name: 'Boris Mateev',
  });
});

app.get('/weather', async (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({
      error: 'you must provide an address',
    });
  }

  geocode(address, (geocodeError, geocodeData) => {
    if (geocodeError) {
      lo('error:', geocodeError);
      return res.send({ geocodeError });
    };

    const { latitude, longitude, placeName } = geocodeData;
    forecast(latitude, longitude, (forecastErr, forecastData) => {
      if (forecastErr) {
        lo('error:', forecastErr);
        return res.send({ geocodeError });
      };
      lo(`${forecastData} At: ${placeName}`);

      res.send({
        forecast: forecastData,
        location: placeName,
        address,
      })
    });
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  lo(req.query);
  res.send({ products: [] });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Something went wrong.',
    error: 'Page not found.',
    name: 'Boris Mateev',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
