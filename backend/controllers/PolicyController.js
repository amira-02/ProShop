import asyncHandler from '../middleware/asyncHandler.js';
import Policy from '../models/PolicyModel.js';
// @desc    Fetch all Policy
// @route   GET /api/Policy
// @access  Public
const getPolicy = asyncHandler(async (req, res) => {
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

  const count = await Policy.countDocuments({ ...keyword });
  const policies = await Policy.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ policies, page, pages: Math.ceil(count / pageSize), count });
});

// @desc    Fetch single Policy
// @route   GET /api/Policy/:id
// @access  Public
const getPolicyById = asyncHandler(async (req, res) => {
  const policy = await Policy.findById(req.params.id);

  if (!policy) {
    res.status(404).json({ message: 'Policy not found with the provided ID' });
    return;
  }

  res.json(policy);
});

// @desc    Create a Policy
// @route   POST /api/Policy
// @access  Private/Admin
const createPolicy = asyncHandler(async (req, res) => {
  const { CompanyId, name, price, EndDate, type, terms } = req.body;

  // Validate request body
  if (!name || !price || !EndDate || !type || !terms) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  // Create a new policy
  const policy = new Policy({
    CompanyId,
    name,
    price,
    EndDate,
    type,
    terms,
    // countInStock,
  });

  // Save the new policy to the database
  const createdPolicy = await policy.save();

  // Respond with the newly created policy
  res.status(201).json(createdPolicy);
});

// @desc    Update a Policy
// @route   PUT /api/Policy/:id
// @access  Private/Admin
const updatePolicy = asyncHandler(async (req, res) => {
  const { name, price, startDate, type, terms, countInStock } = req.body;

  // Find the policy to update by its ID
  const policy = await Policy.findById(req.params.id);

  if (!policy) {
    res.status(404).json({ message: 'Policy not found with the provided ID' });
    return;
  }

  // Update the fields of the policy
  policy.name = name;
  policy.price = price;
  policy.startDate = startDate;
  policy.type = type;
  policy.terms = terms;
  policy.countInStock = countInStock;

  // Save the changes to the database
  await policy.save();

  res.json({ message: 'Policy updated', policy });
});

// @desc    Delete a Policy
// @route   DELETE /api/Policy/:id
// @access  Private/Admin
const deletePolicy = asyncHandler(async (req, res) => {
  // Find the policy to delete by its ID
  const policy = await Policy.findById(req.params.id);

  if (!policy) {
    res.status(404).json({ message: 'Policy not found with the provided ID' });
    return;
  }

  // Delete the policy from the database
  await Policy.deleteOne({ _id: req.params.id });

  res.json({ message: 'Policy removed' });
});

// @desc    Create new review
// @route   POST /api/Policy/:id/reviews
// @access  Private
const createPolicyReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const policy = await Policy.findById(req.params.id);

  if (!policy) {
    res.status(404).json({ message: 'Policy not found with the provided ID' });
    return;
  }

  // Check if the user has already reviewed this policy
  const alreadyReviewed = policy.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    res.status(400).json({ message: 'You have already reviewed this policy' });
    return;
  }

  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };

  // Add the new review to the policy
  policy.reviews.push(review);
  policy.numReviews = policy.reviews.length;
  policy.rating =
    policy.reviews.reduce((acc, item) => item.rating + acc, 0) /
    policy.reviews.length;

  await policy.save();
  res.status(201).json({ message: 'Review added' });
});

// @desc    Get top rated Policy
// @route   GET /api/Policy/top
// @access  Public
const getTopPolicy = asyncHandler(async (req, res) => {
  const policies = await Policy.find({}).sort({ rating: -1 }).limit(3);

  res.json(policies);
});

// @desc    Count all Policy
// @route   GET /api/Policy/count
// @access  Public
const getPolicyCount = asyncHandler(async (req, res) => {
  const count = await Policy.countDocuments();
  res.json({ count });
});

export {
  getPolicy,
  getPolicyById,
  createPolicy,
  updatePolicy,
  deletePolicy,
  createPolicyReview,
  getTopPolicy,
  getPolicyCount,
};
