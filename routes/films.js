const router = require('express').Router();
const { getPopularFilms } = require('../controllers/films');

router.get('/popular', getPopularFilms);

module.exports = router;
