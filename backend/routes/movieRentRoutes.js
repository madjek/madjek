import express from 'express';
const router = express.Router();
import {
  getMovies,
  getMovieById,
  newOrder,
  getMyMovies,
} from '../controllers/movieRentController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.get('/', getMovies);
router.get('/:id', getMovieById);

router.post('/orders', protect, newOrder);
router.get('/myorders/:id', protect, getMyMovies);

export default router;
