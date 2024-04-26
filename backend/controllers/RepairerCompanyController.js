import asyncHandler from '../middleware/asyncHandler.js';
import RepairerCompany from '../models/RepairerCompanyModel.js';

// @desc    Fetch all RepairerCompany
// @route   GET /api/RepairerCompany
// @access  Public

// @desc    Fetch all RepairerCompany
// @route   GET /api/RepairerCompany
// @access  Public
const getRepairerCompany = asyncHandler(async (req, res) => {
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
    const count = await RepairerCompany.countDocuments({ ...keyword });
    const foundRepairerCompanies = await RepairerCompany.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ RepairerCompany: foundRepairerCompanies, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    console.error('Error fetching repairer companies:', error);
    res.status(500).json({ message: 'Failed to fetch repairer companies' });
  }
});

// @desc    Fetch single RepairerCompany by ID
// @route   GET /api/RepairerCompany/:id
// @access  Public
const getRepairerCompanyById = asyncHandler(async (req, res) => {
  const repairerCompanyId = req.params.id;

  try {
    const repairerCompany = await RepairerCompany.findById(repairerCompanyId);

    if (repairerCompany) {
      res.json(repairerCompany);
    } else {
      res.status(404).json({ message: 'Repairer Company not found' });
    }
  } catch (error) {
    console.error('Error fetching repairer company by ID:', error);
    res.status(500).json({ message: 'Failed to fetch repairer company' });
  }
});




// @desc    Create a RepairerCompany
// @route   POST /api/RepairerCompany
// @access  Private/Admin
const createRepairerCompany = asyncHandler(async (req, res) => {
  const { name, address, email, password, contact } = req.body;

  const newRepairerCompany = new RepairerCompany({
    name:" repairer ",
    address:"aouina",
    email:"aaa@gmail.com",
    password:"aaa",
    contact:"123456"
  });

  const createdRepairerCompany = await newRepairerCompany.save();
  res.status(201).json(createdRepairerCompany);
});

// @desc    Update a RepairerCompany
// @route   PUT /api/RepairerCompany/:id
// @access  Private/Admin
const updateRepairerCompany = asyncHandler(async (req, res) => {
  const { name, address, email, password, contact } = req.body;

  // Fetch the RepairerCompany instance from the database
  const repairerCompany = await RepairerCompany.findById(req.params.id);

  if (repairerCompany) {
    // Update the properties of the fetched repairerCompany instance
    repairerCompany.name = name;
    repairerCompany.address = address;
    repairerCompany.email = email;
    repairerCompany.password = password;
    repairerCompany.contact = contact;

    // Save the updated repairerCompany instance
    const updatedRepairerCompany = await repairerCompany.save();
    res.json(updatedRepairerCompany);
  } else {
    res.status(404);
    throw new Error('Repairer Company not found');
  }
});


// @desc    Delete a RepairerCompany
// @route   DELETE /api/RepairerCompany/:id
// @access  Private/Admin
const deleteRepairerCompany = asyncHandler(async (req, res) => {
  const repairerCompanyId = req.params.id;

  try {
    const result = await RepairerCompany.deleteOne({ _id: repairerCompanyId });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Repairer Company not found' });
      return;
    }

    res.json({ message: 'Repairer Company removed' });
  } catch (error) {
    console.error('Error deleting repairer company:', error);
    res.status(500).json({ message: 'Failed to delete repairer company' });
  }
});

  
// @desc    Get top rated RepairerCompany
// @route   GET /api/RepairerCompany/top
// @access  Public
const getTopRepairerCompany = asyncHandler(async (req, res) => {
  const RepairerCompany = await RepairerCompany.find({}).sort({ rating: -1 }).limit(3);

  res.json(RepairerCompany);
});

export {
  getRepairerCompany,
  getRepairerCompanyById,
  createRepairerCompany,
  updateRepairerCompany,
  deleteRepairerCompany,
  getTopRepairerCompany,
};
