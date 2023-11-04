const Rating = require("../models/rating.model.js"); // corrected the filename
const productService = require("../services/product.service.js");

async function createRating(req, user) {
  try {
    const product = await productService.findProductById(req.productId); // corrected the variable name

    const rating = new Rating({
      product: product._id,
      user: user._id,
      rating: req.rating,
      createdAt: new Date(),
    });

    return await rating.save();
  } catch (error) {
    // Handle errors here
    throw error;
  }
}

async function getProductRating(productId) {
  try {
    const ratings = await Rating.find({ product: productId });
    return ratings;
  } catch (error) {
    // Handle errors here
    throw error;
  }
}

module.exports = {
  createRating,
  getProductRating
};
