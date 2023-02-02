const Movie = require('../models/movies');
const ValidationError = require('../errors/validation');
const NotFoundError = require('../errors/not-found');
const ForbiddenError = require('../errors/forbidden');
const { notFoundErrorMessage, forbiddenErrorMessage, validationErrorMessage } = require('../utils/errors');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((movieList) => res.send(movieList))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(validationErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => {
      next(new NotFoundError(notFoundErrorMessage));
    })
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        next(new ForbiddenError(forbiddenErrorMessage));
        return;
      }
      Movie.findByIdAndRemove(req.params._id)
        .orFail(() => {
          next(new NotFoundError(notFoundErrorMessage));
        })
        .then(() => res.send(card))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError(validationErrorMessage));
      } else {
        next(err);
      }
    });
};
