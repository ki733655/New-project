const express = require("express");
const router = express.Router();

const tableModel = require("../../models/Table");

router.put("/edit-table-user", async (req, res) => {
  try {
    const data = await tableModel.findOneAndUpdate(
      {
        email: req.body.email,
      },
      {
        name: req.body.name,
        email: req.body.email,
        select: req.body.select,
        currentDate: req.body.currentDate,
        inTime: req.body.inTime,
        outTime: req.body.outTime,
      },
      {
        new: true,
      }
    );
    // Respond with a success message or appropriate status code
    res.send(data).status(200).json({ message: `Data updated successfully` });
  } catch (error) {
    // Handle any errors and respond with an appropriate status code and error message
    console.error("Error updating data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the data" });
  }
});

module.exports = router;
