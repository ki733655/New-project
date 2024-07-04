const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  email : String,
  date: { type: [Date] },
  status: { type: [String], enum: ['present', 'absent'], required: true },
});

const AttendanceModel = new mongoose.model("Attendance", attendanceSchema);

module.exports = AttendanceModel;