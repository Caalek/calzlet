const express = require("express")
const router = express.Router()
const FlashcardSet = require('../models/flashcardSet')

router.get("/sets/:userId", async (req, res) => {
  const results = await FlashcardSet.find({userId: req.params.userId})

  const responseArray = []
  for (i in results) {
    responseArray.push({
      title: results[i].title,
      description: results[i].description
    })
  }
  res.send(responseArray)
})

router.post("/set", async (req, res) => {
  console.log(req.body)
  const result = await FlashcardSet.create(req.body)
  res.send({message: "success"})
})

module.exports = router