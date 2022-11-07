const mongoose = require('mongoose')

const FlashcardSetSchema = new mongoose.Schema({
  userId: {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, required: false},
  flashcards: [{
    word: {type: String, required: true},
    translation: {type: String, required: true},
    imageUrls: [{type: String, required: false}],
    index: {type: Number, required: true}
  }],
  viewAccess: {type: String, required: true},
  editAccess: {type: String, required: true},
  viewPassword: {type: String, required: false},
  editPassword: {type: String, required: false},
  created: {type: Date, default: new Date, required: true},
  edited: {type: Date, default: new Date, required: true},
  accessed: {type: Date, default: new Date, required: true},
  lastIndex: {type: Number, default: 0, required: true}
})

module.exports = mongoose.model("FlashcardSet", FlashcardSetSchema, "flashcard_sets")