const rateLimit = require('express-rate-limit');
const { REQUEST_LIMITED_MSG } = require('../utils/constants');

module.exports.limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: REQUEST_LIMITED_MSG,
});
