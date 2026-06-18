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



app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});