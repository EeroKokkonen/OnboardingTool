const jwt = require("jsonwebtoken");
require("dotenv").config();
const users = require("../models/users");


const verifyToken = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authentication failed");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const user = await users.findById(decodedToken.id);

    req.userData = { userId: decodedToken.id,
                      isAdmin: user.isAdmin === "1" };
    next();
  } catch (err) {
    res.status(401).send(err);
  }
};

module.exports = verifyToken;
