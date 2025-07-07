const express = require("express");
const router = express.Router();
const { markAttendance, getTodayAttendance, getAllAttendance, } = require("../../controllers/attendanceController");

router.post("/mark", markAttendance);
router.get("/today/:userId", getTodayAttendance);
router.get("/all", getAllAttendance);

module.exports = router;
