import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import newToken from '../config/token.js';

const register = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }).then((user) => {
    if (user) {
      res.status(400).json({ message: 'User already exists' });
    } else {
      const user = new User(req.body);
      user.hash_password = bcrypt.hashSync(password, 10);

      user.save();
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: newToken(user._id, user.isAdmin),
      });
    }
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }).then((user) => {
    if (user && user.comparePassword(password)) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        movieCredits: user.movieCredits,
        isAdmin: user.isAdmin,
        token: newToken(user._id, user.isAdmin),
      });
    } else {
      res.status(401).json({ message: 'Wrong email or password.' });
    }
  });
};

const profile = (req, res) => {
  User.findById(req.user.id).then((user) => {
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        movieCredits: user.movieCredits,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
};

const update = (req, res) => {
  User.findById(req.user.id).then((user) => {
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = req.body.password;
      }

      user.save();

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: newToken(user._id),
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
};

const getUsers = (req, res) => {
  User.find({}).then((users) => {
    res.json(users);
  });
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .select('-password')
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    });
};

const updateUser = (req, res) => {
  User.findById(req.params.id).then((user) => {
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = req.body.isAdmin;

      const updatedUser = user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
};

const deleteUser = (req, res) => {
  User.findById(req.params.id).then((user) => {
    if (user) {
      user.remove();
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
};

export {
  register,
  login,
  profile,
  update,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
