const Review = require("../models/review.model.js");
const productService = require("../services/product.service.js");

async function createReview(reqData, user) {
  try {
    const product = await productService.findProductById(reqData.productId);

    const review = new Review({
      user: user._id,
      product: product._id,
      review: reqData.review,
      createdAt: new Date(),
    });

    await product.save();
    await review.save();

    return review;
  } catch (error) {
    // Handle errors here
    throw error;
  }
}

async function getAllReviews(productId) {
  try {
    const reviews = await Review.find({ product: productId }).populate("user");
    return reviews;
  } catch (error) {
    // Handle errors here
    throw error;
  }
}

module.exports = {
  createReview,
  getAllReviews,
};
