const validator = require('validator');
const { BadRequestError } = require('./errors');
const { INVALID_EMAIL_FORMAT_MSG } = require('./constants');

module.exports = (email) => {
  if (validator.isEmail(email)) {
    throw new BadRequestError(INVALID_EMAIL_FORMAT_MSG);
  }
  return true;
};
