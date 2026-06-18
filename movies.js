import axios from 'axios';

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

    response.status(200).send(movies);

  } catch (error) {
    console.log(error.message);

    response.status(500).send('Unable to get movies');
  }
}

export default handleMovies;