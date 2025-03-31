const PORT = 5000;
const express = require("express");

const app = express();

app.get("/user/:userId/:profileId", (req, res) => {
  console.log(req.params);
  res.send({ firstName: "Henry", LastName: "John" });
});

app.listen(PORT, () => {
  console.log(`server successfully listen at port ${PORT}`);
});
