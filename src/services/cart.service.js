const Cart=require("../models/cart.model");
const CartItem = require("../models/cartItem.model");
const Product = require("../models/product.model");


async function createCart(user){
  try {
    console.log(user);
    const cart=new Cart({user});
    console.log(cart);
    const createdCart=await cart.save();
    console.log(createdCart)
    return createdCart;

  } catch (error) {
    throw new Error(error.message);
  }
}

async function findUserCart(userId){
try {
  let cart=await Cart.findOne({user:userId});
  let cartItems=await CartItem.find({cart:cart._id}).populate("product");
  cart.cartitems=cartItems;
  let totalPrice=0;
  let totalDiscountedPrice=0;
  let totalItem=0;
  for(let cartItem of cart.cartitems ){
    totalPrice+=cartItem.price;
    totalDiscountedPrice+=cartItem.discountedPrice;
    totalItem+=cartItem.quantity;

  }

  cart.totalPrice=totalPrice;
  cart.totalItem=totalItem;
  cart.discounte=totalPrice-totalDiscountedPrice;

  return cart;


} catch (error) {
  throw new Error(error.message);
}
}

async function addCartItem(userId,req){
  try {
    const cart=await Cart.findOne({user:userId});
    const product=await Product.findById(req.productId);

    const isPresent=await CartItem.findOne({cart:cart._id,product:product._id,userId});

    if(!isPresent){
      const cartItem=new CartItem({
        product:product._id,
        cart:cart._id,
        quantity:1,
        userId,
        price:product.price,
        size:req.size,
        discountedPrice:product.discountedPrice,
      })

      const createCartItem=await cartItem.save();
      cart.cartItems.push(createCartItem);
      await cart.save();
      return "Item added to cart";
    }
  } catch (error) {
    throw new Error(error.message);
  }
}



module.exports={createCart, findUserCart,addCartItem};