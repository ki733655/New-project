const express = require("express");
const router = express.Router();

const tableModel = require("../../models/Table");

router.post("/add-table-user", async (req, res) => {
  try {
    const newtableModel = new tableModel({
      name: req.body.name,
      email: req.body.email,
      select: req.body.select,
      empId: req.body.empId,
      inTime: req.body.inTime,
      outTime: req.body.outTime,
    });

    const data = await newtableModel.save();
    res.send(data);
    console.log("data saved");
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

router.post("/add-from-user-dashboard", async (req, res) => {
  try {
    const newtableModel = new tableModel({
      name: req.body.name,
      email: req.body.email,
      inTime: req.body.inTime,
      outTime: req.body.outTime,
    });

    const data = await newtableModel.save();
    res.send(data);
    console.log("data saved");
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

module.exports = router;
