const express = require("express");
const router = express.Router();

const Attendance = require("../../../models/attendance");

router.post("/add-attendance", async (req, res) => {
  try {
    const existingDocument = await Attendance.findOne({ email: req.body.email });
    if (existingDocument) {
      existingDocument.date.push(req.body.date);
      existingDocument.status.push(req.body.status);
      const updatedData = await existingDocument.save();
      res.send(updatedData);
      console.log("data updated");
    } else {
      const attendancedata = new Attendance(req.body);
      await attendancedata.save();
      res.status(201).send(attendancedata);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});


router.get("/get-attendance", async (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).json({ error: "Email query parameter is required" });
  }

  try {
    const userAttendance = await Attendance.findOne({ email: email });

    if (!userAttendance) {
      return res.status(404).json({ error: "Attendance records not found" });
    }

    const attendanceMap = {};
    userAttendance.date.forEach((date, index) => {
      attendanceMap[new Date(date).toISOString().split('T')[0]] = userAttendance.status[index];
    });

    res.json(attendanceMap);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching attendance records" });
  }
});


// router.get("/get-attendance", async (req, res) => {
//   const email = req.query.email;

//   if (!email) {
//     return res.status(400).json({ error: "Email query parameter is required" });
//   }

//   try {
//     const userAttendance = await Attendance.find({ email: email });

//     if (userAttendance.length > 0) {
//       const attendanceData = userAttendance.reduce((acc, entry) => {
//         acc[entry.date] = entry.status;
//         return acc;
//       }, {});

//       res.json(attendanceData);
//     } else {
//       res.status(404).json({ error: "User not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

module.exports = router;
