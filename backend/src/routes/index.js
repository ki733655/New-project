const express = require("express");
const router = express.Router();
const authroutes = require("./authentication/authRoutes");
const attendanceRoute = require("./attendance/attendanceRoutes");
const leaveRoutes = require("./leave/leaveRoutes");
const userRoutes = require("./user/userRoutes");


router.get("/", (req, res) => {
  res.send("Hii I am the homepage");
});

router.use(
  userRoutes,
  authroutes,
  attendanceRoute,
  leaveRoutes
);

module.exports = router;
