const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const cors = require('cors');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');
const errorHandler = require('./middlewares/error-handler');
const { devDBLink, devPort } = require('./utils/constants');

const { PORT = devPort, DBLINK = devDBLink } = process.env;
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

mongoose.set('runValidators', true);

mongoose.connect(DBLINK, {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT);
