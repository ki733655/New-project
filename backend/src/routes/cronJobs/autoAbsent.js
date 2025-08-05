// routes/autoAbsent.js or cronJobs/autoAbsent.js
console.log("AutoAbsent cron job loaded");

const cron = require("node-cron");
const Attendance = require("../../models/attendance");
const User = require("../../models/user");

// Runs every day at 11:59 PM
cron.schedule("0 12 * * *", async () => {
  const today = new Date();

  // ✅ Exclude  Sunday (0)
  const dayOfWeek = today.getDay();
  if (dayOfWeek === 0) {
    console.log("Weekend! Skipping absent marking.");
    return;
  }

  try {
    const formattedDate = today.toISOString().split("T")[0]; // YYYY-MM-DD

    // Get all users
    const allUsers = await User.find({}, "_id");

    // Get users who have marked attendance today
    const attendedToday = await Attendance.find({ date: formattedDate }, "userId");
    const attendedUserIds = attendedToday.map((a) => a.userId.toString());

    // Filter out users who haven't marked attendance
    const absentUsers = allUsers.filter(user => !attendedUserIds.includes(user._id.toString()));

    for (const user of absentUsers) {
      await Attendance.create({
        userId: user._id,
        date: today,
        status: "Absent",
        checkIn: null,
        checkOut: null,
      });
    }

    console.log(`Marked ${absentUsers.length} users as absent for ${formattedDate}`);
  } catch (err) {
    console.error("Error in auto absent cron:", err);
  }
});
