import asyncHandler from '../middleware/asyncHandler.js';
import Shop from '../models/ShopModel.js';

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

  try {
    const count = await Shop.countDocuments({ ...keyword });
    const foundShops = await Shop.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    console.log('Found Shops:', foundShops); // Ajoutez cette ligne pour voir les shops trouvés
    res.json({ shops: foundShops, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    console.error('Error in getShops:', error); // Ajoutez cette ligne pour voir les erreurs
    res.status(500).json({ message: 'Server Error' });
  }
});

const getShopById = asyncHandler(async (req, res) => {
  try {
    const shopInstance = await Shop.findById(req.params.id);
    console.log('Shop by ID:', shopInstance); // Ajoutez cette ligne pour voir le shop trouvé
    if (shopInstance) {
      return res.json(shopInstance);
    } else {
      res.status(404);
      throw new Error('Shop not found');
    }
  } catch (error) {
    console.error('Error in getShopById:', error); // Ajoutez cette ligne pour voir les erreurs
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Create a Shop
// @route   POST /api/Shop
// @access  Private/Admin
const createShop = asyncHandler(async (req, res) => {
  const { name, address, email, password, contact } = req.body;

  const newShop = new Shop({
    name,
    address,
    email,
    password,
    contact
  });

  const createdShop = await newShop.save();
  res.status(201).json(createdShop);
});

// @desc    Update a Shop
// @route   PUT /api/Shop/:id
// @access  Private/Admin
const updateShop = asyncHandler(async (req, res) => {
  const { name, address, email, password, contact } = req.body;

  const shopInstance = await Shop.findById(req.params.id);

  if (shopInstance) {
    shopInstance.name = name;
    shopInstance.address = address;
    shopInstance.email = email;
    shopInstance.password = password;
    shopInstance.contact = contact;

    const updatedShop = await shopInstance.save();
    res.json(updatedShop);
  } else {
    res.status(404);
    throw new Error('Shop not found');
  }
});

// @desc    Delete a Shop
// @route   DELETE /api/Shop/:id
// @access  Private/Admin
const deleteShop = asyncHandler(async (req, res) => {
  const shopInstance = await Shop.findById(req.params.id);

  if (shopInstance) {
    await shopInstance.deleteOne({ _id: shopInstance._id });
    res.json({ message: 'Shop removed' });
  } else {
    res.status(404);
    throw new Error('Shop not found');
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
