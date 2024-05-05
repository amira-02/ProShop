import express from 'express';
const router = express.Router();
import {
  getPolicy,
  getPolicyById,
  createPolicy,
  updatePolicy,
  deletePolicy,
  createPolicyReview,
  getTopPolicy,
} from '../controllers/PolicyController.js';
import { protect ,insuranceCompany } from '../middleware/authMiddleware.js'; // Assurez-vous d'importer "admin" d'authMiddleware.js
import checkObjectId from '../middleware/checkObjectId.js';
import Policy from '../models/PolicyModel.js';

// Route pour obtenir le nombre total de politiques
router.get('/count', async (req, res) => {
  try {
    const count = await Policy.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get Policy count' });
  }
});

router.route('/').get(getPolicy).post(protect, insuranceCompany, createPolicy); // Utilisation de la fonction "admin" ici
router.route('/:id/reviews').post(protect, checkObjectId, createPolicyReview);
router.get('/top', getTopPolicy);
router
  .route('/:id')
  .get(checkObjectId, getPolicyById)
  .put(protect, insuranceCompany, checkObjectId, updatePolicy)
  .delete(protect, insuranceCompany, checkObjectId, deletePolicy);

export default router;
