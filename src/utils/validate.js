const validator = require("validator");

const validateSingupData = (userData) => {
  const {
    firstName,
    lastName,
    emailId,
    password,
    profileUrl,
    age,
    gender,
    skills,
  } = userData;

  if (!firstName || firstName.length < 3) {
    throw new Error("firstName is required with minumum 3 characters");
  }

  if (!lastName || lastName.length < 3) {
    throw new Error("lastName is required with minumum 3 characters");
  }

  if (!emailId || !validator.isEmail(emailId.toLowerCase().trim())) {
    throw new Error("A valid email is required");
  }

  if (!password || !validator.isStrongPassword(password)) {
    throw new Error(
      "A strong password is required, password containes atleast one capital letter, one smaller letter, one number, one spacial char and password length should be minimum 8 characters"
    );
  }
  if (profileUrl && !validator.isURL(profileUrl)) {
    throw new Error(profileUrl + " is not a valid url, please enter valid url");
  }

  if (age && age < 18) {
    throw new Error("Age is less then 18, Minimum age should be 18 years");
  }

  if (gender && !["male", "female", "others"].includes(gender)) {
    throw new Error(
      "invalid gender: " + gender + ", gender should male, female or others"
    );
  }

  if (skills && skills.length > 10) {
    throw new Error("maximum skills should be 10");
  }
};

const validateUserUpdateData = (userData) => {
  const { profileUrl, gender, skills } = userData;

  if (profileUrl && !validator.isURL(profileUrl)) {
    throw new Error(profileUrl + " is not a valid url, please enter valid url");
  }

  if (skills && skills.length > 10) {
    throw new Error("maximum skills should be 10");
  }
};

module.exports = { validateSingupData, validateUserUpdateData };
