const mongoose = require('mongoose');
const { isURL } = require('validator');

const moviesSchema = mongoose.Schema({
  countries: {
    type: Array,
    required: true,
  },
  director: {
    type: String,
    required: false,
  },
  rating: {
    type: String,
    required: true,
  },
  ratingVoteCount: {
    type: Number,
    required: true,
  },
  genres: {
    type: Array,
    required: true,
  },
  filmLength: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  filmId: {
    type: Number,
    required: true,
  },
  nameRu: {
    type: String,
    required: true,
  },
  nameEn: {
    type: String,
    required: false,
  },
  posterUrl: {
    type: String,
    required: true,
    validate: {
      validator: (url) => isURL(url),
      message: 'Неправильный формат ссылки',
    },
  },
  trailerLink: {
    type: String,
    required: false,
    validate: {
      validator: (url) => isURL(url),
      message: 'Неправильный формат ссылки',
    },
  },
  thumbnail: {
    type: String,
    required: false,
    validate: {
      validator: (url) => isURL(url),
      message: 'Неправильный формат ссылки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', moviesSchema);
