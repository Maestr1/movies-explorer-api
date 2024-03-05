const axios = require('axios');
const { apiConfig, apiLink } = require('../utils/constants');

module.exports.getPopularFilms = (req, res, next) => {
  axios.get(`${apiLink}/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1`, apiConfig)
    .then((response) => res.send(response.data))
    .catch((err) => next(err));
};

module.exports.getFilm = (req, res, next) => {
  axios.get(`${apiLink}/v2.2/films/${req.params._id}`, apiConfig)
    .then((response) => res.send(response.data))
    .catch((err) => next(err));
};

module.exports.getVideos = (req, res, next) => {
  axios.get(`${apiLink}/v2.2/films/${req.params._id}/videos`, apiConfig)
    .then((response) => res.send(response.data))
    .catch((err) => next(err));
};

module.exports.getStaff = (req, res, next) => {
  axios.get(`${apiLink}/v1/staff?filmId=${req.params._id}`, apiConfig)
    .then((response) => res.send(response.data))
    .catch((err) => next(err));
};
