const express = require("express");
const User = require("../models/user");
const ConnectionRequest = require("../models/connectionRequest");
const { userAuth } = require("../middlewares/middleware");

const requestRouter = express.Router();

requestRouter.post("/send/:status/:toUserId", userAuth, async (req, res) => {
  try {
    const status = req.params.status;
    const toUserId = req.params.toUserId;

    if (!["ignored", "interested"].includes(status)) {
      throw new Error(`${status}: is invalid send connection status type`);
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      throw new Error("toUserId not found");
    }

    const fromUserId = req.user._id;

    const existingRequest = await ConnectionRequest.findOne({
      $or: [
        {
          fromUserId,
          toUserId,
        },
        {
          fromUserId: toUserId,
          toUserId: fromUserId,
        },
      ],
    });

    if (existingRequest) {
      throw new Error("Already requested exist between fromUser and toUser");
    }
    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    await connectionRequest.save();

    res.status(201).json({
      message: `${req.user.firstName} ${status} ${toUser.firstName} profile`,
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

requestRouter.patch(
  "/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const status = req.params.status;
      const requestId = req.params.requestId;

      if (!["accepted", "rejected"].includes(status)) {
        throw new Error(`${status}: invalid review status type`);
      }

      const loginUser = req.user;

      const userConnectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loginUser._id,
      });

      if (!userConnectionRequest) {
        throw new Error("user connection request not exist");
      }

      const userConnectionRequestStatus = userConnectionRequest.status;
      if (userConnectionRequestStatus !== "interested") {
        throw new Error("request connection not in review state");
      }

      userConnectionRequest.status = status;
      await userConnectionRequest.save();
      res.status(200).json({
        message: `${loginUser.firstName} ${status} request`,
        data: userConnectionRequest,
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

module.exports = requestRouter;
