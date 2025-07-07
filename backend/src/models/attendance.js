const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  date: {
    type: String, // e.g. "2025-07-01"
    required: true,
  },
  checkIn: {
    type: String, // e.g. "09:00 AM"
    default: null,
  },
  checkOut: {
    type: String, // e.g. "05:00 PM"
    default: null,
  },
  status: {
    type: String,
    enum: ["Present", "Absent", "Half-day"],
    default: "Present",
  },
});

attendanceSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
