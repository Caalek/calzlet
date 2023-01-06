const express = require("express");
const middleware = require("../middleware");
const router = express.Router();
const Share = require("../models/share");

router.get("/shares", middleware.verifyToken, async (req, res) => {
  query = req.query;
  Share.find(query, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).send({ message: "Internal server errror" });
    }
    res.send(results);
  });
});

router.get("/share/:shareId", async (req, res) => {
  query = { _id: req.params.shareId }
  Share.findOne(query, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).send({ message: "Internal server errror" });
    }
    res.send(result);
  });
});

router.post("/share", middleware.verifyToken, async (req, res) => {
  Share.create(req.body, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).send({ message: "Internal server errror" });
    }
    res.status(201).send({message: "success", share: result});
  });
});

router.put("/share/:shareId", middleware.verifyToken, async (req, res) => {
  Share.replaceOne({ _id: req.params.shareId }, req.body, (error) => {
    if (error) {
      console.error(error);
      return res.status(500).send({ message: "Internal server errror" });
    }
    res.send({ message: "success" });
  });
});

router.delete("/share/:shareId", middleware.verifyToken, async (req, res) => {
  Share.deleteOne({ _id: req.params.shareId }, req.body, (error) => {
    if (error) {
      console.error(error);
      return res.status(500).send({ message: "Internal server errror" });
    }
    res.send({ message: "success" });
  });
});

router.patch("/share", middleware.verifyToken, async (req, res) => {
  const query = req.query || { _id: req.params.shareId };
  const updateObject = req.body;
  Share.findOneAndUpdate(query, updateObject, (error) => {
    if (error) {
      console.error(error);
      return res.status(500).send({ message: "Internal server errror" });
    }
    res.send({ message: "success" });
  });
});

module.exports = router;
