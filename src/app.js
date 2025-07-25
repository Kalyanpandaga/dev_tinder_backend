const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const http = require("http");

const { FRONTEND_BASE_URL, PORT } = require("./config/constants");

const app = express();

app.use(
  cors({
    origin: FRONTEND_BASE_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
const chatRouter = require("./routes/chat");
const initializeSocket = require("./utils/socket");

app.use("/api/", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/request", requestRouter);
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);

require("./utils/cronJob");

const server = http.createServer(app);
initializeSocket(server);
connectDB()
  .then(() => {
    console.log("Database connection established...");
    server.listen(PORT, () => {
      console.log(`server successfully listen at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
