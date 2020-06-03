const request = require('postman-request');

const geocode = (city, cb) => {
  // console.log(generateMapboxUrl(city));
  const config = { url: generateMapboxUrl(city), json: true };

  request(config, (err, res) => {
    if (err) {
      return cb('Unable to connect to location services', undefined);
    } else if (!res.body.features || res.body.features.length === 0) {
      return cb('Unable to find location services', undefined);
    } else {
      const { center, place_name: placeName } = res.body.features[0];
      cb(undefined, {
        latitude: center[1],
        longitude: center[0],
        placeName,
      })
    }
  });
}

function generateMapboxUrl(location) {
  return `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?limit=2&access_token=pk.eyJ1IjoiYm1hdGVldiIsImEiOiJja2F2c2t5cHEwZ2dwMnFyeXZycTB3OGdmIn0.loOTkNeU2FXSpN1i-tHFEw`;
}
//mapbox
const mapboxKey = 'pk.eyJ1IjoiYm1hdGVldiIsImEiOiJja2F2c2t5cHEwZ2dwMnFyeXZycTB3OGdmIn0.loOTkNeU2FXSpN1i-tHFEw';
const mbUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angales.json?limit=2&access_token=pk.eyJ1IjoiYm1hdGVldiIsImEiOiJja2F2c2t5cHEwZ2dwMnFyeXZycTB3OGdmIn0.loOTkNeU2FXSpN1i-tHFEw';

module.exports = geocode;
