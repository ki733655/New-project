const express = require("express");
const router = express.Router();
const { markAttendance, getTodayUserAttendance, getAllUserAttendance, getTodayAttendanceCount, getUserAttendanceRecords } = require("../../controllers/attendanceController");
const { authenticate, adminOnly } = require("../../middleware/authMiddleware")

// USER ROUTES
// for marking attendance
router.post("/attendance/mark", authenticate,  markAttendance); 
// for getting user and checking is its marked or not
router.get("/attendance/today", authenticate,  getTodayUserAttendance);
// for getting all the records of each user
router.get("/attendance/records", authenticate, getUserAttendanceRecords);

// ADMIN TO VIEW
router.get("/attendance/all", authenticate, adminOnly, getAllUserAttendance);
router.get("/attendance/today/count", authenticate , adminOnly, getTodayAttendanceCount);

module.exports = router;        
