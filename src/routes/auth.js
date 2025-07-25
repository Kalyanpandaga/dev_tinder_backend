const express = require("express");
const bcrypt = require("bcrypt");
const validator = require("validator");

const User = require("../models/user");
const { userAuth } = require("../middlewares/middleware");

const authRouter = express.Router();

const {
  validateSingupData,
  validateUserUpdateData,
} = require("../utils/validate");

authRouter.post("/signup", async (req, res) => {
  try {
    const userData = req.body;
    validateSingupData(userData);
    const { firstName, lastName, emailId, password } = userData;

    const saltRounds = 10;

    hashedPassword = await bcrypt.hash(password, saltRounds);

    let createUserData = {
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    };

    const user = new User(createUserData);

    const savedUser = await user.save();

    const savedUserData = {
      _id: savedUser._id,
      firstName: savedUser.firstName,
      lastName: savedUser.lastName,
      gender: savedUser.gender,
      age: savedUser.age,
      profileUrl: savedUser.profileUrl,
      description: savedUser.description,
      skills: savedUser.skills,
    };

    const token = await user.getJwt();
    res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000 });

    res.status(201).json({
      message: "user data created successfully",
      userData: savedUserData,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!emailId || !password) {
      throw new Error("email and password should not be empty");
    }

    const email = emailId.toLowerCase().trim();

    if (!validator.isEmail(email)) {
      throw new Error("invalid email id");
    }

    const user = await User.findOne({ emailId: email });
    if (!user) {
      throw new Error("invalid credentials!");
    }

    const isPosswordValid = await user.validatePassword(password);

    if (!isPosswordValid) {
      throw new Error("invalid credentials!");
    }

    const userData = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      age: user.age,
      profileUrl: user.profileUrl,
      description: user.description,
      skills: user.skills,
    };

    const token = await user.getJwt();
    res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000 });
    res.status(200).json({ userData: userData });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

authRouter.post("/logout", userAuth, async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Successfully Logout !!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = authRouter;
