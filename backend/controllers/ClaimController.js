import asyncHandler from '../middleware/asyncHandler.js';
import  Claim  from '../models/ClaimModel.js'; // Use a different variable name here

// @desc Fetch all Claim
// @route GET /api/Claim
// @access Public
const getClaim = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {};

  const count = await Claim.countDocuments({ ...keyword });
  const claims = await Claim.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1)); // Use a different variable name here

  res.json({ claims, page, pages: Math.ceil(count / pageSize), count }); // Update variable name here
});

// @desc Fetch single Claim
// @route GET /api/Claim/:id
// @access Public
const getClaimById = asyncHandler(async (req, res) => {
  const claim = await Claim.findById(req.params.id); // Use a different variable name here
  if (!claim) {
    res.status(404).json({ message: 'Claim not found with the provided ID' });
    return;
  }
  res.json(claim);
});

// Vos fonctions CRUD
// @desc Create a Claim
// @route POST /api/claims

const createClaim = asyncHandler(async (req, res) => {
    const { Repairer, Order, indexProduct, description } = req.body;
  
    try {
      // Créer une nouvelle réclamation avec les données fournies
      const newClaim = new Claim({ // Use a different variable name here
        Repairer,
        Order,
        indexProduct,
        description,
        status: 'Pending', // Par défaut, le statut est 'Pending'
        createdAt: new Date(),
        updatedAt: new Date(),
      });
  
      const createdClaim = await newClaim.save(); // Use a different variable name here
  
      res.status(201).json({ message: 'Réclamation créée avec succès', claim: createdClaim });
    } catch (error) {
      res.status(500).json({ message: 'Échec de la création de la réclamation', error: error.message });
    }
  });

// @desc    Mettre à jour une réclamation
// @route   PUT /api/claims/:id
// @access  Private/Admin
const updateClaim = asyncHandler(async (req, res) => {
    const { Repairer, Order, indexProduct, description, status } = req.body;
  
    // Trouver la réclamation à mettre à jour par son ID
    let claimToUpdate = await Claim.findById(req.params.id); // Use a different variable name here
  
    if (!claimToUpdate) {
      res.status(404).json({ message: 'Réclamation non trouvée avec l\'ID fourni' });
      return;
    }
  
    // Mettre à jour les champs de la réclamation
    claimToUpdate.Repairer = Repairer || claimToUpdate.Repairer;
    claimToUpdate.Order = Order || claimToUpdate.Order;
    claimToUpdate.indexProduct = indexProduct || claimToUpdate.indexProduct;
    claimToUpdate.description = description || claimToUpdate.description;
    claimToUpdate.status = status || claimToUpdate.status;
    claimToUpdate.updatedAt = new Date();
  
    const updatedClaim = await claimToUpdate.save(); // Use a different variable name here
  
    res.json({ message: 'Réclamation mise à jour', claim: updatedClaim });
  });









  const deleteClaim = asyncHandler(async (req, res) => {
    try {
      const claimToDelete = await Claim.findById(req.params.id);
  
      if (!claimToDelete) {
        return res.status(404).json({ message: 'Réclamation non trouvée avec l\'ID fourni' });
      }
  
      // Supprimer la réclamation en utilisant deleteOne()
      await Claim.deleteOne({ _id: req.params.id });
  
      res.json({ message: 'Réclamation supprimée avec succès' });
    } catch (error) {
      console.error('Erreur lors de la suppression de la réclamation:', error);
      res.status(500).json({ message: 'Échec de la suppression de la réclamation', error: error.message });
    }
  });
  







// @desc Get top rated Claim
// @route GET /api/Claim/top
// @access Public
const getTopClaim = asyncHandler(async (req, res) => {
  const topClaims = await Claim.find({}).sort({ rating: -1 }).limit(3); // Use a different variable name here
  res.json(topClaims);
});

// @desc Count all Claim by company ID
// @route GET /api/Claim/count/:companyId
// @access Public
const getClaimCount = async (req, res) => {
  try {
    const count = await Claim.countDocuments({ CompanyId: req.params.companyId }); // Use a different variable name here
    res.json({ count });
  } catch (error) {
    console.error('Failed to get Claim count:', error);
    res.status(500).json({ message: 'Failed to get Claim count  ', error: error.message });
  }
};

export {
  getClaim,
  getClaimById,
  createClaim,
  updateClaim,
  deleteClaim,
  getTopClaim,
  getClaimCount,
};
