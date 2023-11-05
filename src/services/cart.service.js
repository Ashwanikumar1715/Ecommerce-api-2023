const Cart = require("../models/cart.model");
const CartItem = require("../models/cartItem.model");
const Product = require("../models/product.model");

async function createCart(user) {
  try {
    const cart = new Cart({ user });

    const createdCart = await cart.save();

    return createdCart;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function findUserCart(userId) {
  console.log(userId);
  try {
    let cart = await Cart.findOne({ user: userId });
    console.log(cart);
    let cartItems = await CartItem.find({ cart: cart._id }).populate("product");
    cart.cartitems = cartItems;
    let totalPrice = 0;
    let totalDiscountedPrice = 0;
    let totalItem = 0;
    for (let cartItem of cart.cartitems) {
      totalPrice += cartItem.price;
      totalDiscountedPrice += cartItem.discountedPrice;
      totalItem += cartItem.quantity;
    }

    cart.totalPrice = totalPrice;
    cart.totalItem = totalItem;
    cart.discounte = totalPrice - totalDiscountedPrice;

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function addCartItem(userId, req) {
  try {
    const cart = await Cart.findOne({ user: userId });
    const product = await Product.findById(req.productId);

    if (!cart.cartItems) {
      // Initialize cartItems as an empty array if it's not defined
      cart.cartItems = [];
    }

    const isPresent = await CartItem.findOne({
      cart: cart._id,
      product: product._id,
      userId,
    });

    if (!isPresent) {
      const cartItem = new CartItem({
        product: product._id,
        cart: cart._id,
        quantity: 1,
        userId,
        price: product.price,
        size: req.size,
        discountedPrice: product.discountedPrice,
      });

      const createCartItem = await cartItem.save();
      console.log(createCartItem);
       cart.cartItems.push(createCartItem);
      await cart.save();
      console.log(cart)
      
      return "Item added to cart";
    } else {
      return "Item is already in the cart";
    }
  } catch (error) {
    throw new Error(error.message);
  }
}


module.exports = { createCart, findUserCart, addCartItem };
