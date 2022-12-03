/* eslint no-console: ["error", { allow: ["log"] }] */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const { DEV_DB_PATH } = require('./utils/config');

const app = express();
const { PORT = 3000, NODE_ENV, DB_PATH } = process.env;
mongoose.connect(NODE_ENV === 'production' ? DB_PATH : DEV_DB_PATH);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
