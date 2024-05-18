import express from 'express';
import {
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
  .get(getClaim)         // Récupérer toutes les réclamations
  .post(protect, createClaim);  // Créer une nouvelle réclamation

router.route('/:id')
  .get(getClaimById)     // Récupérer une réclamation par ID
  .put(protect,  updateClaim)    // Mettre à jour une réclamation par ID
  .delete(protect,  deleteClaim);  // Supprimer une réclamation par ID

router.route('/top').get(getTopClaim);  // Récupérer les réclamations les mieux notées

router.route('/count/:companyId').get(getClaimCount);  // Compter les réclamations par ID de la compagnie

export default router;
