const PORT = 5000;
const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send({ firstName: "Henry", LastName: "John" });
});

app.post("/user", (req, res) => {
  // save user details in DB
  res.send("User details are successfully saved in database!");
});

app.patch("/user", (req, res) => {
  // update user details in DB
  res.send("User details are successfully updated in database!");
});

app.delete("/user", (req, res) => {
  // delete user details in DB
  res.send("User details are successfully deleted in database!");
});

app.use("/user", (req, res) => {
  res.send("test from the server");
});

app.listen(PORT, () => {
  console.log(`server successfully listen at port ${PORT}`);
});
