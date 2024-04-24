const express = require("express");
const router = express.Router();
const userModel = require("../models/login");

router.post("/signup-form", async (req, res) => {
  try {
    const newuserModel = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const data = await newuserModel.save();

    res.send(data)
    console.log("data saved")
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;