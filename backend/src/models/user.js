const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  select: String,
  empId: String,
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
