const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET = 'secret-key' } = process.env;
const LoginError = require('../errors/login');

function handleAuthError(next) {
  next(new LoginError('Требуется авторизация'));
}

module.exports = (req, res, next) => {
  const { jwt: token } = req.cookies;

  if (!token) {
    handleAuthError(next);
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {
    handleAuthError(next);
    return;
  }
  req.user = payload;
  next();
};
