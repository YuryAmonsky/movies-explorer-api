const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const { validateUserInfo } = require('../utils/validator');
const {
  getUser,
  updateUserInfo,
} = require('../controllers/users');

router.get('/me', getUser);
router.patch('/me', validateUserInfo(), updateUserInfo);

module.exports = router;
