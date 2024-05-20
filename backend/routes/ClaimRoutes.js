import express from 'express';
import asyncHandler from 'express-async-handler';

import {
  getClaims,
  getClaimById,
  getClaimsByUserId,
  getCompanyIdByClaimId,
  createClaim,
  setRepairer,
  updateClaim,
  deleteClaim,
  getTopClaim,
  getClaimCount,
  getOrderDetailsFromClaim, 
} from '../controllers/ClaimController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Retrieve all claims or create a new claim
router.route('/')
  .get(asyncHandler(getClaims))
  .post(asyncHandler(createClaim));

// Retrieve, update, or delete a single claim by ID
router.route('/:id')
  .get(asyncHandler(getClaimById))
  .put( asyncHandler(updateClaim))
  .delete( asyncHandler(deleteClaim));

// Retrieve top rated claims
router.get('/top', asyncHandler(getTopClaim));

// Retrieve claims by user ID
router.get('/user/:userId', asyncHandler(getClaimsByUserId));

// Retrieve claim count by company ID
router.get('/count/:companyId', asyncHandler(getClaimCount));

router.get('/claim/order/:orderId', getOrderDetailsFromClaim);

export default router;
