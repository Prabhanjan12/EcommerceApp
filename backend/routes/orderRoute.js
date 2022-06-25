const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  deleteOrder,
  updateOrders,
} = require("../controllers/orderController");
const router = express.Router();

const { isAuthUser, authorizeRoles } = require("../middleware/authentication");

router.route("/order/new").post(isAuthUser, newOrder);

router.route("/order/:id").get(isAuthUser, getSingleOrder);

router.route("/orders/me").get(isAuthUser, myOrders);

router
  .route("/admin/orders")
  .get(isAuthUser, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthUser, authorizeRoles("admin"), updateOrders)
  .delete(isAuthUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
