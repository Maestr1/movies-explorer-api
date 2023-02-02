const { celebrate } = require('celebrate');
const Joi = require('joi');
const mongoose = require('mongoose');
const { isEmail, isURL } = require('validator');
const {
  typeErrorMessage,
  emailRequireErrorMessage,
  passwordRequireMessage,
  emailValidateErrorMessage,
  linkValidateErrorMessage,
} = require('../utils/errors');

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
          return helpers.message(emailValidateErrorMessage);
        })
        .messages({
          'any.required': emailRequireErrorMessage,
        }),
      password: Joi.string()
        .required()
        .messages({
          'string.empty': passwordRequireMessage,
          'any.required': passwordRequireMessage,
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
          return helpers.message(emailValidateErrorMessage);
        })
        .messages({
          'any.required': emailRequireErrorMessage,
        }),
      password: Joi.string()
        .required()
        .messages({
          'string.empty': passwordRequireMessage,
          'any.required': passwordRequireMessage,
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
        .custom((value, helpers) => {
          if (isEmail(value)) {
            return value;
          }
          return helpers.message(emailValidateErrorMessage);
        }),
    }),
});

module.exports.validateMovieBody = celebrate({
  body: Joi.object()
    .keys({
      image: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (isURL(value)) {
            return value;
          }
          return helpers.message(linkValidateErrorMessage);
        })
        .messages({
          'string.base': `${typeErrorMessage} строкой`,
          'any.required': 'Необходимо ввести ссылку на изображение',
        }),
      country: Joi.string()
        .required()
        .messages({
          'string.base': `${typeErrorMessage} строкой`,
          'any.required': 'Необходимо ввести страну создания фильма',
        }),
      director: Joi.string()
        .required()
        .messages({
          'string.base': `${typeErrorMessage} строкой`,
          'any.required': 'Необходимо ввести режисера фильма',
        }),
      duration: Joi.string()
        .required()
        .messages({
          'string.base': `${typeErrorMessage} строкой`,
          'any.required': 'Необходимо ввести длительность фильма',
        }),
      year: Joi.string()
        .required()
        .messages({
          'string.base': `${typeErrorMessage} строкой`,
          'any.required': 'Необходимо ввести год выпуска фильма',
        }),
      description: Joi.string()
        .required()
        .messages({
          'string.base': `${typeErrorMessage} строкой`,
          'any.required': 'Необходимо ввести описание фильма',
        }),
      trailerLink: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (isURL(value)) {
            return value;
          }
          return helpers.message(linkValidateErrorMessage);
        })
        .messages({
          'string.base': `${typeErrorMessage} строкой`,
          'any.required': 'Необходимо ввести ссылку на трейлер',
        }),
      nameRU: Joi.string()
        .required()
        .messages({
          'string.base': `${typeErrorMessage} строкой`,
          'any.required': 'Необходимо ввести название фильма',
        }),
      nameEN: Joi.string()
        .required()
        .messages({
          'string.base': `${typeErrorMessage} строкой`,
          'any.required': 'Необходимо ввести название фильма',
        }),
      thumbnail: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (isURL(value)) {
            return value;
          }
          return helpers.message(linkValidateErrorMessage);
        })
        .messages({
          'string.base': `${typeErrorMessage} строкой`,
          'any.required': 'Необходимо ввести ссылку на изображение',
        }),
      movieId: Joi.number()
        .required()
        .messages({
          'string.base': `${typeErrorMessage} числом`,
          'any.required': 'Необходимо ввести ID фильма',
        }),
    }),
});

module.exports.validationMovieId = celebrate({
  params: Joi.object()
    .keys({
      _id: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (mongoose.Types.ObjectId.isValid(value)) {
            return value;
          }
          return helpers.message('Передан некорректный ID фильма');
        })
        .messages({
          'any.required': 'Не переданы данные о фильме',
        }),
    }),
});
