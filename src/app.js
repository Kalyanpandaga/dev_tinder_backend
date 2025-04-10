const PORT = 5000;
const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { userAuth } = require("./middlewares/middleware");
const mongoose = require("mongoose");
const {
  validateSingupData,
  validateUserUpdateData,
} = require("./utils/validate");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const JWT_PRIVATE_KEY = "Dev@TInder123";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/user", userAuth);

app.post("/signup", async (req, res) => {
  try {
    const userData = req.body;
    validateSingupData(userData);
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

    const saltRounds = 10;

    hashedPassword = await bcrypt.hash(password, saltRounds);

    let createUserData = {
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
    };

    if (profileUrl) {
      createUserData = { ...createUserData, profileUrl };
    }

    if (age) {
      createUserData = { ...createUserData, age };
    }

    if (gender) {
      createUserData = { ...createUserData, gender };
    }

    if (skills) {
      createUserData = { ...createUserData, skills };
    }

    const user = new User(createUserData);

    await user.save();
    res.send("user data created successfully");
  } catch (err) {
    res.send("ERROR: " + err.message);
  }
});

app.get("/user_by_email", userAuth, async (req, res) => {
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

app.get("/user", userAuth, async (req, res) => {
  try {
    userData = req.user;
    res.send(userData);
  } catch (err) {
    res.status(400).send("ERROR: ", err);
  }
});

// app.get("/user", async (req, res) => {
//   userId = req.body.userId;

//   try {
//     userData = await User.findById(userId);
//     if (!userData) {
//       res.send("user Details not exist for this user id: " + userId);
//     } else {
//       res.send(userData);
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(400).send("Something went wrong!");
//   }
// });

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

app.patch("/user/:id", async (req, res) => {
  const userId = req.params?.id;
  const data = req.body;

  try {
    validateUserUpdateData(data);
    updatedData = {
      description: data.description,
      profileUrl: data.profileUrl,
      skills: data.skills,
    };

    const updateuser = await User.findByIdAndUpdate(userId, updatedData, {
      runValidators: true,
    });
    if (!updateuser) {
      res.status(400).send("user id not found");
    } else {
      res.send("User updated successfully!!");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
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

app.post("/login", async (req, res) => {
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

    const hashedPassword = user.password;
    const isPosswordValid = await bcrypt.compare(password, hashedPassword);

    if (!isPosswordValid) {
      throw new Error("invalid credentials!");
    }

    const token = jwt.sign({ userId: user._id }, JWT_PRIVATE_KEY, {
      expiresIn: "1d",
    });
    res.cookie("token", token, { maxAge: 90000 });
    res.send("Successfully Login !!");
  } catch (err) {
    res.send("ERROR: " + err.message);
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
