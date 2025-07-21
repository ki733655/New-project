const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  img: String,
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["admin", "user"], // either 'admin' or 'user'
    default: "user",
  },

  select: String,
  empId: {
    type: String,
    unique: true,
  },
});

const user = new mongoose.model("user", userSchema);

module.exports = user;
