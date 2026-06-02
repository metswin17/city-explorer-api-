const express = require('express'); 
const cors = require('cors'); 
require('dotenv').config(); 


const app = express();
app.use(cors());

const weatherData = require('./data/weather.json');

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


app.get('/', (req, res) => {
  res.send('Server is running');
});

app.get('/weather', (request, response) => {


  const { searchQuery } = request.query;
const { lat, lon, searchQuery } = request.query;
city.city_name.toLowerCase() === searchQuery.toLowerCase()
;

  response.send(`You searched for: ${searchQuery}`);

});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});