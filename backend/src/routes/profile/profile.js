const express = require("express");
const path = require("path");
const router = express.Router();
const User = require("../../models/user");

const app = express();

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

router.get("/get-profile", async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) {
      return res.status(400).send({ error: "Email query parameter is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const profilePictureUrl = user.img ? `${req.protocol}://${req.get('host')}/uploads/${user.img}` : null;
    console.log("Profile Picture URL: ", profilePictureUrl);

    const responseData = {
      email: user.email,
      name: user.name,
      img: profilePictureUrl,
      select: user.select,
      empId: user.empId,
      bio: user.bio,
      inTime: user.inTime,
      outTime: user.outTime,
      assets: user.assets,
      documents: user.documents
    };

    res.send(responseData);
    console.log("Profile data sent");
  } catch (error) {
    console.error("Error while fetching profile data:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = router;









// const express = require("express");
// const router = express.Router();
// const User = require("../../models/user");

// router.get("/get-profile", async (req, res) => {
//   try {
//     const email = req.query.email; // Use req.query to get the query parameter
//     if (!email) {
//       return res.status(400).send({ error: "Email query parameter is required" });
//     } 

//     const data = await User.findOne({ email });
//     if (!data) {
//       return res.status(404).send({ error: "User not found" });
//     }

//     res.send(data);
//     console.log("Profile data sent");
//   } catch (error) {
//     console.error("Error while fetching profile data:", error);
//     res.status(500).send({ error: "Internal server error" });
//   }
// });

// module.exports = router;
