const express = require("express");
const { userAuth } = require("../middlewares/middleware");
const Chat = require("../models/chat");

const chatRouter = express.Router();

chatRouter.get("/:targetUserId", userAuth, async (req, res) => {
  try {
    const { targetUserId } = req.params;
    const userId = req.user._id;

    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    }).populate({ path: "messages.senderId", select: "firstName lastName" });

    if (!chat) {
      let chat = new Chat({
        participants: [userId, targetUserId],
        messages: [],
      });

      await chat.save();
    }

    res.status(200).json({ chatData: chat });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = chatRouter;
