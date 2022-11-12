const mongoose = require('mongoose')

const FlashcardSetSchema = new mongoose.Schema({
  userId: {type: String, required: true},
  creatorAvatarUrl: {type: String, required: true},
  creatorUsername: {type: String, required: true},
  associatedUserIds: [{type: String, default: [], required: true}],
  title: {type: String, required: true},
  description: {type: String, required: false},
  flashcards: [{
    _id: {type: String, required: true},
    word: {type: String, required: true},
    translation: {type: String, required: true},
    imageUrls: [{type: String, required: false}],
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