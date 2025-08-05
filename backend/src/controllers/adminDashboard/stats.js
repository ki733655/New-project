const Attendance = require("../../models/attendance");
const User = require("../../models/user");
const Leave = require("../../models/leave");

const getStatsForAdminDashboard = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const todayDate = new Date(today);

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    // Get total employees
    const totalEmployees = await User.countDocuments();

    // Get today’s attendance records
    const todayRecords = await Attendance.find({
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    // Get number of present employees
    const present = todayRecords.filter((r) => r.status === "Present").length;

    // Get on-leave employees
    const leaveRecords = await Leave.find({
      status: "Approved",
      fromDate: { $lte: todayDate },
      toDate: { $gte: todayDate },
    });
    const onLeave = leaveRecords.length;

    // Infer absentees
    const absent = totalEmployees - present - onLeave;

    res.json({ totalEmployees, present, absent, onLeave });
    console.log(totalEmployees, present, absent, onLeave);
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { getStatsForAdminDashboard };
