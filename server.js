const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecastData = require('./forecast.json');

const app = express();

const lo = console.log;

const publicDir = path.join(__filename, '../public');
const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

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
  });
});


app.use('/help', express.static(path.join(publicDir, '/help.html')));


app.get('/weather', async (req, res) => {
  return res.send(forecastData);
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
