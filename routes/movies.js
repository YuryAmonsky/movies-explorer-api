const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const { validateCreateMovie, validateDeleteMovie } = require('../utils/validator');
// const { URL_PATTERN } = require('../utils/constants');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', validateCreateMovie(), createMovie);
router.delete('/:movieId', validateDeleteMovie(), deleteMovie);

module.exports = router;
