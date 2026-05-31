const express = require('express'); 
const cors = require('cors'); 
require('dotenv').config(); 
const app = express();
app.use(cors());
const weatherData = require('./data/weather.json');
const PORT = process.env.PORT || 3001;

console.log(weatherData);


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
