const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  avatarUrl: {type: String, default: "default", required: true},
  verified: {type: Boolean, default: false, required: true}
})

module.exports = mongoose.model('User', UserSchema, 'users')