express=require("express");
const router=express.Router();

const orderController=require("../controller/adminOrder.controller");
const authenticate = require("../middleware/authenticate");

router.get("/",authenticate,orderController.getAllOrders);
router.put("/:orderId/confirmed",authenticate,orderController.confirmedOrders)
router.put("/:orderId/ship",authenticate,orderController.shipOrders)
router.put("/:orderId/deliver",authenticate,orderController.deleteOrders)
router.put("/:orderId/cancel",authenticate,orderController.cancelledOrders)
router.delete("/:orderId/delete",authenticate,orderController.deleteOrders)


module.exports=router;