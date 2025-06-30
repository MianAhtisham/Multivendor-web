const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please enter your name"]
    },

    email:{
        type: String,
        required: [true, "Please enter your email"]
    },

    password:{
        type: String,
        required: [true, "Please enter your password"],
        minLength: [4, "Password should be grater than 4 character"],
        select: false,
    },

    phoneNumber:{
      type: Number
    },

    addresses: [
    {
        conntry: {
            type: String,
        },

        city: {
            type: String,
        },

        address1: {
            type: String,
        },

        address2: {
            type: String,
        },

        zipcode: {
            type: Number,
        },

        addressType: {
            type: Number,
        },
    }
    ],
    role: {
        type: String,
        default: "user",
    }
})