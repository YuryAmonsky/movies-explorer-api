/* eslint no-console: ["error", { allow: ["log"] }] */
const mongoose = require('mongoose');
const movieModel = require('../models/movie');
const {
  BadRequestError,
  ForbidenError,
  NotFoundError,
  InternalServerError,
} = require('../utils/errors');
const {
  OK,
  MOVIE_BAD_REQUEST_MSG,
  MOVIE_NOT_FOUND_MSG,
  MOVIE_FORBIDEN_MSG,
  INTERNAL_ERROR_MSG,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  movieModel.find({}).sort({ createdAt: -1 })
    .then((movies) => res.status(OK).send({ data: movies }))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  movieModel.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.status(OK).send({ data: movie });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError(MOVIE_BAD_REQUEST_MSG));
      }
      return next(new InternalServerError(INTERNAL_ERROR_MSG));
    });
};

module.exports.deleteMovie = (req, res, next) => {
  movieModel.findById(req.params.movieId)
    .orFail(new NotFoundError(MOVIE_NOT_FOUND_MSG))
    .then((movie) => {
      if (req.user._id !== movie.owner.toString()) {
        return Promise.reject(new ForbidenError(MOVIE_FORBIDEN_MSG));
      }
      return movieModel.findByIdAndRemove(req.params.movieId);
    })
    .then((movie) => res.status(OK).send({ message: `Карточка _id:${movie._id} удалена` }))
    .catch((err) => {
      if (err instanceof NotFoundError || err instanceof ForbidenError) {
        return next(err);
      }
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError(MOVIE_BAD_REQUEST_MSG));
      }
      return next(new InternalServerError(INTERNAL_ERROR_MSG));
    });
};
