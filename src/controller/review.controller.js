const reviewService = require("../services/review.service"); // Corrected the typo in the service name

const createReview = async (req, res) => {
  const user = req.user;
  try {
    const review = await reviewService.createReview(req.body, user);
    return res.status(201).send(review);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getAllReview = async (req, res) => {
  const productId = req.params.productId;
  try {
    const review = await reviewService.getAllReviews(productId);
    return res.status(201).send(review);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createReview,
  getAllReview,
};
