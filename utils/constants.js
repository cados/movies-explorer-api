const limiterSetting = {
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
};

const dbSetting = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const mongodbUrl = 'DB_CONNECT=mongodb://localhost:27017/bitfilmsdb';

module.exports = { limiterSetting, dbSetting, mongodbUrl };
