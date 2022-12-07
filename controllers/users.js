const { NODE_ENV, JWT_SECRET } = process.env;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const { DEV_SECRET_KEY } = require('../utils/config');
const {
  BadRequestError,
  NotFoundError,
  ConflictError,
  InternalServerError,
} = require('../utils/errors');
const {
  USER_CONFLICT_MSG,
  USER_BAD_REQUEST_MSG,
  USER_NOT_FOUND_MSG,
  INTERNAL_ERROR_MSG,
} = require('../utils/constants');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return userModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET_KEY,
        { expiresIn: '7d' },
      );
      res.send({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => userModel.create({
      ...req.body, password: hash,
    }))
    .then(({
      _id,
      name,
      email,
    }) => {
      res.send(
        {
          data: {
            _id,
            name,
            email,
          },
        },
      );
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(USER_CONFLICT_MSG));
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError(USER_BAD_REQUEST_MSG));
      }
      return next(new InternalServerError(INTERNAL_ERROR_MSG));
    });
};

module.exports.getUser = (req, res, next) => {
  let userId;
  if (req.params.userId) userId = req.params.userId;
  else userId = req.user._id;
  userModel.findById(userId).orFail(new NotFoundError(USER_NOT_FOUND_MSG))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        return next(err);
      }
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError(USER_BAD_REQUEST_MSG));
      }
      return next(new InternalServerError(INTERNAL_ERROR_MSG));
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  userModel.findByIdAndUpdate(req.user._id, { name, email }, { new: true })
    .orFail(new NotFoundError(USER_NOT_FOUND_MSG))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        return next(err);
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError(USER_BAD_REQUEST_MSG));
      }
      if (err.code === 11000) {
        return next(new ConflictError(USER_CONFLICT_MSG));
      }
      return next(new InternalServerError(INTERNAL_ERROR_MSG));
    });
};
