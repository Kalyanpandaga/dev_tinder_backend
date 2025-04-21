const express = require("express");

const userRouter = express.Router();

const { userAuth } = require("../middlewares/middleware");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const sendedUserFields =
  "firstName lastName gender age profileUrl description skills";

userRouter.get("/requests/recieved", userAuth, async (req, res) => {
  try {
    const loginUser = req.user;
    const userConnectionRequests = await ConnectionRequest.find({
      toUserId: loginUser._id,
      status: "interested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "gender",
      "age",
      "profileUrl",
      "description",
      "skills",
    ]);

    res.status(200).json({
      connectionRequests: userConnectionRequests,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

userRouter.get("/connections", userAuth, async (req, res) => {
  try {
    const loginUser = req.user;
    const userConnections = await ConnectionRequest.find({
      $or: [
        { toUserId: loginUser._id, status: "accepted" },
        { fromUserId: loginUser._id, status: "accepted" },
      ],
    }).populate("fromUserId toUserId", sendedUserFields);

    const connectedUsersDetails = userConnections.map((row) => {
      if (row.fromUserId._id.toString() === loginUser._id.toString()) {
        return row.toUserId;
      }

      return row.fromUserId;
    });

    res.status(200).json({ connections: connectedUsersDetails });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loginUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 30;
    limit = limit > 50 ? 50 : limit;
    skip = (page - 1) * limit;

    const connections = await ConnectionRequest.find({
      $or: [{ fromUserId: loginUser._id }, { toUserId: loginUser._id }],
    });

    const existingConnectedUserIds = connections.map((eachConnection) => {
      if (eachConnection.fromUserId.toString() === loginUser._id.toString()) {
        return eachConnection.toUserId;
      }
      return eachConnection.fromUserId;
    });

    const excludeUserIds = [...existingConnectedUserIds, loginUser._id];

    feedUsersData = await User.find({
      _id: { $not: { $in: excludeUserIds } },
    })
      .select(sendedUserFields)
      .skip(skip)
      .limit(limit);

    res.status(200).send({ feedData: feedUsersData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = userRouter;
