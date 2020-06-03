const https = require('https');
const Q = console.log;
function generateMapboxUrl(location) {
  return `httsp://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?limit=2&access_token=pk.eyJ1IjoiYm1hdGVldiIsImEiOiJja2F2c2t5cHEwZ2dwMnFyeXZycTB3OGdmIn0.loOTkNeU2FXSpN1i-tHFEw`;
}

const req = https.request(generateMapboxUrl('Austin'), res => {
  let data = '';
  Q(req);

  res.on('data', chunk => {
    data = data + chunk.toString();
  });

  res.on('end', () => {
    Q(data);
  });
});
req.on('error', err => Q('Error: ', err));

const name = 'Boris';
const role = 'Fullstack Engineer';

const user = {
  name,
  role,
  location: 'Acton',
}

console.log(user);

// object destructing

const product = {
  label: 'notebook',
  price: 3,
  stock: 201,
  salePrice: undefined,
}

const { label: productLabel, stock } = product;

console.log(productLabel);
console.log(stock);

const transaction = (type, { label, stock }) => {
  console.log(type, label, stock);
}

transaction('order', product);
