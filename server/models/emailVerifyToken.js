const mongoose = require('mongoose')

const EmailVerifyTokenSchema = new mongoose.Schema({
  userId: {type: String, required: true},
  token: {type: String, required: true},
  expireAt: { type: Date, default: new Date, index: { expires: 86400000 } }
})

module.exports = mongoose.model('EmailVerifyToken', EmailVerifyTokenSchema, 'emailVerifyToken')