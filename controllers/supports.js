const TelegramBot = require("node-telegram-bot-api");
const { BOT_TOKEN, GROUP_ID, TOPIC_ID } = require("../utils/config");
const BadRequestError = require("../errors/BadRequestError");

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

const sendMessages = (req, res, next) => {
  try {
    const { name, email, question, agree } = req.body;

    if (!name || !email || !question || !agree) {
      throw new BadRequestError("Неверные данные формы");
    }

    const message = `
      <b>Сообщение с чата поддержки:</b>
      <b>Имя:</b> ${name}
      <b>Email:</b> ${email}
      <b>Вопрос:</b> ${question}
      <b>Пользователь принял соглашение:</b> ${agree ? "Да" : "Нет"}
    `;

    bot.sendMessage(GROUP_ID, message, {
      parse_mode: "HTML",
      reply_to_message_id: TOPIC_ID,
      reply_markup: {
        force_reply: true,
        selective: true,
      },
    });

    res.send({ success: true, message: "Данные отправлены в чат в Telegram" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendMessages,
};
