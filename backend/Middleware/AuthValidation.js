const joi = require("joi");
const jwt = require("jsonwebtoken");

const signupValidation = (req, res, next) => {
 const Schema = joi.object({
  name: joi.string().min(3).max(100).required(),
  email: joi.string().email().required(),
  password: joi.string().min(4).max(100).required(),
  stream: joi.string().optional()
});


  const { error } = Schema.validate(req.body, { allowUnknown: true }); // ✅ ignore unknowns
  if (error) {
    return res.status(400).json({
      message: "Bad Request",
      error: error.details[0].message,
    });
  }
  next();
};


// ✅ Login Validation
const loginValidation = (req, res, next) => {
  const Schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).max(100).required(),
  });

  const { error } = Schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Bad Request",
      error: error.details[0].message,
    });
  }
  next();
};

// ✅ JWT Authentication Middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Expect: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("❌ Token verification failed:", err.message);
      return res.status(403).json({ message: "Unauthorized" });
    }

    // 🔑 Save userId for use in routes
    req.userId = decoded.id;

    // Optional debug
    console.log("✅ Token verified for user:", req.userId);

    next();
  });
};

module.exports = {
  signupValidation,
  loginValidation,
  verifyToken,
};
