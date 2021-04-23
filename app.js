require('dotenv').config();
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const { limiterSetting, dbSetting, mongodbUrl } = require('./utils/constants');

const { PORT = 3000, DB_CONNECT = mongodbUrl } = process.env;

mongoose.connect(DB_CONNECT, dbSetting);

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(rateLimit(limiterSetting));
app.use('/', router);

app.use(errorLogger);

app.use(errorHandler);

app.listen(PORT, () => {});
