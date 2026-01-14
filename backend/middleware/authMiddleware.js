const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  console.log("Request header:", req.headers);
  const token = req.header("Authorization");

  console.log("Token:", token);

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const deoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = deoded.userId;
    next();
  } catch (e) {
    res.status(401).json({ message: "Token is not valid" });
  }
};
