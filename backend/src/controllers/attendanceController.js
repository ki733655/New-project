const Attendance = require("../models/attendance");
const Leave = require("../models/leave");
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
        return res
          .status(400)
          .json({ message: "Check-in first before check-out" });
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

// get user attendace for current day
const getTodayUserAttendance = async (req, res) => {
  const userId = req.user._id;
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
const getAllUserAttendance = async (req, res) => {
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

// get just todays count of all the user attendance
const getTodayAttendanceCount = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const count = await Attendance.countDocuments({ date: today });

    res.status(200).json({ count });
  } catch (err) {
    console.error("Error getting today attendance count:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserAttendanceRecords = async (req, res) => {
  try {
    const records = await Attendance.find({ userId: req.user._id }).sort({
      date: -1,
    });
    res.json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// this contoller is for pie char
const getAttendanceSummary = async (req, res) => {
  try {
    const userId = req.user._id;

    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const records = await Attendance.find({
      userId,
      date: { $gte: firstDay, $lte: lastDay },
    });

    const summary = {
      Present: 0,
      Absent: 0,
      Leave: 0,
    };

    records.forEach((record) => {
      if (record.status in summary) {
        summary[record.status]++;
      }
    });

    res.json(summary);
  } catch (err) {
    console.error("Error getting summary:", err);
    res.status(500).json({ message: "Error fetching summary" });
  }
};

// this is for the calendar for user view
const getMonthlyAttendance = async (req, res) => {
  try {
    const userId = req.user._id;

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const records = await Attendance.find({
      userId,
      date: { $gte: startOfMonth, $lte: endOfMonth },
    });

    const data = {};

    records.forEach((record) => {
      const formattedDate = record.date.toLocaleDateString('en-CA'); // outputs YYYY-MM-DD in local time


      data[formattedDate] = record.status; // "Present", "Absent", etc.
    });

    res.json(data);
  } catch (error) {
    console.error("Error fetching monthly attendance:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  markAttendance,
  getTodayUserAttendance,
  getAllUserAttendance,
  getTodayAttendanceCount,
  getUserAttendanceRecords,
  getAttendanceSummary,
  getMonthlyAttendance,
};
