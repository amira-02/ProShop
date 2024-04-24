import express from 'express';
const router = express.Router();
import asyncHandler from '../middleware/asyncHandler.js';
import {
  getShops,
  getShopById,
  createShop,
  updateShop,
  deleteShop,
  getTopShops
} from '../controllers/ShopController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

// @desc    Fetch all insurance companies
// @route   GET /api/Shop
// @access  Public
router.get('/', getShops);

// @desc    Fetch single insurance company
// @route   GET /api/Shop/:id
// @access  Public
router.get('/:id', getShopById);

// @desc    Create a insurance company
// @route   POST /api/Shop
// @access  Private/Admin
router.post('/', protect, admin, createShop);

// @desc    Update a insurance company
// @route   PUT /api/Shop/:id
// @access  Private/Admin
router.put('/:id', protect, admin, updateShop);

// @desc    Delete a insurance company
// @route   DELETE /api/Shop/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, deleteShop);

// @desc    Get top rated insurance companies
// @route   GET /api/Shop/top
// @access  Public
router.get('/top', getTopShops);

export default router;
