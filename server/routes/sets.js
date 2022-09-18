const express = require("express");
const router = express.Router();
const FlashcardSet = require("../models/flashcardSet");

router.get("/sets/:userId", async (req, res) => { //for YourSets page
  const results = await FlashcardSet.find({ userId: req.params.userId });

  let responseArray = [];
  // for (i in results) {
  //   responseArray.push({
  //     title: results[i].title,
  //     description: results[i].description,
  //     flashcards: results[i].flashcards
  //   });
  // }
  // console.log(responseArray)
  res.send(results);
});

router.post("/set", async (req, res) => { //for create-set page
  console.log(req.body);
  const result = await FlashcardSet.create(req.body);
  res.sendStatus(201)
});

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
  console.log(result)
  res.send(result)
})


module.exports = router;
