import express from 'express';
const router = express.Router();
import {
  getProductByuserId,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
} from '../controllers/productController.js';
import { protect ,ShopOwner} from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';
import Product from '../models/productModel.js';

// Route to get the count of all products
router.get('/count', async (req, res) => {
  try {
    const count = await Product.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get product count' });
  }
});

router.route('/').get(getProducts).post(protect, ShopOwner, createProduct);
router.route('/:id/reviews').post(protect, checkObjectId, createProductReview);
router.get('/top', getTopProducts);
router
  .route('/:id')
  .get(checkObjectId, getProductById)
  .put(protect, ShopOwner, checkObjectId, updateProduct)
  .delete(protect, ShopOwner, checkObjectId, deleteProduct);
  router.get('/user/:userId', getProductByuserId);
export default router;
