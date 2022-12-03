const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { UnathorizedError } = require('../utils/errors');
const emailValidator = require('../utils/emailValidator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validator: emailValidator,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        const err = new UnathorizedError('Неправильные почта или пароль');
        return Promise.reject(err);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            const err = new UnathorizedError('Неправильные почта или пароль');
            return Promise.reject(err);
          }
          return Promise.resolve(user);
        });
    });
};

module.exports = mongoose.model('user', userSchema);
