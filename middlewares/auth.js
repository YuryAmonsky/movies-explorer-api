const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const UnathorizedError = require('../utils/errors/unathorized-error');
const { NOT_AUTHORIZED_MSG } = require('../utils/constants');
const { DEV_SECRET_KEY } = require('../utils/config');

module.exports.validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    const err = new UnathorizedError(NOT_AUTHORIZED_MSG);
    return next(err);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET_KEY);
  } catch (e) {
    const err = new UnathorizedError(NOT_AUTHORIZED_MSG);
    return next(err);
  }

  req.user = payload;

  return next();
};
