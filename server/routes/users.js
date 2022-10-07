const express = require("express")
const router = express.Router()
const User = require('../models/user')

router.put("/user/:userId", async (req, res) => {
  const foundUser = await User.findOne({_id: req._id})
  if (!foundUser) return res.send({message: 'User not found.'})
  await User.updateOne({_id: req._id}, req.body)
  res.send({message: 'success'})
})