const express = require("express");
const app = express();
require("dotenv").config();
require("./Models/db"); // MongoDB connection
const Auth_Router = require("./Routes/Auth_Router");
const cors = require("cors");
const collegeRoutes = require("./Routes/collegeRoutes");
const studentRoutes = require("./Routes/studentRoutes");

const PORT = process.env.PORT || 8080;

// CORS configuration
const corsOptions = {
  origin: "https://crs-zprf.vercel.app", // your frontend URL here
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // enable pre-flight for all routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug logger (optional, remove in production)
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
app.use("/api/students", studentRoutes); // student profile

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
