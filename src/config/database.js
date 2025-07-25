const mongoose = require("mongoose");
const { DATABASE_CONNECTION_STRING } = require("./constants");

const connectDB = async () => {
  await mongoose.connect(DATABASE_CONNECTION_STRING);
};

module.exports = connectDB;
