const express = require("express");
const path = require("path");
const router = express.Router();
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary")

// create user
router.post("/create-user", async (req, res, next) => {
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

    // create activation token
    
})

module.exports = router;