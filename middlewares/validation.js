const { celebrate, Joi } = require('celebrate');

const nameRegex = /^[a-zA-Z-\u0430-\u044f\u0410-\u042fёЁ\s]*$/;
const emailRegex = /^[a-zA-Z0-9.-]+@[a-zA-Z0-9_]+\.[a-z]{2,6}$/i;

const validateMessage = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).regex(nameRegex),
    email: Joi.string().min(2).max(100).required()
      .email()
      .regex(emailRegex),
    question: Joi.string().required().max(1000),
    agree: Joi.boolean().required(),
  }),
});

module.exports = {
  validateMessage,
};
