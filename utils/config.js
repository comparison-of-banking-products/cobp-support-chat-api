require('dotenv').config();

const PORT = process.env.PORT || 8083;
const {
  BOT_TOKEN,
  GROUP_ID,
  TOPIC_ID,
  MY_CHAT,
  MY_TOPIC,
  MY_EMAIL,
  EMAIL_PASS,
} = process.env;

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://80.87.107.99:8081',
    'https://80.87.107.99:8081',
  ],
};

module.exports = {
  PORT,
  BOT_TOKEN,
  GROUP_ID,
  TOPIC_ID,
  MY_CHAT,
  MY_TOPIC,
  MY_EMAIL,
  EMAIL_PASS,
  corsOptions,
};
