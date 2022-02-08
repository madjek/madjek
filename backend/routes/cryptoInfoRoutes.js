import express from 'express';
import {
  addCoinPortfolio,
  getMyCoins,
} from '../controllers/cryptoInfoController.js';
const router = express.Router();
import { protect, admin } from '../middleware/authMiddleware.js';

router.get('/myportfolio/:id', protect, getMyCoins);
router.post('/portfolio', protect, addCoinPortfolio);

export default router;
