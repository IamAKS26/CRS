const express = require("express");
const app = express();
require("dotenv").config();
require("./Models/db"); // MongoDB connection
const Auth_Router = require("./Routes/Auth_Router");
const cors = require("cors");
const collegeRoutes = require("./Routes/collegeRoutes");
const studentRoutes = require("./Routes/studentRoutes");

const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Debug logger (optional, can remove in production)
app.use((req, res, next) => {
  console.log("📩 Method:", req.method);
  console.log("📩 URL:", req.url);
  console.log("📩 Headers:", req.headers["content-type"]);
  console.log("📩 Body:", req.body);
  next();
});

// Routes
app.use("/auth", Auth_Router);           // signup & login
app.use("/api/colleges", collegeRoutes); // college data
app.use("/api/students", studentRoutes); // student profile (✅ keep plural for consistency)

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
