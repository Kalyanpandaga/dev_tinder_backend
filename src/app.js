const PORT = 5000;
const express = require("express");

const app = express();

app.use("/user", [
  (req, res, next) => {
    console.log("handle first route");
    // res.send("response 1");
    next();
  },
  (req, res, next) => {
    console.log("handle second route");
    // res.send("response 2");
    next();
  },
  (req, res, next) => {
    console.log("handle third route");
    // res.send("response 3");
    next();
  },

  (req, res, next) => {
    console.log("handle fourth route");
    // res.send("response 4");
    next();
  },
  (req, res, next) => {
    console.log("handle fifth route");
    res.send("response 5");
  },
]);

app.listen(PORT, () => {
  console.log(`server successfully listen at port ${PORT}`);
});
