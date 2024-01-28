const router = require('express').Router();
const userRouter = require('./users');
const moviesRouter = require('./movies');
const filmsRouter = require('./films');
const { signin, createUser, signout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found');
const { validateSignIn, validateSignUp } = require('../middlewares/validatons');

router.use('/signin', validateSignIn, signin);
router.use('/signup', validateSignUp, createUser);

router.use('/', auth);

router.use('/signout', signout);
router.use('/users', userRouter);
router.use('/movies', moviesRouter);
router.use('/films', filmsRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Не правильный путь'));
});

module.exports = router;
