const express = require("express");
const router = express.Router();
//  controllers
const { markAttendance, getTodayUserAttendance, getAllUserAttendance, getTodayAttendanceCount, getUserAttendanceRecords, getAttendanceSummary, getMonthlyAttendance } = require("../../controllers/attendanceController");

const {getStatsForAdminDashboard} = require("../../controllers/adminDashboard/stats");
const {getBarForAdminDashboard} = require("../../controllers/adminDashboard/barGraph");

// middleware 
const { authenticate, adminOnly } = require("../../middleware/authMiddleware")

// USER ROUTES
// for marking attendance
router.post("/attendance/mark", authenticate,  markAttendance); 
// for getting user and checking is its marked or not
router.get("/attendance/today", authenticate,  getTodayUserAttendance);
// for getting all the records of each user
router.get("/attendance/records", authenticate, getUserAttendanceRecords);
// fro getting attendace to show in pie chart
router.get("/attendance/summary", authenticate, getAttendanceSummary);
// for getting the attendace to show in the clalendar
router.get("/attendance/month/calendar", authenticate, getMonthlyAttendance);

// ADMIN TO VIEW
// get stats
router.get("/dashboard/admin/stats",authenticate, adminOnly,  getStatsForAdminDashboard  );
// get bar graph data
router.get("/dashboard/admin/barGraph",authenticate, adminOnly, getBarForAdminDashboard);

router.get("/attendance/all", authenticate, adminOnly, getAllUserAttendance);
router.get("/attendance/today/count", authenticate , adminOnly, getTodayAttendanceCount);

module.exports = router;        
