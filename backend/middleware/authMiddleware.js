const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // console.log("req.headers : ", req.headers);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decode token id
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("decode : ", decode);
      req.user = await User.findById(decode.id).select("-password");

      next();
    } catch (e) {
      res.status(401);
      throw new Error("Not Authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, No token");
  }
});

module.exports = { protect };
