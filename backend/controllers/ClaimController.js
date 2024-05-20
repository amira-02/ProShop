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

// @desc Fetch Claims by user ID
// @route GET /api/claim/user/:userId
// @access Public
const getClaimByUserId = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT || 10; // Default to 10 if not set
  const page = Number(req.query.pageNumber) || 1;

  const count = await Claim.countDocuments({ user: req.params.userId });
  const claims = await Claim.find({ user: req.params.userId })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ claims, page, pages: Math.ceil(count / pageSize), count });
});



const getCompanyIdByClaimId = async (claimId) => {
  try {
    // Récupérer les détails du claim en fonction de l'ID du claim
    const claim = await Claim.findById(claimId);
    console.log('Claim:', claim);

    // Vérifier si le claim existe
    if (!claim) {
      throw new Error('Claim not found');
    }

    // Récupérer l'orderId du claim
    const orderId = claim.Order; // Assurez-vous que cela correspond bien au champ dans votre modèle Claim
    console.log('Order ID:', orderId);

    // Vérifier si l'orderId est présent
    if (!orderId) {
      throw new Error('Order ID not found in claim');
    }

    // Récupérer les détails de la commande en fonction de l'orderId
    const order = await Order.findById(orderId);
    console.log('Order:', order);

    // Vérifier si la commande existe
    if (!order) {
      throw new Error('Order not found');
    }

    // Trouver l'élément de commande contenant le policyId
    const orderItemWithPolicy = order.orderItems.find(item => item.policy);
    console.log('Order Item with Policy:', orderItemWithPolicy);

    // Vérifier si l'élément de commande avec le policyId a été trouvé
    if (!orderItemWithPolicy) {
      throw new Error('No order item with policy found');
    }

    // Récupérer le policyId
    const policyId = orderItemWithPolicy.policy;
    console.log('Policy ID:', policyId);

    // Vérifier si le policyId est présent
    if (!policyId) {
      throw new Error('Policy ID not found in order item');
    }

    // Récupérer les détails de la politique en fonction du policyId
    const policy = await Policy.findById(policyId);
    console.log('Policy:', policy);

    // Vérifier si la politique existe
    if (!policy) {
      throw new Error('Policy not found');
    }

    // Récupérer le companyId de la politique
    const companyId = policy.CompanyId;
    console.log('Company ID:', companyId);

    // Vérifier si le companyId est présent
    if (!companyId) {
      throw new Error('Company ID not found in policy');
    }

    // Retourner le companyId
    return companyId;
  } catch (error) {
    console.error('Error in getting companyId by claimId:', error);
    throw new Error('Failed to get companyId by claimId');
  }
};








// @desc Create a Claim
// @route POST /api/claims
const createClaim = asyncHandler(async (req, res) => {
  const { Order, indexProduct, description } = req.body; // Changed variable names to camelCase

  try {
    const newClaim = new Claim({
      Order,
      indexProduct,
      description,
      status: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const createdClaim = await newClaim.save();
    res.status(201).json({ message: 'Claim created', claim: createdClaim });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create the claim', error: error.message });
  }
});



// // @desc Create a Claim
// // @route POST /api/claims

// const createClaim = asyncHandler(async (req, res) => {
//     const { Repairer, Order, indexProduct, description } = req.body;
  
//     try {
//       // Créer une nouvelle réclamation avec les données fournies
//       const newClaim = new Claim({ // Use a different variable name here
//         Repairer,
//         Order,
//         indexProduct,
//         description,
//         status: 'Pending', // Par défaut, le statut est 'Pending'
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       });
  
//       const createdClaim = await newClaim.save(); // Use a different variable name here
  
//       res.status(201).json({ message: 'Claim created', claim: createdClaim });
//     } catch (error) {
//       res.status(500).json({ message: 'Échec de la création de la réclamation', error: error.message });
//     }
//   });

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
  getCompanyIdByClaimId,
  getClaimByUserId,
  getClaim,
  getClaimById,
  createClaim,
  updateClaim,
  deleteClaim,
  getTopClaim,
  getClaimCount,
};
