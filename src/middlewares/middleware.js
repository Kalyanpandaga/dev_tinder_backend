const adminAuth = (req, res, next) => {
  console.log("checked admin authorization!");

  const jwtToken = "xyz";
  isAuthenticated = jwtToken === "xyz";

  if (!isAuthenticated) {
    res.status(400).send("unauthenticated admin user");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("checked user authorization!");

  const jwtToken = "xyz";
  isAuthenticated = jwtToken === "xyzd";

  if (!isAuthenticated) {
    res.status(400).send("unauthenticated user");
  } else {
    next();
  }
};
module.exports = { adminAuth, userAuth };
