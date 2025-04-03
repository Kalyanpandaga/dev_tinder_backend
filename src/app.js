const PORT = 5000;
const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const userData = req.body;
  const user = new User(userData);

  try {
    await user.save();
    res.send("user data created successfully");
  } catch (err) {
    res.send("error saving the user" + err.message);
  }
});

app.get("/user", async (req, res) => {
  userEmail = req.body.emailId;

  try {
    const userData = await User.findOne({ emailId: userEmail });
    if (!userData) {
      res.send("user Details not exist for this email id: " + userEmail);
    } else {
      res.send(userData);
    }
  } catch (err) {
    res.status(400).send("Something went wrong!");
  }
});

app.get("/user/:id", async (req, res) => {
  userId = req.params.id;
  try {
    userData = await User.findById(userId);
    if (!userData) {
      res.send("user Details not exist for this user id: " + userId);
    } else {
      res.send(userData);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Something went wrong!");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    const usersData = users.map((eachUser) => ({
      id: eachUser._id,
      first_name: eachUser.firstName,
      last_name: eachUser.lastName,
      email_id: eachUser.emailId,
    }));
    res.send(usersData);
  } catch (err) {
    res.send("error saving the user" + err.message);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      res.status(400).send("user id not found");
    } else {
      res.send("User deleted successfully!!");
    }
  } catch {
    res.status(400).send("Something went wrong!");
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const updateData = req.body;
  try {
    const updateuser = await User.findByIdAndUpdate(userId, updateData);
    console.log(updateuser);
    if (!updateuser) {
      res.status(400).send("user id not found");
    } else {
      res.send("User updated successfully!!");
    }
  } catch {
    res.status(400).send("Something went wrong!");
  }
});

app.patch("/user_by_email", async (req, res) => {
  const emailId = req.body.emailId;
  const updateData = req.body;
  try {
    const updateuser = await User.findOneAndUpdate(
      { emailId: emailId },
      updateData
    );
    console.log(updateuser);
    if (!updateuser) {
      res.status(400).send("user email not found");
    } else {
      res.send("User updated successfully by email!!");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Something went wrong!");
  }
});
connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(PORT, () => {
      console.log(`server successfully listen at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
