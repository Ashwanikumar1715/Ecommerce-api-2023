const Address = require("../models/address.model");
const Order = require("../models/order.model");
const cartService = require("../services/cart.service");

async function createOrder(user, shipAddress) {
  let address;

  if (shipAddress._id) {
    let existAddress = await Address.findById(shipAddress._id);
    address = existAddress;
  } else {
    address = new Address(shipAddress);
    address.user = user;
    await address.save();

    user.addresses.push(address);
    await user.save();
  }

  const cart = await cartService.findUserCart(user._id);
  const orderItems = [];

  for (const item of cart.cartitems) {
    const orderItem = new orderItems({
      price: item.price,
      product: item.product,
      quantity: item.size,
      size: item.size,
      userId: item.userId,
      discountedPrice: item.discountedPrice,
    });

    const createdOrderItem = await orderItem.save();
    orderItem.push(createdOrderItem);
  }

  const createOrder = new Order({
    user,
    orderItems,
    totalPrice: cart.totalPrice,
    totalDiscountedPrice: cart.totalDiscountedPrice,
    discounte: cart.discounte,
    totalItem: cart.totalItem,
    shipAddress: address,
  });

  const saveOrder = await createOrder.save();
  return saveOrder;
}

async function placeOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "PLACED";
  order.paymenDetails.status = "Completed";

  return await order.save();
}

async function confirmedOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "Confirm";

  return await order.save();
}

async function shipOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "Shipped";

  return await order.save();
}

async function deliverOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "Devivered";

  return await order.save();
}

async function cancelledOrder(orderId) {
  const order = await findOrderById(orderId);

  order.orderStatus = "Cancelled";

  return await order.save();
}

async function findOrderById(orderId) {
  const order = await Order.findById(orderId)
    .populate("user")
    .populate({ path: "orderItems", populate: { path: "product" } })
    .populate("shippingAddress");

  return order;
}

async function userOrderHistory(userId) {
  try {
    const orders = await Order.find({ user: userId, orderStatus: "Placed" })
      .populate({ path: "orderItems", populate: { path: "product" } })
      .lean();

    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllOrders() {
  return await Order.find()
    .populate({ path: "orderItems", populate: { path: "product" } })
    .lean();
}

async function deleteOrder(orderId) {
  const order = await findOrderById(orderId);
  await Order.findByIdAndDelete(order._id);
}

module.exports = {
  createOrder,
  placeOrder,
  confirmedOrder,
  shipOrder,
  deliverOrder,
  cancelledOrder,
  findOrderById,
  userOrderHistory,
  getAllOrders,
  deleteOrder,
};
