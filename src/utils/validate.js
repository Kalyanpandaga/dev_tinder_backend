const validator = require("validator");

const validateSingupData = (userData) => {
  const { firstName, lastName, emailId, password } = userData;

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
};

const validateUserUpdateData = (userData) => {
  const { profileUrl, gender, skills } = userData;

  if (profileUrl && !validator.isURL(profileUrl)) {
    throw new Error(profileUrl + " is not a valid url, please enter valid url");
  }

  if (gender && !validator.enum(["male", "female", "other"])) {
    throw new Error(gender + " is not a valid gender type");
  }

  if (skills && skills.length > 10) {
    throw new Error("maximum skills should be 10");
  }
};

const validateEditProfileData = (editData) => {
  const validEditProfileFields = [
    "firstName",
    "lastName",
    "description",
    "profileUrl",
    "age",
    "gender",
    "skills",
  ];

  const { firstName, lastName, description, profileUrl, age, gender, skills } =
    editData;

  const isValidFields = Object.keys(editData).every((field) =>
    validEditProfileFields.includes(field)
  );

  if (!isValidFields) {
    throw new Error("invalid edit profile data fields");
  }

  if (firstName && firstName.length < 3) {
    throw new Error("firstName is required with minumum 3 characters");
  }

  if (lastName && lastName.length < 3) {
    throw new Error("lastName is required with minumum 3 characters");
  }

  if (description && description.length > 1024) {
    throw new Error(
      "description is too lengthy, write description in 1024 characters"
    );
  }

  if (profileUrl && !validator.isURL(profileUrl)) {
    throw new Error(profileUrl + " is not a valid url, please enter valid url");
  }

  if (age && age < 18) {
    throw new Error("age should not be less then 18 years");
  }

  if (gender && !["male", "female", "others"].includes(gender)) {
    throw new Error("invalid gender, gender should be [male, female, others]");
  }

  if (skills && skills.length > 10) {
    throw new Error("maximum skills should be 10");
  }
};

const validateUpdatePasswordData = (data) => {
  const { existingPassword, newPassword } = data;
  if (!existingPassword) {
    throw new Error("*existingPassword is required field");
  }

  if (!newPassword) {
    throw new Error("*newPassword is required field");
  }

  if (newPassword === existingPassword) {
    throw new Error("newPassword and existing password both are same");
  }

  if (!validator.isStrongPassword(newPassword)) {
    throw new Error(
      "A strong password is required, password containes atleast one capital letter, one smaller letter, one number, one spacial char and password length should be minimum 8 characters"
    );
  }
};

module.exports = {
  validateSingupData,
  validateEditProfileData,
  validateUpdatePasswordData,
};
