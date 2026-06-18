import axios from 'axios';

const weatherCache = {};
const cacheTime = 50000;

class Forecast {
  constructor(dayObj) {
    this.date = dayObj.valid_date;

    this.description =
      `Low of ${dayObj.low_temp},
      high of ${dayObj.max_temp}
      with ${dayObj.weather.description}`;
  }
}

async function handleWeather(request, response) {
  try {
    const { lat, lon } = request.query;

    const key = `${lat}-${lon}`;

if (
  weatherCache[key] &&
  Date.now() - weatherCache[key].dateAdded < cacheTime
) {
  console.log('Weather cache hit');

  response.status(200).send(weatherCache[key].data);
  return;
}

console.log('Weather cache miss');

    const weatherUrl =
      `https://api.weatherbit.io/v2.0/forecast/daily` +
      `?lat=${lat}` +
      `&lon=${lon}` +
      `&key=${process.env.WEATHER_API_KEY}`;

    const weatherResponse =
      await axios.get(weatherUrl);

    const forecastData =
      weatherResponse.data.data.map(
        day => new Forecast(day)
      );

    weatherCache[key] = {
      data: forecastData,
      dateAdded: Date.now()
    };

    response.status(200).send(forecastData);

  } catch (error) {
    console.log(error.message);

    response.status(500).send('Unable to get weather');
  }
}

export default handleWeather;