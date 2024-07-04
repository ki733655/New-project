const express = require("express");
const router = express.Router();
const User = require("../../models/user");

router.get("/get-profile", async (req, res) => {
  try {
    const email = req.query.email; // Use req.query to get the query parameter
    if (!email) {
      return res.status(400).send({ error: "Email query parameter is required" });
    }

    const data = await User.findOne({ email });
    if (!data) {
      return res.status(404).send({ error: "User not found" });
    }

    res.send(data);
    console.log("Profile data sent");
  } catch (error) {
    console.error("Error while fetching profile data:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = router;
