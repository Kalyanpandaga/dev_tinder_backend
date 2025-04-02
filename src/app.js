const PORT = 5000;
const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./middlewares/middleware");
app.use("/admin", adminAuth);

app.get("/admin/getData", (req, res) => {
  res.send("get admin data successfully!");
});

app.delete("/admin/deleteUser", (req, res) => {
  res.send("admin deleted user successfully!");
});

app.get("/user", userAuth, (req, res, next) => {
  res.send("user data fetched successfully");
});

app.post("/user/login", (req, res, next) => {
  res.send("user loggin successfully");
});

app.listen(PORT, () => {
  console.log(`server successfully listen at port ${PORT}`);
});
