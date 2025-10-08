const express = require("express");
const app = express();
require("dotenv").config();
require("./Models/db");
const Auth_Router = require("./Routes/Auth_Router");
const cors = require("cors");
const collegeRoutes = require("./Routes/collegeRoutes");
const studentRoutes = require("./Routes/studentRoutes");

const PORT = process.env.PORT || 8080;

// Allowed origins whitelist
const allowedOrigins = [
  "https://crs-zprf.vercel.app",  // your frontend URL
  "http://localhost:3000",         // for local testing
];

// CORS options with dynamic origin check
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman or CURL)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log(`❌ CORS blocked for origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // preflight support

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debug logger
app.use((req, res, next) => {
  console.log("📩 Method:", req.method);
  console.log("📩 URL:", req.url);
  console.log("📩 Headers:", req.headers["content-type"]);
  console.log("📩 Body:", req.body);
  next();
});

// Routes
app.use("/auth", Auth_Router);
app.use("/api/colleges", collegeRoutes);
app.use("/api/students", studentRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use((err, req, res, next) => {
  // CORS error handler
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ message: "CORS error: origin not allowed" });
  }
  next(err);
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
