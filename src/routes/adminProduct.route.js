express = require("express");
const router = express.Router();

const productController = require("../controller/product.controller");
const adminauthenticate = require("../middleware/adminauthenticate");
const authenticate = require("../middleware/authenticate");

router.post("/", adminauthenticate, productController.createProduct);
router.post(
  "/creates",
  adminauthenticate,
  productController.createMultipleProduct
);
router.delete("/:id", adminauthenticate, productController.deleteProduct);
router.put("/:id", adminauthenticate, productController.updateProduct);

module.exports = router;
