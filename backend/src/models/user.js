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
  bio: String,
  inTime: [String],
  outTime: [String],
  assets: {
    name: String,
    model: String,
  },
  documents: [
    {
      adhaarCard: String,
    },
    { panCard: String },
    { drivingLicense: String },
    { passport: String },
    { experienceLetter: String },
    {
      bankDetails: {
        accountNumber: String,
        cifNumber: String,
        ifscCode: String,
        firstName: String,
        middleName: String,
        lastName: String,
        address: String,
        pinCode: String,
      },
    },
  ],
});

const userModel = new mongoose.model("user", userSchema);

module.exports = userModel;
