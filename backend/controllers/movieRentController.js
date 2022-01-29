import Movie from '../models/movieModel.js';
import MROrder from '../models/movieRentOrderModel.js';
import User from '../models/userModel.js';

const getMovies = (req, res) => {
  Movie.find({}).then((movies) => {
    res.json(movies);
  });
};

const getMovieById = (req, res) => {
  Movie.findById(req.params.id).then((movie) => {
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  });
};

const newOrder = (req, res) => {
  const { user, movie } = req.body;
  MROrder.findOne({ movieId: movie._id })
    .where({ user: user })
    .then((data) => {
      if (data) {
        res.status(400).json({ message: 'You already have this movie' });
      } else if (!movie) {
        res.status(400).json({ message: 'No any movie' });
      } else {
        const order = new MROrder({
          user,
          movieId: movie._id,
          title: movie.title,
          poster_path: movie.poster_path,
        });

        const createdOrder = order.save();
        res.status(201).json(createdOrder);
      }
    });
};

const getMyMovies = (req, res) => {
  MROrder.find({ user: req.user.id }).then((data) => {
    res.json(data);
  });
};

const credits = (req, res) => {
  User.findById(req.user.id).then((user) => {
    if (req.user.id) {
      user.movieCredits = user.movieCredits + parseInt(req.params.amount);
      const creditsChange = user.save();
      res.json(creditsChange);
    } else {
      res.status(404).json({ message: 'Some error with credits change' });
    }
  });
};

const returnMovie = (req, res) => {
  MROrder.findById(req.params.id).then((data) => {
    if (data) {
      data.remove();
      res.json({ message: 'Movie was deleted successfully!' });
    } else {
      res.status(404).json({ message: 'Movie was not found' });
    }
  });
};

export { getMovies, getMovieById, returnMovie, newOrder, getMyMovies, credits };
