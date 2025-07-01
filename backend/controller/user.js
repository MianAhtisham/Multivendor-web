const express = require("express");
const path = require("path");
const router = express.Router();
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");
const sendMail = require("../utils/sendMail");
const { text } = require("stream/consumers");
const sendToken = require("../utils/jwtToken");

// create user
router.post("/create-user", async (req, res, next) => {
    try{
    const {email, password, name} = req.body();
    const userEmail = await User.findOne({ email });

    if (userEmail) {
        return next(new ErrorHandler("User already Exist", 400));
    }



    const user = {
        name: name,
        email: email,
        password: password,
        avatar: fileUrl,
        
    }
const activationToken = createActivationToken(user);

    const activationUrl = `https://localhost:3000/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${user.email} to activate your account!`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
    // create activation token
        const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// activate user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar } = newUser;

      let user = await User.findOne({ email });

      if (user) {
        return next(new ErrorHandler("User already exists", 400));
      }
      user = await User.create({
        name,
        email,
        avatar,
        password,
      });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;