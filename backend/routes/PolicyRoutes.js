import express from 'express';
const router = express.Router();
import {
  getPolicy,
  getPolicyById,
  getPolicyByCompanyId,
  getPolicyByType,
  createPolicy,
  updatePolicy,
  deletePolicy,
  createPolicyReview,
  getTopPolicy,
  getPolicyCount,
} from '../controllers/PolicyController.js';
import { protect, insuranceCompany } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

// Route pour obtenir le nombre total de politiques
router.get('/count/:companyId', getPolicyCount);

router.route('/').get(getPolicy).post(protect, insuranceCompany, createPolicy);
router.route('/:id/reviews').post(protect, checkObjectId, createPolicyReview);
router.get('/top', getTopPolicy);

// Nouvelles routes
router.get('/company/:companyId', getPolicyByCompanyId);
router.get('/type/:type', getPolicyByType);

router
  .route('/:id')
  .get(checkObjectId, getPolicyById)
  .put(protect, insuranceCompany, checkObjectId, updatePolicy)
  .delete(protect, insuranceCompany, checkObjectId, deletePolicy);

export default router;
