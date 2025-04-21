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

    await user.save();
    res.send("user data created successfully");
  } catch (err) {
    res.send("ERROR: " + err.message);
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

    const token = await user.getJwt();
    res.cookie("token", token, { maxAge: 900000 });
    res.send("Successfully Login !!");
  } catch (err) {
    res.send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", userAuth, async (req, res) => {
  try {
    res.clearCookie("token");
    res.send("Successfully Logout !!");
  } catch (err) {
    res.send("ERROR: " + err.message);
  }
});

module.exports = authRouter;
