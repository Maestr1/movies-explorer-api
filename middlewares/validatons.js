const { celebrate } = require('celebrate');
const Joi = require('joi');
const mongoose = require('mongoose');
const { isEmail } = require('validator');

module.exports.validateSignUp = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .min(2)
        .max(30)
        .messages({
          'string.min': 'В имени не должно быть менее 2 символов',
          'string.max': 'В имени не должно быть более 30 символов',
        }),
      email: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (isEmail(value)) {
            return value;
          }
          return helpers.message('Введен некорректный Email');
        })
        .messages({
          'any.required': 'Необходимо ввести Email',
        }),
      password: Joi.string()
        .required()
        .messages({
          'string.empty': 'Пароль не может быть пустым',
          'any.required': 'Необходимо ввести пароль',
        }),
    }),
});

module.exports.validateSignIn = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (isEmail(value)) {
            return value;
          }
          return helpers.message('Введен некорректный Email');
        })
        .messages({
          'any.required': 'Необходимо ввести Email',
        }),
      password: Joi.string()
        .required()
        .messages({
          'string.empty': 'Пароль не может быть пустым',
          'any.required': 'Необходимо ввести пароль',
        }),
    }),
});

module.exports.validatePatchUser = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .min(2)
        .max(30)
        .messages({
          'string.min': 'В имени не должно быть менее 2 символов',
          'string.max': 'В имени не должно быть более 30 символов',
        }),
      email: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (isEmail(value)) {
            return value;
          }
          return helpers.message('Введен некорректный Email');
        })
        .messages({
          'any.required': 'Необходимо ввести Email',
        }),
    }),
});

module.exports.validationCardId = celebrate({
  params: Joi.object()
    .keys({
      cardId: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (mongoose.Types.ObjectId.isValid(value)) {
            return value;
          }
          return helpers.message('Передан некорректный ID карточки');
        })
        .messages({
          'any.required': 'Не переданы данные о карточке',
        }),
    }),
});
