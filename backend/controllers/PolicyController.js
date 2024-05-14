import asyncHandler from '../middleware/asyncHandler.js';
import Policy from '../models/PolicyModel.js';

// @desc Fetch all Policy
// @route GET /api/Policy
// @access Public
const getPolicy = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {};

  const count = await Policy.countDocuments({ ...keyword });
  const policies = await Policy.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1));

  res.json({ policies, page, pages: Math.ceil(count / pageSize), count });
});

// @desc Fetch single Policy
// @route GET /api/Policy/:id
// @access Public
const getPolicyById = asyncHandler(async (req, res) => {
  const policy = await Policy.findById(req.params.id);
  if (!policy) {
    res.status(404).json({ message: 'Policy not found with the provided ID' });
    return;
  }
  res.json(policy);
});

// @desc Fetch Policies by Company ID
// @route GET /api/Policy/company/:companyId
// @access Public
const getPolicyByCompanyId = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Policy.countDocuments({ CompanyId: req.params.companyId });
  const policies = await Policy.find({ CompanyId: req.params.companyId }).limit(pageSize).skip(pageSize * (page - 1));

  res.json({ policies, page, pages: Math.ceil(count / pageSize), count });
});

// @desc Fetch Policies by Type where EndDate hasn't occurred yet
// @route GET /api/Policy/type/:type
// @access Public
const getPolicyByType = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  const count = await Policy.countDocuments({ type: req.params.type, EndDate: { $gte: new Date() } });
  const policies = await Policy.find({ type: req.params.type, EndDate: { $gte: new Date() } })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ policies, page, pages: Math.ceil(count / pageSize), count });
});


// @desc Create a Policy
// @route POST /api/Policy
// @access Private/Admin
const createPolicy = asyncHandler(async (req, res) => {
  try {
    const policy = new Policy({
      CompanyId: req.user._id,
      name: "Sample Policy",
      price: 100,
      EndDate: "2024-12-31",
      type: "Health",
      terms: "Sample terms and conditions"
    });

    const createdPolicy = await policy.save();

    res.status(201).json({ message: 'Policy created successfully', policy: createdPolicy });
  } catch (error) {
    res.status(500).json({ message: 'Policy creation failed', error: error.message });
  }
});

// @desc    Update a Policy
// @route   PUT /api/Policy/:id
// @access  Private/Admin
const updatePolicy = asyncHandler(async (req, res) => {
  const { CompanyId, name, price, EndDate, type, terms } = req.body;

  // Find the policy to update by its ID
  let policy = await Policy.findById(req.params.id);

  if (!policy) {
    res.status(404).json({ message: 'Policy not found with the provided ID' });
    return;
  }

  // Update the fields of the policy
  policy = await Policy.findByIdAndUpdate(
    req.params.id,
    {
      CompanyId,
      name,
      price,
      EndDate,
      type,
      terms,
    },
    { new: true, runValidators: true }
  );

  res.json({ message: 'Policy updated', policy });
});


// @desc Delete a Policy
// @route DELETE /api/Policy/:id
// @access Private/Admin
const deletePolicy = asyncHandler(async (req, res) => {
  const policy = await Policy.findById(req.params.id);
  if (!policy) {
    res.status(404).json({ message: 'Policy not found with the provided ID' });
    return;
  }

  await Policy.deleteOne({ _id: req.params.id });
  res.json({ message: 'Policy removed' });
});

// @desc Create new review
// @route POST /api/Policy/:id/reviews
// @access Private
const createPolicyReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const policy = await Policy.findById(req.params.id);

  if (!policy) {
    res.status(404).json({ message: 'Policy not found with the provided ID' });
    return;
  }

  const alreadyReviewed = policy.reviews.find((r) => r.user.toString() === req.user._id.toString());
  if (alreadyReviewed) {
    res.status(400).json({ message: 'You have already reviewed this policy' });
    return;
  }

  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id
  };

  policy.reviews.push(review);
  policy.numReviews = policy.reviews.length;
  policy.rating = policy.reviews.reduce((acc, item) => item.rating + acc, 0) / policy.reviews.length;

  await policy.save();
  res.status(201).json({ message: 'Review added' });
});

// @desc Get top rated Policy
// @route GET /api/Policy/top
// @access Public
const getTopPolicy = asyncHandler(async (req, res) => {
  const policies = await Policy.find({}).sort({ rating: -1 }).limit(3);
  res.json(policies);
});





// @desc Count all policies by company ID
// @route GET /api/Policy/count/:companyId
// @access Public
const getPolicyCount = async (req, res) => {
  try {
    const count = await Policy.countDocuments({ CompanyId: req.params.companyId });
    res.json({ count });
  } catch (error) {
    console.error('Failed to get Policy count:', error);
    res.status(500).json({ message: 'Failed to get Policy count  ', error: error.message });
  }
};



export {
  getPolicy,
  getPolicyById,
  getPolicyByCompanyId,
  getPolicyByType,
  createPolicy,
  updatePolicy,
  deletePolicy,
  createPolicyReview,
  getTopPolicy,
  getPolicyCount,
};
