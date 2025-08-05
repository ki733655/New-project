const express = require("express");
const router = express.Router();

const {getuserdata, deleteUser, updateUser, createUser} = require("../../controllers/adminDashboard/userdataController");

router.get("/get/user/details", getuserdata);
router.delete("/delete/user/:id", deleteUser);
router.put("/update/user/:id", updateUser);
router.post("/create/user", createUser);


module.exports = router;