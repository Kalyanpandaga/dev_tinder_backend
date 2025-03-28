const PORT = 5000;
const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("test from the server");
});

app.use("/hello", (req, res) => {
  res.send("Hello from the server.");
});

app.use("/", (req, res) => {
  res.send("Hello from the server in home url");
});

app.listen(PORT, () => {
  console.log(`server successfully listen at port ${PORT}`);
});
