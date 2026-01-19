const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const verifyToken = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

const verifyAdmin = (req, res, next) => {
  if (req.user && (req.user.role === "admin" || req.user.isAdmin === true)) {
    next();
  } else {
    return res.status(403).json({ message: "Not authorized as an admin" });
  }
};

module.exports = { verifyToken, verifyAdmin };
