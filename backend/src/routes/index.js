const express = require("express");
const router = express.Router();
const signup = require("./signup");
const login = require("./login");
const showTableuser = require("./dashboard/showTableuser");
const addTableuser = require("./dashboard/addTableuser");
const deleteTableuser = require("./dashboard/deleteTableuser");
const editTableuser = require("./dashboard/editTableuser");


router.get("/", (req, res) => {
  res.send("Hii I am the homepage");
});

router.use(signup, login, showTableuser, addTableuser, deleteTableuser, editTableuser);

module.exports = router;
