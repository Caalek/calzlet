const express = require("express")
const middleware = require("../middleware")
const router = express.Router()
const User = require('../models/user')
const bcrypt = require("bcryptjs")

router.put("/user", middleware.verifyToken, async (req, res) => {
  const foundUser = await User.findOne({_id: req._id})
  if (!foundUser) return res.send({message: 'User not found.'})

  const updateObject = {
    username: req.body.username ? req.body.username : foundUser.user,
    email: req.body.email ? req.body.email : foundUser.email,
    password: req.body.password ? bcrypt.hashSync(req.body.password, 8) : foundUser.password
  }
  await User.updateOne({_id: req._id}, updateObject)
  res.send({message: 'success'})
})

router.delete("/user", middleware.verifyToken, async (req, res) => {
  const foundUser = await User.findOne({_id: req._id})
  console.log(foundUser)
  if (!foundUser) return res.send(404).send({message: 'User not found.'})
  await User.deleteOne({_id: req._id})
  res.send({message: "success"})
})

router.post("/check-password", middleware.verifyToken, async (req, res) => {
  User.findOne({ _id: req._id }, (error, user) => {
    console.log(user)
    if (error)
      return res.send({ auth: false, message: "Internal server error." });
    if (!user)
      return res.send({ auth: false, message: "Invalid email or password." });
      console.log(user.password)
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    console.log(req.body.password)
    console.log(user.password)
    console.log(passwordIsValid)
    if (!passwordIsValid) {
      return res.send({ auth: false, message: "Invalid email or password." });
    }
    res.send({ auth: true });
  })
})

module.exports = router