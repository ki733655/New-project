const express = require("express");
const router = express.Router();
const upload =  require("../../middleware/upload");
const { authenticate, adminOnly } = require("../../middleware/authMiddleware")

const { register, login, logout, getProfile, updateProfile }  = require("../../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/get/profile", authenticate, getProfile);
router.put('/update/profile', authenticate, upload.single('profilePhoto'), updateProfile);

module.exports = router;
