const orderService = require("../services/oreder.service");

// Corrected the function definition for getAllOrders
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

// Corrected the function definition for confirmedOrders
const confirmedOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.confirmedOrder(orderId); // Assuming you have a specific function for confirmed orders
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const shipOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.shipOrder(orderId); // Assuming you have a specific function for confirmed orders
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deliverOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.deliverOrder(orderId); // Assuming you have a specific function for confirmed orders
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const cancelledOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.cancelledOrder(orderId); // Assuming you have a specific function for confirmed orders
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deleteOrders = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const orders = await orderService.deleteOrder(orderId); // Assuming you have a specific function for confirmed orders
    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getAllOrders,
  confirmedOrders,
  shipOrders,
  deliverOrders,
  cancelledOrders,
  deleteOrders,
};
