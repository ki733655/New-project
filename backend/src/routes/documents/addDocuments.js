const express = require("express");
const router = express.Router();

const user = require("../../models/user");

router.post("/add-documents", async (req, res) => {
  try {
    const emailbyquery = req.query.email;
    if (!emailbyquery) {
      return res.status(400).send({ error: "Email query parameter is required" });
    }

    const documents = [
      { adhaarCard: req.body.adhaarCard },
      { panCard: req.body.panCard },
      { drivingLicense: req.body.drivingLicense },
      { passport: req.body.passport },
      { experienceLetter: req.body.experienceLetter },
      {
        bankDetails: {
          accountNumber: req.body.accountNumber,
          cifNumber: req.body.cifNumber,
          ifscCode: req.body.ifscCode,
          firstName: req.body.firstName,
          middleName: req.body.middleName,
          lastName: req.body.lastName,
          address: req.body.address,
          pinCode: req.body.pinCode,
        }
      }
    ];

    const data = await user.findOneAndUpdate(
      { email: emailbyquery },
      { documents: documents },
      { new: true }
    );

    res.status(200).send(data);
    console.log("Data submitted", data);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

module.exports = router;
