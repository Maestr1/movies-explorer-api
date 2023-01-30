const {
  NODE_ENV, JWT_SECRET = 'secret-key',
} = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const LoginError = require('../errors/login');
const ValidationError = require('../errors/validation');
const NotUniqueError = require('../errors/not-unique');
const NotFoundError = require('../errors/not-found');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      next(new NotFoundError('Запрашиваемый пользователь не найден'));
    })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.patchUser = (req, res, next) => {
  const {
    name,
    about,
  } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    name,
    about,
  }, { new: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные о пользователе'));
      }
      if (err.name === 'CastError') {
        next(new ValidationError('Передан некорректный ID пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        email,
        password: hash,
      })
        .then((user) => {
          const userObject = user.toObject();
          delete userObject.password;
          res.send(userObject);
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new ValidationError('Переданы некорректные данные о пользователе'));
          }
          if (err.code === 11000) {
            next(new NotUniqueError('Введенный Email уже используется'));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

module.exports.signin = (req, res, next) => {
  const {
    email, password,
  } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        secure: NODE_ENV === 'production',
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'None',
        domain: 'localhost',
      });
      res.send({ token });
    })
    .catch((err) => {
      next(new LoginError(err.message));
    });
};

module.exports.signout = (req, res) => {
  res.clearCookie('jwt');
  res.send({ message: 'signout OK' });
};