import Movie from '../models/movieModel.js';
import MROrder from '../models/movieRentOrderModel.js';

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
  if (!movie) {
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
};

const getMyMovies = (req, res) => {
  MROrder.find({ user: req.user.id }).then((data) => {
    res.json(data);
  });
};

export { getMovies, getMovieById, newOrder, getMyMovies };
