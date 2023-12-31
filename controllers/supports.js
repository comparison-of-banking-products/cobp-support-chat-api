const nodemailer = require('nodemailer');
const TelegramBot = require('node-telegram-bot-api');
const {
  BOT_TOKEN,
  GROUP_ID,
  TOPIC_ID,
  emailConfig,
} = require('../utils/config');
const BadRequestError = require('../errors/BadRequestError');

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

const transporter = nodemailer.createTransport(emailConfig);

bot.on('text', async (msg) => {
  if (
    msg.reply_to_message
    && msg.reply_to_message.text
    && msg.reply_to_message.text.includes('Сообщение с чата поддержки:')
  ) {
    try {
      const lines = msg.reply_to_message.text.split('\n');
      const name = lines
        .find((line) => line.includes('Имя:'))
        .split('Имя:')[1]
        .trim();
      const email = lines
        .find((line) => line.includes('Email:'))
        .split('Email:')[1]
        .trim();
      const question = lines
        .find((line) => line.includes('Вопрос:'))
        .split('Вопрос:')[1]
        .trim();
      const replyText = msg.text;

      const mailOptions = {
        from: 'benchbot24@gmail.com',
        to: email,
        subject: 'Ответ на Ваш вопрос в чате поддержки',
        text: `Здравствуйте, ${name}!\n\nВаш вопрос:\n${question}\n\nОтвет в чате:\n${replyText}`,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(`Email sent: ${info.response}`);
    } catch (error) {
      console.error('Error processing support chat message:', error);
    }
  }
});

const sendMessages = (req, res, next) => {
  try {
    const {
      name, email, question, agree,
    } = req.body;

    if (!name || !email || !question || !agree) {
      throw new BadRequestError('Неверные данные формы');
    }

    const message = `
      <b>Сообщение с чата поддержки:</b>
      <b>Имя:</b> ${name}
      <b>Email:</b> ${email}
      <b>Вопрос:</b> ${question}
      <b>Пользователь принял соглашение:</b> ${agree ? 'Да' : 'Нет'}
    `;

    bot.sendMessage(GROUP_ID, message, {
      parse_mode: 'HTML',
      reply_to_message_id: TOPIC_ID,
      reply_markup: {
        force_reply: true,
        selective: true,
      },
    });

    res.send({ success: true, message: 'Данные отправлены в чат в Telegram' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendMessages,
};
