const jwt = require("jsonwebtoken");

const authMiddleWare = (req, res, next) => {
  const headers = req.headers.authorization;
  if (!headers || !headers.startsWith("Bearer ")) {
    throw new Error("please provide headers");
  }

  const token = headers.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // attatch user to payload
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = authMiddleWare;
