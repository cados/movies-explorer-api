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
  Movie.create({
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
    owner,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(err.message);
      }
      if (err.code === 11000) {
        throw new ConflictError(err.message);
      } else next(err);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  const { movieId } = req.params;
  Movie.findById(movieId).select('+owner')
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Нет фильма с таким id');
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
