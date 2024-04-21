// const express = require('express');
// const router = express.Router();
// const {
//   getInsuranceCompany,
//   getInsuranceCompanyById,
//   createInsuranceCompany,
//   updateInsuranceCompany,
//   deleteInsuranceCompany,
//   createInsuranceCompanyReview,
//   getTopInsuranceCompany,
// } = require('../controllers/InsuranceCompanyController.js');
// const { protect, admin } = require('../middleware/authMiddleware.js');
// const checkObjectId = require('../middleware/checkObjectId.js');

// router.route('/').get(getInsuranceCompany).post(protect, admin, createInsuranceCompany);

// router.route('/:id/reviews').post(protect, checkObjectId, createInsuranceCompanyReview);
// router.get('/top', getTopInsuranceCompany);
// router
//   .route('/:id')
//   .get(checkObjectId, getInsuranceCompanyById)
//   .put(protect, admin, checkObjectId, updateInsuranceCompany)
//   .delete(protect, admin, checkObjectId, deleteInsuranceCompany);

// module.exports = router;


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
} from '../controllers/insurance_CompanyController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// @desc    Fetch all insurance companies
// @route   GET /api/insuranceCompany
// @access  Public
router.route('/').get(asyncHandler(getInsuranceCompany));

// @desc    Fetch single insurance company
// @route   GET /api/insuranceCompany/:id
// @access  Public
router.route('/:id').get(asyncHandler(getInsuranceCompanyById));

// @desc    Create a insurance company
// @route   POST /api/insuranceCompany
// @access  Private/Admin
router.route('/').post(protect, admin, asyncHandler(createInsuranceCompany));

// @desc    Update a insurance company
// @route   PUT /api/insuranceCompany/:id
// @access  Private/Admin
router.route('/:id').put(protect, admin, asyncHandler(updateInsuranceCompany));

// @desc    Delete a insurance company
// @route   DELETE /api/insuranceCompany/:id
// @access  Private/Admin
router.route('/:id').delete(protect, admin, asyncHandler(deleteInsuranceCompany));

// @desc    Get top rated insurance companies
// @route   GET /api/insuranceCompany/top
// @access  Public
router.route('/top').get(asyncHandler(getTopInsuranceCompany));

export default router;
