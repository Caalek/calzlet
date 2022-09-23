const express = require("express");
const router = express.Router();
const FlashcardSet = require("../models/flashcardSet");

router.get("/sets/:userId", async (req, res) => { //for YourSets page
  const results = await FlashcardSet.find({ userId: req.params.userId });
  res.send(results);
});

router.post("/set", async (req, res) => { //for create-set page
  const result = await FlashcardSet.create(req.body);
  res.sendStatus(201)
});

router.put("/set/:setId", async (req, res) => {
  const result = await FlashcardSet.findOneAndReplace({_id: req.params.setId}, req.body)
  res.send({})
})

router.delete("/set/:setId", async (req, res) => {
  const result = await FlashcardSet.deleteOne({_id: req.params.setId}, req.body)
  res.send({})
})

//edit
// jak chce editowac flashcardy to np flashcard.0.word
router.patch("/set/:setId", async (req, res) => {
  const query = {_id: req.params.setId}
  const updateObject = req.body
  await FlashcardSet.findOneAndUpdate(query, updateObject)
  res.sendStatus(200)
})

// get one set
router.get("/set/:setId" , async (req, res) => {
  const result = await FlashcardSet.findOne({_id: req.params.setId})
  res.send(result)
})


module.exports = router;
