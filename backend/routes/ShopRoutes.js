import express from 'express';
const router = express.Router();
import asyncHandler from '../middleware/asyncHandler.js';
import {
  getShops,
  getShopById,
  createShop,
  updateShop,
  deleteShop,
  getTopShops,
} from '../controllers/ShopController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import checkObjectId from '../middleware/checkObjectId.js';

// Route pour obtenir le comptage de tous les magasins
router.get('/count', asyncHandler(async (req, res) => {
  try {
    const count = await Shop.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get Shop count' });
  }
}));

// Routes pour les opérations CRUD sur les magasins
router.route('/')
  .get(getShops)
  .post(protect, admin, createShop);

// Route pour obtenir les magasins les mieux notés
router.get('/top', getTopShops);

// Route pour obtenir un magasin par son ID, mettre à jour ou supprimer un magasin
router.route('/:id')
  .get(checkObjectId, getShopById) // Utilisation de checkObjectId pour vérifier l'ID
  .put(protect, admin, updateShop)
  .delete(protect, admin, deleteShop);

export default router;
