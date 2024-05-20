
import express from 'express';
const router = express.Router();
import {
  getOffer,
  getOfferById,
  createOffer,
  updateOffer,
  deleteOffer,
  getTopOffer,
} from '../controllers/OfferController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

// @desc    Fetch all insurance companies
// @route   GET /api/Offer
// @access  Public
router.route('/').get(getOffer);

// @desc    Fetch single insurance company
// @route   GET /api/Offer/:id
// @access  Public
router.route('/:id').get(getOfferById);

// @desc    Create a insurance company
// @route   POST /api/Offer
// @access  Private/Admin
router.route('/').post(protect, admin, createOffer);

// @desc    Update a insurance company
// @route   PUT /api/Offer/:id
// @access  Private/Admin
router.route('/:id').put(protect, admin, updateOffer);

// @desc    Delete a insurance company
// @route   DELETE /api/Offer/:id
// @access  Private/Admin
router.route('/:id').delete(protect, admin,deleteOffer);

// @desc    Get top rated insurance companies
// :@route   GET /api/Offer/top
// @access  Public
router.route('/top').get(getTopOffer);

export default router;
