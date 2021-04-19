const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { UnauthorizedError } = require('../errors/index');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено'],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Укажите валидный email!',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
    select: false,
    minlength: 8,
    validate: {
      validator: (v) => validator.isStrongPassword(v),
      message: 'Укажите надежный пароль!',
    },
  },
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },
});

userSchema.statics.findUserByCredentials = function userLogin(email, password) {
  return this.findOne({ email })
    .select('+password')
    .orFail(new UnauthorizedError('Неправильные почта или пароль'))
    .then((user) => bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return user;
    }));
};

module.exports = mongoose.model('user', userSchema);
