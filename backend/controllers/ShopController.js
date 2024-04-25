import asyncHandler from '../middleware/asyncHandler.js';
import Shop from '../models/ShopModel.js';
import mongoose from 'mongoose';

// @desc    Fetch all Shops
// @route   GET /api/Shop
// @access  Public

const getShops = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  // try {
    const count = await Shop.countDocuments({ ...keyword });
    const foundShops = await Shop.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    console.log('Found Shops:', foundShops); // Ajoutez cette ligne pour voir les shops trouvés
    res.json({ shops: foundShops, page, pages: Math.ceil(count / pageSize) });
  // } catch (error) {
  //   console.error('Error in getShops:', error); // Ajoutez cette ligne pour voir les erreurs
  //   res.status(500).json({ message: 'Server Error' });
  // }
});

const getShopById = asyncHandler(async (req, res) => {
  // try {
  //   if (!isValidObjectId(req.params.id)) {
  //     res.status(400).json({ message: 'Invalid Shop ID' });
  //     return;
  //   }

    const shopInstance = await Shop.findById(req.params.id);
    console.log('Shop by ID:', shopInstance);
    if (shopInstance) {
      return res.json(shopInstance);
    } else {
      res.status(404).json({ message: 'Shop not found' });
    }
  // } catch (error) {
  //   console.error('Error in getShopById:', error);
  //   res.status(500).json({ message: 'Server Error' });
  // }
});


// @desc    Create a Shop
// @route   POST /api/Shop
// @access  Private/Admin
const createShop = asyncHandler(async (req, res) => {
  const { name, address, email, password, contact } = req.body;

  const newShop = new Shop({
    name:" shoop  ",
    address:"aouina",
    email:"aaa@gmail.com",
    password:"aaa",
    contact:"123456"
  });

  const createdShop = await newShop.save();
  res.status(201).json(createdShop);
});

// @desc    Update a Shop
// @route   PUT /api/Shop/:id
// @access  Private/Admin

// const updateShop = asyncHandler(async (req, res) => {
//   // Récupérer l'ID du shop à mettre à jour depuis les paramètres de la requête
//   const shopId = req.params.id;

//   try {
//     // Rechercher le shop par son ID
//     let shopInstance = await Shop.findById(shopId);

//     // Vérifier si le shop existe
//     if (!shopInstance) {
//       res.status(404).json({ message: 'Shop not found' });
//       return;
//     }

//     // Mettre à jour les champs du shop avec les nouvelles données envoyées dans le corps de la requête
//     shopInstance = await Shop.findByIdAndUpdate(shopId, req.body, {
//       new: true, // Pour retourner le document mis à jour
//       runValidators: true, // Pour exécuter les validateurs de Mongoose lors de la mise à jour
//     });

//     // Envoyer une réponse JSON contenant le shop mis à jour
//     res.json({ message: 'Shop updated successfully', shop: shopInstance });
//   } catch (error) {
//     // Gérer les erreurs
//     console.error('Error updating shop:', error);
//     res.status(500).json({ message: 'Failed to update shop' });
//   }
// });
const updateShop = asyncHandler(async (req, res) => {
  // Récupérer l'ID du shop à mettre à jour depuis les paramètres de la requête
  const shopId = req.params.id;

  // Ajouter l'instruction de journalisation ici
  console.log('Shop ID :', shopId);

  try {
    // Rechercher le shop par son ID
    let shopInstance = await Shop.findById(shopId);

    // Vérifier si le shop existe
    if (!shopInstance) {
      res.status(404).json({ message: 'Shop not found' });
      return;
    }

    // Mettre à jour les champs du shop avec les nouvelles données envoyées dans le corps de la requête
    shopInstance = await Shop.findByIdAndUpdate(shopId, req.body, {
      new: true, // Pour retourner le document mis à jour
      runValidators: true, // Pour exécuter les validateurs de Mongoose lors de la mise à jour
    });

    // Envoyer une réponse JSON contenant le shop mis à jour
    res.json({ message: 'Shop updated successfully', shop: shopInstance });
  } catch (error) {
    // Gérer les erreurs
    console.error('Error updating shop:', error);
    res.status(500).json({ message: 'Failed to update shop' });
  }
});



// @desc    Delete a Shop
// @route   DELETE /api/Shop/:id
// @access  Private/Admin
const deleteShop = asyncHandler(async (req, res) => {
  // Récupérer l'ID du shop à supprimer depuis les paramètres de la requête
  const shopId = req.params.id;

  try {
    // Rechercher le shop par son ID
    const shopInstance = await Shop.findById(shopId);

    // Vérifier si le shop existe
    if (!shopInstance) {
      res.status(404).json({ message: 'Shop not found' });
      return;
    }

    // Supprimer le shop
    await shopInstance.deleteOne();

    // Envoyer une réponse JSON indiquant que le shop a été supprimé avec succès
    res.json({ message: 'Shop removed successfully' });
  } catch (error) {
    // Gérer les erreurs
    console.error('Error deleting shop:', error);
    res.status(500).json({ message: 'Failed to delete shop' });
  }
});

// @desc    Get top rated Shops
// @route   GET /api/Shop/top
// @access  Public
const getTopShops = asyncHandler(async (req, res) => {
  const topShops = await Shop.find({}).sort({ rating: -1 }).limit(3);
  res.json(topShops);
});

export {
  getShops,
  getShopById,
  createShop,
  updateShop,
  deleteShop,
  getTopShops,
};
