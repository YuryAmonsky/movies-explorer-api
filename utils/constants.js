const OK = 200;
const NOT_AUTHORIZED_MSG = 'Необходима авторизация';
const INVALID_LOGIN_PASSWORD_MSG = 'Неправильные почта или пароль';
const USER_CONFLICT_MSG = 'Пользователь с указанным email уже зарегистрирован';
const USER_BAD_REQUEST_MSG = 'Переданы некорректные данные пользователя';
const MOVIE_BAD_REQUEST_MSG = 'Переданы некорректные данные фильма';
const URL_NOT_FOUND_MSG = 'По указанному пути ничего не найдено';
const USER_NOT_FOUND_MSG = 'Пользователь не найдет';
const MOVIE_NOT_FOUND_MSG = 'Фильм не найден';
const MOVIE_FORBIDEN_MSG = 'Нельзя удалять чужую карточку';
const INTERNAL_ERROR_MSG = 'Произошла ошибка на сервере';
const URL_PATTERN = /^https?:\/\/(?:w{3}\.)?(?:[a-z0-9]+[a-z0-9-]*\.)+[a-z]{2,}(?::[0-9]+)?(?:\/\S*)?#?$/i;
const ALLOWED_CORS = [
  'http://localhost:3001',
  'https://localhost:3001',
  'http://amo.movies-explorer.nomoredomains.club',
  'https://amo.movies-explorer.nomoredomains.club',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  OK,
  NOT_AUTHORIZED_MSG,
  INVALID_LOGIN_PASSWORD_MSG,
  USER_CONFLICT_MSG,
  USER_BAD_REQUEST_MSG,
  MOVIE_BAD_REQUEST_MSG,
  URL_NOT_FOUND_MSG,
  USER_NOT_FOUND_MSG,
  MOVIE_NOT_FOUND_MSG,
  MOVIE_FORBIDEN_MSG,
  INTERNAL_ERROR_MSG,
  URL_PATTERN,
  ALLOWED_CORS,
  DEFAULT_ALLOWED_METHODS,
};
