const { BadRequestError } = require('./errors/index');
const { INVALID_URL_FORMAT_MSG, URL_PATTERN } = require('./constants');

module.exports = (url) => {
  if (!URL_PATTERN.test(url)) {
    throw new BadRequestError(INVALID_URL_FORMAT_MSG);
  }
  return true;
};
