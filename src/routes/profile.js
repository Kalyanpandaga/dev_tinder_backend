const express = require("express");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();

const { userAuth } = require("../middlewares/middleware");
const {
  validateEditProfileData,
  validateUpdatePasswordData,
} = require("../utils/validate");

profileRouter.get("/view", userAuth, async (req, res) => {
  try {
    const userData = {
      _id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      gender: req.user.gender,
      age: req.user.age,
      profileUrl: req.user.profileUrl,
      description: req.user.description,
      skills: req.user.skills,
    };

    res.status(200).json({ userData: userData });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

profileRouter.put("/edit", userAuth, async (req, res) => {
  const editData = req.body;
  try {
    validateEditProfileData(editData);
    loginUser = req.user;
    Object.keys(editData).forEach((key) => (loginUser[key] = editData[key]));
    await loginUser.save();

    res.json({
      message: `${loginUser.firstName}, your profile data updated`,
      updatedData: loginUser,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

profileRouter.put("/password", userAuth, async (req, res) => {
  try {
    const data = req.body;

    validateUpdatePasswordData(data);
    const { existingPassword, newPassword } = data;
    loginUser = req.user;
    const isExistingPasswordValidate = await loginUser.validatePassword(
      existingPassword
    );

    if (!isExistingPasswordValidate) {
      throw new Error("existing password is invalid");
    }

    const saltRounds = 10;
    newHashedPassword = await bcrypt.hash(newPassword, saltRounds);

    loginUser.password = newHashedPassword;
    await loginUser.save();
    res.clearCookie("token");
    res.json({ message: "password changed successfully" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = profileRouter;
