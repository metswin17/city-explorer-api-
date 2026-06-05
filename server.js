import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

import weatherData from './data/weather.json' with { type: 'json' };

const PORT = process.env.PORT || 3001;

class Forecast {
  constructor(dayObj) {
    this.date = dayObj.valid_date;

    this.description =
      `Low of ${dayObj.low_temp},
      high of ${dayObj.max_temp}
      with ${dayObj.weather.description}`;
  }
}


app.get('/weather', (request, response) => {

  const { searchQuery } = request.query;

  const targetCity = weatherData.find(
    city =>
      city.city_name.toLowerCase() === searchQuery.toLowerCase()
  );

  const formattedWeather = targetCity.data.map(
    day => new Forecast(day)
  );

  response.send(formattedWeather);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});