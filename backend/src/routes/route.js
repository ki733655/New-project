const express = require("express");
const multer = require("multer");
const cors = require("cors");
const user = require("../models/user");

const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload/:email", upload.single("img"), async (req, res) => {
  const emailFromParams = req.params.email;
  if (!req.file) {
    console.error("No file uploaded");
    return res.status(400).send("No file uploaded.");
  }

  const data = await user.findOneAndUpdate(
    { email: emailFromParams },
    { img: req.file.filename, bio: req.body.bio },
    { new: true }
  );

  console.log("data updated ", data)

  console.log("File uploaded:", req.file);
  res.status(201).send({
    fileId: req.file.filename,
    fileName: req.file.originalname,
  });
});

module.exports = app;
