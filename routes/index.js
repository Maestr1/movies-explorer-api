const router = require('express').Router();

const userRouter = require('./users');
const moviesRouter = require('./movies');
const { login, createUser, signout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/not-found');

router.use('/signin', login);
router.use('/signup', createUser);
router.use('/signout', signout);

router.use('/', auth);

router.use('/users', userRouter);
router.use('/movies', moviesRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Не правильный путь'));
});

module.exports = router;
