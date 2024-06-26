const express = require("express");
const router = express.Router();

const user = require("../../models/user");

router.delete("/delete-table-user/:email", async (req, res) => {
  const email = req.params.email;
  console.log(email);
  try {
    await user.deleteOne({ email: email });
    // Respond with a success message or appropriate status code
    res
      .status(200)
      .json({ message: `Data with email ${email} deleted successfully` });
  } catch (error) {
    // Handle any errors and respond with an appropriate status code and error message
    console.error("Error deleting data:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the data" });
  }
});

module.exports = router;
