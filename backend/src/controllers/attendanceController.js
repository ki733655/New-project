const Attendance = require("../models/attendance");
const User = require("../models/user");
// POST /api/attendance/mark
// controllers/attendanceController.js
const markAttendance = async (req, res) => {
  try {
    const userId = req.user._id;
    const today = new Date().toISOString().split("T")[0];
    const { type } = req.body;

    let record = await Attendance.findOne({ userId, date: today });

    if (!record) {
      if (type === "checkin") {
        const newRecord = new Attendance({
          userId,
          date: today,
          checkIn: new Date().toLocaleTimeString(),
          status: "Present",
        });
        await newRecord.save();
        return res.status(201).json(newRecord);
      } else {
        return res.status(400).json({ message: "Check-in first before check-out" });
      }
    }

    if (type === "checkout" && !record.checkOut) {
      record.checkOut = new Date().toLocaleTimeString();
      await record.save();
      return res.status(200).json(record);
    }

    return res.status(400).json({ message: "Attendance already marked" });
  } catch (err) {
    console.error("Mark Attendance Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


const getTodayAttendance = async (req, res) => {
  const  userId  = req.user._id;
  const today = new Date().toISOString().split("T")[0];

  try {
    const attendance = await Attendance.findOne({ userId, date: today });
    if (!attendance) {
      return res.status(200).json({ message: "No attendance marked yet" });
    }
    res.status(200).json(attendance);
  } catch (err) {
    console.error("Error fetching today's attendance:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all attendance for a user
const getAllAttendance = async (req, res) => {
  try {
    // const records = await Attendance.find().sort({ date: -1 });
    const records = await Attendance.find()
      .populate("userId", "name email") // ONLY required fields
      .sort({ date: -1 })
      .lean(); // optional for performance

    res.status(200).json(records);
  } catch (err) {
    console.error("Error fetching all attendance:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  markAttendance,
  getTodayAttendance,
  getAllAttendance,
};
