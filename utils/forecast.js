const request = require('postman-request');
const base = 'http://api.weatherstack.com/current';
const apiKey = 'e144d7210fc9468eebe637ab9ed62261';
const lo = console.log;

function forecast(lat, long, cb) {
  const url = `${base}?access_key=${apiKey}&query=${lat},${long}&units=f`;

  request({ url, json: true }, (err, res) => {
    if (err) {
      return cb('unable to connect to weather stack service', undefined);
    }
    if (res.body.error) {
      return cb('unaable to find entered location', undefined);
    }

    const { temperature, feelslike } = res.body.current;
    cb(undefined, `It is currently ${temperature} degrees out, it feels like ${feelslike} out.`);
  });
}

function generateMapboxUrl(location) {
  return `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?limit=2&access_token=pk.eyJ1IjoiYm1hdGVldiIsImEiOiJja2F2c2t5cHEwZ2dwMnFyeXZycTB3OGdmIn0.loOTkNeU2FXSpN1i-tHFEw`;
}

module.exports = forecast;
