require("dotenv").config();

const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router()
const jwt = require("jsonwebtoken");
const User = require("../models/user")
const hcaptcha = require('express-hcaptcha')
const jwtSecret = process.env.JWT_SECRET
const hcaptchaSecret = process.env.HCAPTCHA_SECRET

router.post("/register", async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const userOfSameEmailExists = await User.findOne({ email: req.body.email });
    if (userOfSameEmailExists)
      return res.send({
        message: "A user with this email adress already exists.",
      });
    User.create(
      {
        username: req.body.email.split("@")[0],
        email: req.body.email,
        password: hashedPassword,
      },
      (error, user) => {
        if (error) return res.send({ message: "Internal server error." });

        const userData = {
          userId: user._id,
          username: user.username,
          email: user.email
        }
        const token = jwt.sign({ user: userData}, jwtSecret, {
          expiresIn: 86400,
        });
        res.send({ message: "success", token: token });
      }
    );
  }
);

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (error, user) => {
    if (error)
      return res.send({ auth: false, message: "Internal server error." });
    if (!user)
      return res.send({ auth: false, message: "Invalid email or password." });

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid)
      return res.send({ auth: false, message: "Invalid email or password." });

    const userData = {
      userId: user._id,
      username: user.username,
      email: user.email
    }

    const token = jwt.sign({user: userData}, jwtSecret, { expiresIn: 86400 }); // expires in 24 hours
    res.send({ auth: true, token: token });
  });
});

// password reset func here

module.exports = router
