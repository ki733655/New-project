const express = require("express");
const router = express.Router();

// const tableModel = require("../../models/Table");
const user = require("../../models/user");

router.post("/add-table-user", async (req, res) => {
  try {
    const newtableModel = new user({
      name: req.body.name,
      email: req.body.email,
      select: req.body.select,
      empId: req.body.empId,
      password : req.body.password,
    });

    const data = await newtableModel.save();
    res.send(data);
    console.log("data saved");
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

router.post("/add-intime-and-outime", async (req, res) => {
  try {
    // Find the document by email
    const existingDocument = await user.findOne({ email: req.body.email });

    if (existingDocument) {
      // Push the new inTime and outTime values to the existing arrays
      existingDocument.inTime.push(req.body.inTime);
      existingDocument.outTime.push(req.body.outTime);

      // Save the updated document
      const updatedData = await existingDocument.save();
      res.send(updatedData);
      console.log("data updated");
    } else {
      res.status(404).send({ message: "Document not found" });
      console.log("Document not found");
    }
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});


module.exports = router;
