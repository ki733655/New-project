const Attendance = require("../../models/attendance");
const User = require("../../models/user");

const getStatsForAdminDashboard = async(req, res) => {
try {
    const today = new Date().toISOString().split("T")[0];

    const totalEmployees = await User.countDocuments();

    const todayRecords = await Attendance.find({ date: today });

    const present = todayRecords.filter((r) => r.status === "Present").length;
    const absent = todayRecords.filter((r) => r.status === "Absent").length;
    const onLeave = todayRecords.filter((r) => r.status === "Leave").length;

    res.json({ totalEmployees, present, absent, onLeave });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ error: "Server Error" });
  }
}

module.exports = {getStatsForAdminDashboard};
