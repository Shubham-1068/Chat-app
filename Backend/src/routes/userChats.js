const express = require("express");
const userChat = require("../model/userChat");
const router = express.Router();

router
  .route("/")
  .post(async (req, res) => {
    const data = await userChat.create({
      message: req.body.message,
      sender: req.body.sender,
    });

    console.log(data);

    res.json({ message: "success" });
  })
  .get(async (req, res) => {
    const chatHistory = await userChat.find({});

    res.json(chatHistory);
  });

module.exports = router;
