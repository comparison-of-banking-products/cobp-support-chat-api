require('dotenv').config();

const PORT = process.env.PORT || 8082;
const {
  BOT_TOKEN, GROUP_ID, TOPIC_ID, SUPPORT_EMAIL, EMAIL_PASS,
} = process.env;

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://80.87.107.99:8081',
    'https://80.87.107.99:8081',
  ],
};

const emailConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: SUPPORT_EMAIL,
    pass: EMAIL_PASS,
  },
  tls: { rejectUnauthorized: false },
};

module.exports = {
  PORT,
  BOT_TOKEN,
  GROUP_ID,
  TOPIC_ID,
  corsOptions,
  emailConfig,
};
