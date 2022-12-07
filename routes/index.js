const router = require('express').Router();
const { errors } = require('celebrate');
const users = require('./users');
const movies = require('./movies');
const { validateToken } = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { URL_NOT_FOUND_MSG, ALLOWED_CORS, DEFAULT_ALLOWED_METHODS } = require('../utils/constants');
const { NotFoundError } = require('../utils/errors');
const { validateSignIn, validateSignUp } = require('../utils/validator');

// обработка простых CORS запросов и префлайт запросовp
router.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  if (ALLOWED_CORS.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      const requestHeaders = req.headers['access-control-request-headers'];
      res.header('Access-Control-Allow-Headers', requestHeaders);
      return res.end();
    }
  }
  return next();
});

router.post('/signin', validateSignIn(), login);

router.post('/signup', validateSignUp(), createUser);

router.use('/users', validateToken, users);

router.use('/movies', validateToken, movies);

router.use('*', validateToken, (req, res, next) => {
  const err = new NotFoundError(URL_NOT_FOUND_MSG);
  next(err);
});
router.use(errors());

module.exports = router;
