const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_PRIVATE_KEY = "Dev@TInder123";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 50,
      set: function (v) {
        if (typeof v !== "string") {
          throw new Error("firstName must be a string");
        }
        return v;
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minLength: 5,
      maxLength: 100,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid email address, invalid email: " + value);
        }
      },
    },
    phone: {
      type: Number,
    },
    description: {
      type: String,
      default: "i want to be a great developer",
    },
    profileUrl: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error(value + " is not a valid url");
        }
      },
    },
    age: {
      type: Number,
      min: 18,
      lowercase: true,
    },
    gender: {
      lowercase: true,
      type: String,
      enum: ["male", "female", "others"],
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.profileUrl && this.firstName) {
    this.profileUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${this.firstName}`;
  }
  next();
});

userSchema.methods.getJwt = async function () {
  const user = this;
  const token = await jwt.sign({ userId: user._id }, JWT_PRIVATE_KEY, {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const hashedPassword = user.password;

  const isPosswordValid = await bcrypt.compare(
    passwordInputByUser,
    hashedPassword
  );
  return isPosswordValid;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
