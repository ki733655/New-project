const express = require("express");
const router = express.Router();

const user = require("../../models/user");

router.put("/edit-table-user", async (req, res) => {
  try {
    const data = await user.findOneAndUpdate(
      {
        email: req.body.email,
      },
      {
        name: req.body.name,
        email: req.body.email,
        select: req.body.select,
        empId: req.body.empId,
      },
      {
        new: true,
      }
    );
    // Respond with a success message or appropriate status code
    res.send(data).status(200);
    console.log("data updated successfully", data);
  } catch (error) {
    // Handle any errors and respond with an appropriate status code and error message
    console.error("Error updating data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the data" });
  }
});

module.exports = router;
