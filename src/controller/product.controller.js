const productService = require("../services/product.service");

const createProduct = async (req, res) => {
  try {
    console.log(req.body);
    const product = await productService.createProduct(req.body);
    return res.status(201).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
    const productId = req.params.id;
  try {

    const product = await productService.deleteProduct(productId);
    return res.status(200).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
    const productId = req.params.id;
  try {

    const product = await productService.updateProduct(productId,req.body);
    return res.status(200).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const findProductById = async (req, res) => {
    const productId = req.params.id;
  try {

    const product = await productService.findProductById(productId);
    return res.status(200).send(product);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts(req);
    return res.status(200).send(products);
  } catch (error) {
    console.log(error)
    return res.status(500).send({ error: error.message });
  }
};


const createMultipleProduct = async (req, res) => {
    // const productId = req.params.id;
  try {

    const product = await productService.createMultipleProduct(req.body);
    return res.status(200).send({message:"products created successfully"});
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  createMultipleProduct,
  findProductById
};
