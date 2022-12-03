const validator = require('validator');
const { BadRequestError } = require('./errors');

module.exports = (email) => {
  if (validator.isEmail(email)) {
    throw new BadRequestError('Неверный формат email');
  }
  return true;
};
