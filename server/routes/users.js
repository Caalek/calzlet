const express = require("express");
const middleware = require("../middleware");
const router = express.Router();
const User = require("../models/user");
const FlashcardSet = require("../models/flashcardSet");
const bcrypt = require("bcryptjs");

router.get("/user/:userId", async (req, res) => {
  User.findOne({ _id: req.params.userId }, (error, user) => {
    if (error) {
      console.error(error);
      return res.send(500).send({ message: "Internal server errror" });
    }
    res.send({ username: user.username, avatarUrl: user.avatarUrl });
  });
});

router.put("/user", middleware.verifyToken, async (req, res) => {
  const updateObject = {
    username: req.body.username ? req.body.username : foundUser.user,
    email: req.body.email ? req.body.email : foundUser.email,
    password: req.body.password
      ? bcrypt.hashSync(req.body.password, 8)
      : foundUser.password,
  };
  User.findOneAndUpdate({ _id: req._id }, updateObject, (error, user) => {
    if (error) {
      console.error(error);
      return res.send(500).send({ message: "Internal server errror" });
    }
    res.send(200).send({ message: "success" });
  });
});

router.patch("/user", middleware.verifyToken, async (req, res) => {
  const query = { _id: req._id };
  const updateObject = req.body;
  if (updateObject.avatarUrl || updateObject.username) {
    // żeby było consistent
    FlashcardSet.updateMany(
      { userId: req._id },
      {
        creatorAvatarUrl: updateObject.avatarUrl,
        creatorUsername: updateObject.username,
      }, (error) => {
        if (error) {
          console.error(error);
          return res.send(500).send({ message: "Internal server errror" });
        }
      }
    );
  }
  User.findOneAndUpdate(query, updateObject, (error) => {
    if (error) {
      console.error(error);
      return res.send(500).send({ message: "Internal server errror" });
    }
    res.send(200);
  })
});

router.delete("/user", middleware.verifyToken, async (req, res) => {
  User.findOneAndDelete({ _id: req._id }, (error, user) => {
    if (error) {
      console.error(error);
      return res.send(500).send({ message: "Internal server errror" });
    }
    if (!user) return res.send(404).send({ message: "User not found." });
  });
  res.send({ message: "success" });
});

router.post("/check-password", middleware.verifyToken, async (req, res) => {
  User.findOne({ _id: req._id }, (error, user) => {
    if (error)
      return res.send(500).send({ auth: false, message: "Internal server error." });
    if (!user)
      return res.send(400).send({ auth: false, message: "User does not exist." });
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.send(400).send({ auth: false, message: "Invalid email or password." });
    }
    res.send({ auth: true });
  });
});

module.exports = router;
