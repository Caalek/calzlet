const mongoose = require('mongoose')

const ShareSchema = new mongoose.Schema({
  userId: {type: String, required: true},
  setId: {type: String, required: true},
  title: {type: String, required: true},
  username: {type: String, required: true},
  avatarUrl: {type: String, required: true},
  accessed: {type: Date, required: true, default: new Date},
  lastIndex: {type: Number, required: true, default: 0},
  lastElaIndex: {type: Number, required: true, default: 0}
})

module.exports = mongoose.model('Share', ShareSchema, 'shares')