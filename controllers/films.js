const axios = require('axios');
const { apiConfig } = require('../utils/constants');

module.exports.getPopularFilms = (req, res, next) => {
  axios.get('https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1', apiConfig)
    .then((response) => res.send(response.data))
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
