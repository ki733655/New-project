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
const MONGO_URI= process.env.MONGO_URI;

// connection to database
const connectionToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("DB connected successfully");
  } catch (err) {
    console.error("Error connecting to DB:", err);
    process.exit(1); // exit if connection fails
  }
};
connectionToDatabase();


// Middleware to parse JSON bodies
app.use(cors({
  origin: [
      "http://localhost:3000",         // local frontend
      "https://trackmatee.netlify.app" // deployed frontend
    ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


app.use(express.json());
app.use(cookieParser());
app.use(indexRoute);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
  console.log(`The server is running on the port ${port}`);
});
