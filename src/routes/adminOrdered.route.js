express=require("express");
const router=express.Router();

const orderController=require("../controller/adminOrder.controller");

const adminauthenticate=require("../middleware/adminauthenticate")

router.get("/",adminauthenticate,orderController.getAllOrders);
router.put("/:orderId/confirmed",adminauthenticate,orderController.confirmedOrders)
router.put("/:orderId/ship",adminauthenticate,orderController.shipOrders)
router.put("/:orderId/deliver",adminauthenticate,orderController.deleteOrders)
router.put("/:orderId/cancel",adminauthenticate,orderController.cancelledOrders)
router.delete("/:orderId/delete",adminauthenticate,orderController.deleteOrders)


module.exports=router;