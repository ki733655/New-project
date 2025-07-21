const Attendance = require("../../models/attendance");

const dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


const getBarForAdminDashboard = async (req, res) => {
  try {
    const today = new Date();
    const data = [];

    for (let i = 6; i >= 0; i--) {
      const current = new Date();
      current.setDate(today.getDate() - i);
      const dayOfWeek = current.getDay();

      //  skip weekends
      if (dayOfWeek === 0 || dayOfWeek === 6) continue;

      const startOfDay = new Date(current.setHours(0, 0, 0, 0));
      const endOfDay = new Date(current.setHours(23, 59, 59, 999));

      const records = await Attendance.find({
        date: { $gte: startOfDay, $lte: endOfDay },
      });

      let present = 0;
      let absent = 0;

      records.forEach((rec) => {
        if (rec.status === "Present") present++;
        else if (rec.status === "Absent") absent++;
      });

      data.push({
        day: dayMap[dayOfWeek],
        Present: present,
        Absent: absent,
      });
    }

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {getBarForAdminDashboard};
