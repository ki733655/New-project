const User = require("../../models/user");
const bcrypt = require("bcrypt");



const createUser = async (req, res) => {
  const { empId, name, email, role, password } = req.body;

  if (!empId || !name || !email || !role || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      empId,
      name,
      email,
      role,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error while creating user" });
  }
};

const getuserdata = async (req, res) => {
  try {
    const users = await User.find();

    const formatted = users.map((user) => ({
      _id: user._id,
      empId: user.empId,
      name: user.name,
      email: user.email,
      role: user.role,
    }));

    res.status(200).json(formatted);
  } catch (error) {
    console.log("Error fetching users", error);
    res
      .status(500)
      .json({ message: "Server error while fetching user details" });
  }

  
};

const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Server Error while deleting user" });
    }
  };

  const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, role },
      { new: true } // return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server Error while updating user" });
  }
};

module.exports = { getuserdata, deleteUser, updateUser, createUser };
