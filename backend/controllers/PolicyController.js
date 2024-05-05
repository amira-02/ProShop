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
  const Policy = await Policy.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ Policy, page, pages: Math.ceil(count / pageSize), count });
});

// @desc    Fetch single Policy
// @route   GET /api/Policy/:id
// @access  Public
const getPolicyById = asyncHandler(async (req, res) => {
  const policy = await Policy.findById(req.params.id);

  if (policy) {
    res.json(policy);
  } else {
    res.status(404);
    throw new Error('Policy not found');
  }
});

// @desc    Create a Policy
// @route   POST /api/Policy
// @access  Private/Admin
const createPolicy = asyncHandler(async (req, res) => {
  // Extrayez les champs requis de la demande
  const { name, price, startDate, type, terms, countInStock } = req.body;

  // Créez une nouvelle instance de Policy avec les données reçues
  const policy = new Policy({
    name,
    price,
    startDate,
    type,
    terms,
    countInStock,
  });

  // Enregistrez la nouvelle police dans la base de données
  const createdPolicy = await policy.save();

  // Réponse avec la nouvelle police créée
  res.status(201).json(createdPolicy);
});

// @desc    Update a Policy
// @route   PUT /api/Policy/:id
// @access  Private/Admin
const updatePolicy = asyncHandler(async (req, res) => {
  const { name, price, startDate, type, terms, countInStock } = req.body;

  // Trouvez la police à mettre à jour par son ID
  const policy = await Policy.findById(req.params.id);

  if (policy) {
    // Mettez à jour les champs de la police
    policy.name = name;
    policy.price = price;
    policy.startDate = startDate;
    policy.type = type;
    policy.terms = terms;
    policy.countInStock = countInStock;

    // Enregistrez les modifications dans la base de données
    await policy.save();

    res.json({ message: 'Policy updated', policy });
  } else {
    res.status(404);
    throw new Error('Policy not found');
  }
});

// @desc    Delete a Policy
// @route   DELETE /api/Policy/:id
// @access  Private/Admin
const deletePolicy = asyncHandler(async (req, res) => {
  // Trouvez la police à supprimer par son ID
  const policy = await Policy.findById(req.params.id);

  if (policy) {
    // Supprimez la police de la base de données
    await Policy.deleteOne({ _id: req.params.id });
    res.json({ message: 'Policy removed' });
  } else {
    res.status(404);
    throw new Error('Policy not found');
  }
});

// @desc    Create new review
// @route   POST /api/Policy/:id/reviews
// @access  Private
const createPolicyReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const Policy = await Policy.findById(req.params.id);

  if (Policy) {
    const alreadyReviewed = Policy.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Policy already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    Policy.reviews.push(review);

    Policy.numReviews = Policy.reviews.length;

    Policy.rating =
      Policy.reviews.reduce((acc, item) => item.rating + acc, 0) /
      Policy.reviews.length;

    await Policy.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Policy not found');
  }
});

// @desc    Get top rated Policy
// @route   GET /api/Policy/top
// @access  Public
const getTopPolicy = asyncHandler(async (req, res) => {
  const Policy = await Policy.find({}).sort({ rating: -1 }).limit(3);

  res.json(Policy);
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
