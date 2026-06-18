import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import handleWeather from './weather.js';
import handleMovies from './movies.js';


dotenv.config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => {
  response.status(200).send('City Explorer API is running');
});

app.get('/weather', handleWeather);

app.get('/movies', handleMovies);

class Forecast {
  constructor(dayObj) {
    this.date = dayObj.valid_date;

    this.description =
      `Low of ${dayObj.low_temp},
      high of ${dayObj.max_temp}
      with ${dayObj.weather.description}`;
  }
}

class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.average_votes = movie.vote_average;
    this.total_votes = movie.vote_count;
    this.image_url =
      `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    this.popularity = movie.popularity;
    this.released_on = movie.release_date;
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

app.get('/movies', async (request, response) => {
  try {
    const city = request.query.searchQuery;

    const movieUrl =
      `https://api.themoviedb.org/3/search/movie` +
      `?api_key=${process.env.MOVIE_API_KEY}` +
      `&query=${city}`;

    const movieResponse = await axios.get(movieUrl);

    const movies =
  movieResponse.data.results.map(movie => {
    return new Movie(movie);
  });

response.status(200).send(movies);

  } catch (error) {
    console.log(error.message);

    response.status(500).send('Unable to get movies');
  }
});
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});