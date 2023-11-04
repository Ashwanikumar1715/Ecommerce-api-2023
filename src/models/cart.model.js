const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true,
  },
  cartitems: {
    type: mongoose.Schema.ObjectId,
    ref: "cartitems",
    required: "true",
  },

  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalItem: {
    type: Number,
    required: true,
    default: 0,
  },
  totalDiscountedPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  discounte: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Cart = mongoose.model("cart", CartSchema);
module.exports = Cart;
