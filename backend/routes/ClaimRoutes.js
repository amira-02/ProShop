import express from 'express';
import asyncHandler from 'express-async-handler';
import {
  getCompanyIdByClaimId,
  getClaimByUserId,
  getClaim,
  getClaimById,
  createClaim,
  updateClaim,
  deleteClaim,
  getTopClaim,
  getClaimCount,
} from '../controllers/ClaimController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getClaim)        
  .post(protect, createClaim);  

router.route('/:id')
  .get(getClaimById)     
  .put(protect,  updateClaim)    
  .delete(protect,  deleteClaim); 

router.route('/top').get(getTopClaim);  
router.get('/user/:userId', asyncHandler(getClaimByUserId));
router.route('/count/:companyId').get(getClaimCount);  
router.get('/getCompanyIdByClaimId/:claimId', async (req, res) => {
  try {
    const { claimId } = req.params;
    const companyId = await getCompanyIdByClaimId(claimId);
    res.json({ companyId });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de l\'ID de la compagnie d\'assurance' });
  }
});
export default router;
