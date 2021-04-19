const Movie = require('../models/movie');

const {
  BadRequestError, ConflictError, ForbiddenError, NotFoundError,
} = require('../errors/index');

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({ owner, ...req.body })
    .then(() => {
      res.status(201).send({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailer,
        thumbnail,
        movieId,
        nameRU,
        nameEN,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(err.message);
      } else if (err.code === 11000) {
        throw new ConflictError(err.message);
      }
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  const { movieId } = req.params;
  Movie.findById(movieId).select('+owner')
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Запрашиваемый ресурс не найден');
      }
      if (movie.owner.toString() !== owner) {
        throw new ForbiddenError('Нет доступа к удалению фильма');
      } else {
        Movie.findByIdAndDelete(movieId).select('-owner')
          .then((deletedMovie) => {
            res.status(200).send(deletedMovie);
          })
          .catch(next);
      }
    })
    .catch(next);
};

module.exports = { getMovies, createMovie, deleteMovie };
