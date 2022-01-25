import express from 'express';
const router = express.Router();
import {
  register,
  login,
  profile,
  update,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, profile);
router.put('/profile', protect, update);

export default router;
