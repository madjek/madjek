import express from 'express';
const router = express.Router();
import {
  register,
  login,
  profile,
  update,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, profile);
router.put('/profile', protect, update);
router.get('/', protect, admin, getUsers);
router.get('/:id', protect, admin, getUserById);
router.put('/:id', protect, admin, updateUser);
router.delete('/:id', protect, admin, deleteUser);

export default router;
