const express = require("express");
const router = express.Router();
const { markAttendance, getTodayAttendance, getAllAttendance, } = require("../../controllers/attendanceController");
const { authenticate } = require("../../middleware/authMiddleware")

router.post("/mark", authenticate,  markAttendance);
router.get("/today", authenticate,  getTodayAttendance);
router.get("/all", getAllAttendance);

module.exports = router;
