const router = require('express').Router();
const {
  getPopularFilms, getFilm, getVideos, getStaff,
} = require('../controllers/films');

router.get('/popular', getPopularFilms);
router.get('/:_id', getFilm);
router.get('/:_id/videos', getVideos);
router.get('/:_id/staff', getStaff);

module.exports = router;
