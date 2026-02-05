const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization;

  console.log("Auth Header:", authHeader);

  if (!authHeader) {
    console.log("No authorization header provided");
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  console.log("Extracted token:", token);
  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  if (!token) {
    console.log("No token extracted");
    return res.status(401).json({ error: "Malformed token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // contains _id & name

    console.log("Token verified successfully, user:", decoded);

    next();
  } catch (err) {
    console.error("JWT ERROR:", err.message);

    res.status(401).json({ error: "Invalid token" });
  }
};