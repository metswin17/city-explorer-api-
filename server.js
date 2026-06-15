import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => {
  response.status(200).send('City Explorer API is running');
});

class Forecast {
  constructor(dayObj) {
    this.date = dayObj.valid_date;

    this.description =
      `Low of ${dayObj.low_temp},
      high of ${dayObj.max_temp}
      with ${dayObj.weather.description}`;
  }
}

app.get('/weather', async (request, response) => {
  try {

    const { lat, lon } = request.query;

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

    response.status(200).send(forecastData);

  } catch (error) {

    console.log(error.message);

    response.status(500).send('Unable to get weather');

  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});