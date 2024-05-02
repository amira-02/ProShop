
import express from 'express';
const router = express.Router();
import asyncHandler from '../middleware/asyncHandler.js';
import {
  getRepairerCompany,
  getRepairerCompanyById,
  createRepairerCompany,
  updateRepairerCompany,
  deleteRepairerCompany,
  getTopRepairerCompany,
} from '../controllers/RepairerCompanyController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

// @desc    Fetch all Repairer companies
// @route   GET /api/RepairerCompany
// @access  Public
router.route('/').get(getRepairerCompany);

// @desc    Fetch single Repairer company
// @route   GET /api/RepairerCompany/:id
// @access  Public
router.route('/:id').get(getRepairerCompanyById);

// @desc    Create a Repairer company
// @route   POST /api/RepairerCompany
// @access  Private/Admin
router.route('/').post(protect, admin, createRepairerCompany);

// @desc    Update a Repairer company
// @route   PUT /api/RepairerCompany/:id
// @access  Private/Admin
router.route('/:id').put(protect, admin, updateRepairerCompany);

// @desc    Delete a Repairer company
// @route   DELETE /api/RepairerCompany/:id
// @access  Private/Admin
router.route('/:id').delete(protect, admin,deleteRepairerCompany);

// @desc    Get top rated Repairer companies
// :@route   GET /api/RepairerCompany/top
// @access  Public
router.route('/top').get(getTopRepairerCompany);

export default router;
