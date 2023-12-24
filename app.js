const express = require('express');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const limiter = require('./middlewares/rateLimit');
const errorHandler = require('./middlewares/errorHandler');
const router = require('./routes');
const { PORT, corsOptions } = require('./utils/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(cors(corsOptions));
app.use(helmet());
app.use(limiter);

app.use(express.json());
app.use(requestLogger);

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
