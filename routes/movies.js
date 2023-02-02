const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validationMovieId, validateMovieBody } = require('../middlewares/validatons');

router.get('/', getMovies);
router.post('/', validateMovieBody, createMovie);
router.delete('/:_id', validationMovieId, deleteMovie);

module.exports = router;
