const router = require('express').Router();
const { validateLogin, validateCreateUser } = require('../middlewares/requestValidation');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { NotFoundError } = require('../errors/index');
const userRouter = require('./users');
const movieRouter = require('./movies');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use(auth);

router.use(userRouter);
router.use(movieRouter);

router.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
