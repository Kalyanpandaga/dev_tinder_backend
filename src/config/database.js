const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://kalyanpandaga24:KalyanPandaga@mycluster.axjo7.mongodb.net/devTinder?retryWrites=true&w=majority&appName=MyCluster"
  );
};

module.exports = connectDB;
