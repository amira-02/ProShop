import asyncHandler from '../middleware/asyncHandler.js';
import Offer from '../models/Insurance_companyModel.js';

// @desc    Fetch all Offer
// @route   GET /api/Offer
// @access  Public

const getOffer = asyncHandler(async (req, res) => {
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
    const count = await Offer.countDocuments({ ...keyword });
    const foundInsuranceCompanies = await Offer.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ Offer: foundInsuranceCompanies, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});


// @desc    Fetch single Offer
// @route   GET /api/Offer/:id
// @access  Public
const getOfferById = asyncHandler(async (req, res) => {
  const Offer = await Offer.findById(req.params.id);
  if (Offer) {
    return res.json(Offer);
  } else {
    res.status(404);
    throw new Error('Insurance Company not found');
  }
});

// @desc    Create a Offer
// @route   POST /api/Offer
// @access  Private/Admin
const createOffer = asyncHandler(async (req, res) => {
  const { name, address, email, password, contact } = req.body;

  const newOffer = new Offer({
    name:" aamaly edit ",
    address:"aouina",
    email:"aaa@gmail.com",
    password:"aaa",
    contact:"123456"
  });

  const createdOffer = await newOffer.save();
  res.status(201).json(createdOffer);
});

// @desc    Update a Offer
// @route   PUT /api/Offer/:id
// @access  Private/Admin
const updateOffer = asyncHandler(async (req, res) => {
  const { name, address, email, password, contact } = req.body;

  const Offer = await Offer.findById(req.params.id);

  if (Offer) {
    Offer.name = name;
    Offer.address = address;
    Offer.email = email;
    Offer.password = password;
    Offer.contact = contact;

    const updatedOffer = await Offer.save();
    res.json(updatedOffer);
  } else {
    res.status(404);
    throw new Error('Offer not found');
  }
});

// @desc    Delete a Offer
// @route   DELETE /api/Offer/:id
// @access  Private/Admin
const deleteOffer = asyncHandler(async (req, res) => {
  const Offer = await Offer.findById(req.params.id);

  if (Offer) {
    await Offer.deleteOne({ _id: Offer._id });
    res.json({ message: 'Insurance Company removed' });
  } else {
    res.status(404);
    throw new Error('Insurance Company not found');
  }
});


// @desc    Get top rated Offer
// @route   GET /api/Offer/top
// @access  Public
const getTopOffer = asyncHandler(async (req, res) => {
  const Offer = await Offer.find({}).sort({ rating: -1 }).limit(3);

  res.json(Offer);
});

export {
  getOffer,
  getOfferById,
  createOffer,
  updateOffer,
  deleteOffer,
  getTopOffer,
};
