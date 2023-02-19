const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const errorHandler = require('./middlewares/error-handler');
const { devDBLink, devPort } = require('./utils/constants');
const { limiter } = require('./utils/limiterConfig');

const { PORT = devPort, DB_LINK = devDBLink } = process.env;
const corsOptions = {
  origin: true,
  credentials: true,
};

const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

mongoose.set('runValidators', true);

mongoose.connect(DB_LINK, {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use(limiter);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
