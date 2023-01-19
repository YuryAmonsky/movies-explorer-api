const rateLimit = require('express-rate-limit');
const { REQUEST_LIMITED_MSG } = require('../utils/constants');

module.exports.limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: REQUEST_LIMITED_MSG,
});
