const { celebrate, Joi, CelebrateError } = require('celebrate');
const validator = require('validator');

const validateUrl = (value) => {
  if (!validator.isURL(value)) {
    throw new CelebrateError('Некорректный URL');
  }
  return value;
};

const validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).message('Не верный формат id')
      .required(),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({ 'string.min': 'Минимальная длина "name" - 2' }),
    email: Joi.string().required().email().message('Не верный формат email'),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().message('Не верный формат email'),
    password: Joi.string().required(),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().message('Не верный формат email'),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30)
      .messages({ 'string.min': 'Минимальная длина "name" - 2' }),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    nameRU: Joi.string().required().min(2),
    nameEN: Joi.string().required().min(2),
    image: Joi.string().required().custom(validateUrl),
    trailer: Joi.string().required().custom(validateUrl),
    thumbnail: Joi.string().required().custom(validateUrl),
    movieId: Joi.number().required(),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().alphanum().length(24)
      .hex(),
  }),
});

module.exports = {
  validateId,
  validateUpdateUser,
  validateLogin,
  validateCreateUser,
  validateCreateMovie,
  validateDeleteMovie,
};
