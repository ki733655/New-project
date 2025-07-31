const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const port = 4000;
const indexRoute = require("./src/routes/index");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
require("./src/routes/cronJobs/autoAbsent");

// connection to database
const connectionToDatabase = () => {
  try {
    mongoose.connect("mongodb://localhost:27017/login");
    console.log("db connected");
  } catch (err) {
    console.log("error connecting to db", err);
  }
};
connectionToDatabase();

// Middleware to parse JSON bodies
app.use(
  cors({
    origin: "http://localhost:3000", // frontend origin
    credentials: true, // allow cookies
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(indexRoute);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  console.log(`The server is running on the port ${port}`);
});
