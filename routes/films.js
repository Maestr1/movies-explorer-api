const router = require('express').Router();
const { getPopularFilms, getFilm, getVideos } = require('../controllers/films');

router.get('/popular', getPopularFilms);
router.get('/:_id', getFilm);
router.get('/:_id/videos', getVideos);

module.exports = router;
