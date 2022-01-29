import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  newOrder,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
} from '../controllers/ecommerceController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.get('/products', getProducts);
router.post('/products', protect, admin, createProduct);
router.post('/products/:id/reviews', protect, createProductReview);
router.get('/products/top', getTopProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id', protect, admin, updateProduct);
router.delete('/products/:id', protect, admin, deleteProduct);

router.post('/orders/', protect, newOrder);
router.get('/orders/', getOrders);
router.get('/orders/:id', protect, getOrderById);
router.put('/orders/:id/pay', protect, updateOrderToPaid);
router.put('/orders/:id/deliver', protect, admin, updateOrderToDelivered);
router.get('/orders/myorders/:id', protect, getMyOrders);
export default router;
