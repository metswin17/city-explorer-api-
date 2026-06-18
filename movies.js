import axios from 'axios';

const movieCache = {};
const cacheTime = 50000;

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

async function handleMovies(request, response) {
  try {
    const city = request.query.searchQuery;
    
    if (
      movieCache[city] &&
      Date.now() - movieCache[city].dateAdded < cacheTime
    ) {
      console.log('Movie cache hit');
    
      response.status(200).send(movieCache[city].data);
      return;
    }
    
    console.log('Movie cache miss');

    const movieUrl =

      `https://api.themoviedb.org/3/search/movie` +
      `?api_key=${process.env.MOVIE_API_KEY}` +
      `&query=${city}`;

    const movieResponse =
      await axios.get(movieUrl);

    const movies =
      movieResponse.data.results.map(movie => {
        return new Movie(movie);
      });

    movieCache[city] = {
      data: movies,
      dateAdded: Date.now()
    };

    response.status(200).send(movies);

  } catch (error) {
    console.log(error.message);

    response.status(500).send('Unable to get movies');
  }
}

export default handleMovies;