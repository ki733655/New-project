const express = require("express");
const router = express.Router();
const upload =  require("../../middleware/upload");
const { authenticate, adminOnly } = require("../../middleware/authMiddleware")

const { register, login, logout, me, updateProfile }  = require("../../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", authenticate, me);
router.put('/update/profile', authenticate, upload.single('profilePhoto'), updateProfile);

module.exports = router;
