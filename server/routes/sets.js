const express = require("express");
const middleware = require("../middleware")
const router = express.Router();
const FlashcardSet = require("../models/flashcardSet");

router.get("/sets", middleware.verifyToken, async (req, res) => { //for YourSets page
  query = req.query
  FlashcardSet.find(query, (error, results) => {
    if (error) {
      console.error(error)
      return res.status(500).send({message: "Internal server errror"})
    }
    console.log(results)
    res.send(results)
  })
});

router.post("/set", middleware.verifyToken, async (req, res) => { //for CreateSet page
  console.log("dsadasd")
  FlashcardSet.create(req.body, (error) => {
    if (error) {
      console.error(error)
      return res.status(500).send({message: "Internal server errror"})
    }
    res.sendStatus(201)
  });
});

router.put("/set/:setId", middleware.verifyToken, async (req, res) => {
  console.log(req.body)
  FlashcardSet.replaceOne({_id: req.params.setId}, req.body, (error) => {
    if (error) {
      console.error(error)
      return res.status(500).send({message: "Internal server errror"})
    }
    res.send({message: 'success'})
  })
})

router.delete("/set/:setId", middleware.verifyToken, async (req, res) => {
  FlashcardSet.deleteOne({_id: req.params.setId}, req.body, (error) => {
    if (error) {
      console.error(error)
      return res.status(500).send({message: "Internal server errror"})
    }
    res.send({message: 'success'})
  })
})

// jak chce editowac flashcardy to np flashcard.0.word
router.patch("/set/:setId", middleware.verifyToken, async (req, res) => {
  const query = {_id: req.params.setId}
  const updateObject = req.body
  FlashcardSet.findOneAndUpdate(query, updateObject, (error) => {
    if (error) {
      console.error(error)
      return res.status(500).send({message: "Internal server errror"})
    }
    res.send({message: 'success'})
  })
})

// get one set
router.get("/set/:setId" , async (req, res) => {
  FlashcardSet.findOne({_id: req.params.setId}, (error, result) => {
    if (error) {
      console.error(error)
      return res.status(500).send({message: "Internal server errror"})
    }
    res.send(result)
  })
})

module.exports = router;
