const request = require('postman-request');
const fs = require('fs');

const base = 'http://api.weatherstack.com/current';
const apiKey = 'e144d7210fc9468eebe637ab9ed62261';
const query = '40.7128,-74.0060';
const url = `${base}?access_key=${apiKey}&query=${query}&units=f`;

//mapbox
const mapboxKey = 'pk.eyJ1IjoiYm1hdGVldiIsImEiOiJja2F2c2t5cHEwZ2dwMnFyeXZycTB3OGdmIn0.loOTkNeU2FXSpN1i-tHFEw';
const mbUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angales.json?limit=2&access_token=pk.eyJ1IjoiYm1hdGVldiIsImEiOiJja2F2c2t5cHEwZ2dwMnFyeXZycTB3OGdmIn0.loOTkNeU2FXSpN1i-tHFEw';

const lo = console.log;
lo(url);
mapbox();

function weatherStack() {
  request({ url, json: true }, (err, res) => {
    lo(res);
    // const data = JSON.parse(res.body);
    // fs.writeFileSync('weather-5-30.json', JSON.stringify(data));
    lo(res.body);
    const data = res.body.current;
    lo(`It is currently ${data.temperature} degrees out, it feels like ${data.feelslike} out.`);
  });
}

function mapbox() {
  request({ url: mbUrl, json: true }, (err, res) => {
    lo('mapbox');
    // lo(res.body.features[0].geometry.coordinates);
    const coords = res.body.features[0].geometry.coordinates;
    lo(`latitude: ${coords[0]}, longitude: ${coords[1]}`);
  });
}