const express = require("express");
const orderController = require("../controllers/orderController");
const auth = require("../middlewares/auth");
const router = express.Router();

router.use(auth.protect);

router
  .route("/")
  .get(auth.restrictTo("admin"), orderController.getAllOrders)
  .post(orderController.createOrder);

router.get("/me", orderController.getMyOrders);

router
  .route("/:id")
  .get(orderController.getOrder)
  .patch(auth.restrictTo("admin"), orderController.updateOrder)
  .delete(auth.restrictTo("admin"), orderController.deleteOrder);

module.exports = router;
