import asyncHandler from '../middleware/asyncHandler.js';
import InsuranceCompany from '../models/Insurance_companyModel.js';

// @desc    Fetch all InsuranceCompany
// @route   GET /api/InsuranceCompany
// @access  Public

const getInsuranceCompany = asyncHandler(async (req, res) => {
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
    const count = await InsuranceCompany.countDocuments({ ...keyword });
    const foundInsuranceCompanies = await InsuranceCompany.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ InsuranceCompany: foundInsuranceCompanies, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});


// @desc    Fetch single InsuranceCompany
// @route   GET /api/InsuranceCompany/:id
// @access  Public
const getInsuranceCompanyById = asyncHandler(async (req, res) => {
  const insuranceCompany = await InsuranceCompany.findById(req.params.id);
  if (insuranceCompany) {
    return res.json(insuranceCompany);
  } else {
    res.status(404);
    throw new Error('Insurance Company not found');
  }
});

// @desc    Create a InsuranceCompany
// @route   POST /api/InsuranceCompany
// @access  Private/Admin
const createInsuranceCompany = asyncHandler(async (req, res) => {
  const { name, address, email, password, contact } = req.body;

  const newInsuranceCompany = new InsuranceCompany({
    name:" aamaly edit ",
    address:"aouina",
    email:"aaa@gmail.com",
    password:"aaa",
    contact:"123456"
  });

  const createdInsuranceCompany = await newInsuranceCompany.save();
  res.status(201).json(createdInsuranceCompany);
});

// @desc    Update a InsuranceCompany
// @route   PUT /api/InsuranceCompany/:id
// @access  Private/Admin
const updateInsuranceCompany = asyncHandler(async (req, res) => {
  const { name, address, email, password, contact } = req.body;

  const insuranceCompany = await InsuranceCompany.findById(req.params.id);

  if (insuranceCompany) {
    insuranceCompany.name = name;
    insuranceCompany.address = address;
    insuranceCompany.email = email;
    insuranceCompany.password = password;
    insuranceCompany.contact = contact;

    const updatedInsuranceCompany = await insuranceCompany.save();
    res.json(updatedInsuranceCompany);
  } else {
    res.status(404);
    throw new Error('InsuranceCompany not found');
  }
});

// @desc    Delete a InsuranceCompany
// @route   DELETE /api/InsuranceCompany/:id
// @access  Private/Admin
const deleteInsuranceCompany = asyncHandler(async (req, res) => {
  const insuranceCompany = await InsuranceCompany.findById(req.params.id);

  if (insuranceCompany) {
    await insuranceCompany.deleteOne({ _id: insuranceCompany._id });
    res.json({ message: 'Insurance Company removed' });
  } else {
    res.status(404);
    throw new Error('Insurance Company not found');
  }
});


// @desc    Get top rated InsuranceCompany
// @route   GET /api/InsuranceCompany/top
// @access  Public
const getTopInsuranceCompany = asyncHandler(async (req, res) => {
  const InsuranceCompany = await InsuranceCompany.find({}).sort({ rating: -1 }).limit(3);

  res.json(InsuranceCompany);
});

export {
  getInsuranceCompany,
  getInsuranceCompanyById,
  createInsuranceCompany,
  updateInsuranceCompany,
  deleteInsuranceCompany,
  getTopInsuranceCompany,
};