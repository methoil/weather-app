// fetch weather

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');

weatherForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  render('Loading...');
  const location = search.value;
  console.log('testing ' + location);
  await getWeather(location);
});

async function getWeather(address) {
  try {
    const res = await fetch(`http://localhost:3000/weather?address=${address}`);
    if (!res.ok) {
      return render('server error', res)
    }
    const data = await res.json();
    if (!data.forecast) {
      return render(`Invalid input: ${address} Please enter a valid location.`, JSON.stringify(data));
    }

    let forecastTemplate = ``;
    for (let key in data.forecast) {
      if (key == 'weather_icons') continue;
      forecastTemplate += `<p><strong>${key}:</strong> ${data.forecast[key]}</p>\n`
    }
    render(`<p><strong>Weather at ${data.location}</strong></p>`, forecastTemplate);
    console.log();
  } catch (err) {
    render('Network error', err);
  }




}

function render(text1 = '', text2 = '') {
  console.log(text2);
  p1.innerHTML = text1;
  p2.innerHTML = text2;
}