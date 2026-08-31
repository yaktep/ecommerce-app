const express = require("express");
const {
  addOrderItems,
  getOrderById,
  getUserOrders,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addOrderItems);
router.get("/:id", protect, getOrderById);
router.get("/myorders", protect, getUserOrders);

module.exports = router;
