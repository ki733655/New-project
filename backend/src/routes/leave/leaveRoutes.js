const express = require("express");
const router = express.Router();

const {
  applyLeave,
  getUserLeaves,
  getAllLeaves,
  updateLeaveStatus,
} = require("../../controllers/leaveController");
const { authenticate, adminOnly } = require("../../middleware/authMiddleware");

// Normal user routes
router.post("/leave/apply", authenticate, applyLeave);
router.get("/leave/user/history", authenticate, getUserLeaves);

// Admin routes
router.get("/leave/all", authenticate, adminOnly, getAllLeaves);
router.put("/leave/:leaveId/status", authenticate, adminOnly, updateLeaveStatus);

module.exports = router;
