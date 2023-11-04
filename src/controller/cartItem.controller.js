const cartItemService = require("../services/cartItem.service");

const updateCartItem = async (req, res) => {
  const user = req.user;
  try {
    const updatedCartItem = await cartItemService.updateCartItem(user._id, req.params.id, req.body);
    return res.status(200).send(updatedCartItem);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const removeCartItem = async (req, res) => {
  const user = req.user;
  try {
    // Assuming you have a `removeCartItem` function in your `cartItemService`
     await cartItemService.removeCartItem(user._id, req.params.id);
    return res.status(200).send({message:"cart item removed succesfully"});
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  updateCartItem,
  removeCartItem,
};
