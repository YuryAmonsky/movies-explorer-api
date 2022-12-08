const { INTERNAL_ERROR_MSG } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(err.statusCode).send({
    message: statusCode === 500 ? INTERNAL_ERROR_MSG : message,
  });
  next();
};
