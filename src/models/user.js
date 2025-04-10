const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
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
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 50,
      set: function (v) {
        if (typeof v !== "string") {
          throw new Error("lastName must be a string");
        }
        return v;
      },
    },
    emailId: {
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
    password: {
      type: String,
      minLength: 5,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error(value + " is not a strong password");
        }
      },
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

const User = mongoose.model("User", userSchema);
module.exports = User;
