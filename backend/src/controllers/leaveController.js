const Leave =  require("../models/leave");
const user = require("../models/user");

const applyLeave = async (req, res) => {
  try {
    const { fromDate, toDate, reason, leaveType } = req.body;

    if (!fromDate || !toDate || !reason || !leaveType) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newLeave = new Leave({
      userId: req.user._id,
      fromDate,
      toDate,
      reason,
      leaveType, 
    });

    await newLeave.save();

    res.status(201).json({ message: "Leave applied successfully", leave: newLeave });
  } catch (error) {
    console.error("Leave apply error:", error);
    res.status(500).json({ message: "Server error while applying leave." });
  }
};

const getUserLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ userId: req.user._id }).sort({ appliedAt: -1 });
    res.status(200).json(leaves);
  } catch (error) {
    console.error("Fetch user leaves error:", error);
    res.status(500).json({ message: "Server error while fetching leaves." });
  }
}; 

// Optional: Admin can see all leave requests
const getAllLeaves = async (req, res) => {
 try {
    const leaves = await Leave.find({ status: "Pending" }).populate("userId", "name");
    
    const formatted = leaves.map(leave => ({
      id: leave._id,
      name: leave.userId.name,
      toDate: leave.toDate.toISOString().split("T")[0],
      fromDate: leave.fromDate.toISOString().split("T")[0],
      reason: leave.reason,
    }));

    console.log(formatted);
    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const updateLeaveStatus = async (req, res) => {
  const { leaveId } = req.params;
  const { status } = req.body;

  if (!["Approved", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const leave = await Leave.findById(leaveId);
    if (!leave) return res.status(404).json({ message: "Leave not found" });

    leave.status = status;
    await leave.save();

    res.json({ message: "Status updated", leave });
  } catch (err) {
    console.error("Update leave status error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  applyLeave,
  getUserLeaves,
  getAllLeaves,
  updateLeaveStatus,
};