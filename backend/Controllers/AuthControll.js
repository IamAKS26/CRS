const bcrypt = require('bcrypt');
const UserModel = require("../Models/users");
const StudentProfile = require("../Models/StudentProfile");
const jwt = require('jsonwebtoken');

// Generate JWT Helper
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },   // ✅ always use "id"
    process.env.JWT_SECRET, 
    { expiresIn: "3h" }                    // ✅ correct format
  );
};

const signup = async (req, res) => {
  try {
    const { name, email, password, stream } = req.body;  // ✅ accept stream

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Check if user exists
    const existing = await UserModel.findOne({ email });
    if (existing) {
      return res.status(409).json({
        message: "User already exists, please login",
        success: false,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      stream: stream || null   // ✅ save stream if provided
    });

    await newUser.save();
     const newProfile = new StudentProfile({
      userId: newUser._id, // Link the profile to the new user
      // You can add other default values here if you want
    });
    await newProfile.save();

    // Auto-login (optional)
    const token = generateToken(newUser);

    res.status(201).json({
      message: "Signup successful",
      success: true,
      token,
      user: { 
        id: newUser._id, 
        name: newUser.name, 
        email: newUser.email,
        stream: newUser.stream 
      },
    });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
      });
    }

    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    // Generate JWT
    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        stream: user.stream
      },
    });

  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  signup,
  login,
};
