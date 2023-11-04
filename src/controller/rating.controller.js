const reviewService = require("../services/rating.service"); // Corrected the typo in the service name

const createRating = async (req, res) => {
  const user = req.user;
  try {
    const rating = await reviewService.createRating(req.body, user);
    return res.status(201).send(rating);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getAllRatings = async (req, res) => {
    const productId=req.params.productId;
    try {
      const rating = await reviewService.getAllRatings(productId);
      return res.status(201).send(rating);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  };

module.exports = {
 createRating,
 getAllRatings
};
