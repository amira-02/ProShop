

import express from 'express';
const router = express.Router();
import asyncHandler from '../middleware/asyncHandler.js';
import {
  getInsuranceCompany,
  getInsuranceCompanyById,
  createInsuranceCompany,
  updateInsuranceCompany,
  deleteInsuranceCompany,
  getTopInsuranceCompany,
} from '../controllers/Insurance_companyController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

// @desc    Fetch all insurance companies
// @route   GET /api/insuranceCompany
// @access  Public
router.route('/').get(getInsuranceCompany);

// @desc    Fetch single insurance company
// @route   GET /api/insuranceCompany/:id
// @access  Public
router.route('/:id').get(getInsuranceCompanyById);

// @desc    Create a insurance company
// @route   POST /api/insuranceCompany
// @access  Private/Admin
router.route('/').post(protect, admin, createInsuranceCompany);

// @desc    Update a insurance company
// @route   PUT /api/insuranceCompany/:id
// @access  Private/Admin
router.route('/:id').put(protect, admin, updateInsuranceCompany);

// @desc    Delete a insurance company
// @route   DELETE /api/insuranceCompany/:id
// @access  Private/Admin
router.route('/:id').delete(protect, admin,deleteInsuranceCompany);

// @desc    Get top rated insurance companies
// :@route   GET /api/insuranceCompany/top
// @access  Public
router.route('/top').get(getTopInsuranceCompany);

export default router;
