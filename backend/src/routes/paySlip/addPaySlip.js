const express = require("express");
const router = express.Router();

// const tableModel = require("../../models/Table");
const PaySlip = require("../../models/paySlip");

router.post("/add-paySlip-data", async (req, res) => {
  try {
    const newPaySlipModel = new PaySlip({
      year : req.body.year,
      month : req.body.month,
      pdf : req.body.pdf,
    });

    const data = await newPaySlipModel.save();
    res.send(data).status(200);
    console.log("data saved");
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

module.exports = router;
