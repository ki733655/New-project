const express = require("express");
const router = express.Router();
const login = require("./login");
const showTableuser = require("./dashboard/showTableuser");
const addTableuser = require("./dashboard/addTableuser");
const deleteTableuser = require("./dashboard/deleteTableuser");
const editTableuser = require("./dashboard/editTableuser");
const attendance = require("./dashboard/calendar/attendance");
const addPaySlip = require("./paySlip/addPaySlip");

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
  addPaySlip
);

module.exports = router;
