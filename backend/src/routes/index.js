const express = require("express");
const router = express.Router();
const login = require("./authentication/login");
const showTableuser = require("./dashboard/showTableuser");
const addTableuser = require("./dashboard/addTableuser");
const deleteTableuser = require("./dashboard/deleteTableuser");
const editTableuser = require("./dashboard/editTableuser");
const attendance = require("./dashboard/calendar/attendance");
const addPaySlip = require("./paySlip/addPaySlip");
const profile = require("./profile/profile");
const addDocuments = require("./documents/addDocuments")
const forgotpass = require("./authentication/forgotpass")


router.get("/", (req, res) => {
  res.send("Hii I am the homepage");
});

router.use(
  login,
  showTableuser,
  addTableuser,
  deleteTableuser,
  editTableuser,
  attendance,
  addPaySlip,
  profile,
  addDocuments,
  forgotpass
);

module.exports = router;
