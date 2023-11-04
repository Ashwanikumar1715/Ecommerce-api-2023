express=require("express");
const router=express.Router();

const orderController=require("../controller/order.controller");
const authenticate = require("../middleware/authenticate");

router.post("/",authenticate,orderController.createOrder);
router.post("/user",authenticate,orderController.orderHistory);
router.post("/:id",authenticate,orderController.findOrderById);

module.exports=router;