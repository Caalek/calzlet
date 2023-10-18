require("dotenv").config();

const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const hcaptcha = require("express-hcaptcha");
const EmailVerifyToken = require("../models/emailVerifyToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const jwtSecret = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
  const userOfSameEmailExists = await User.findOne({ email: req.body.email });
  if (userOfSameEmailExists) {
    return res.send({
      message: "A user with this email adress already exists.",
    });
  }
  User.create(
    {
      username: req.body.email.split("@")[0],
      email: req.body.email,
      password: hashedPassword,
    },
    (error, user) => {
      console.log(error);
      if (error) return res.status(500).send({ message: error.message });

      const token = jwt.sign({ id: user._id }, jwtSecret, {
        expiresIn: "24h",
      });

      const userData = {
        userId: user._id,
        username: user.username,
        email: user.email,
        avatarUrl: user.avatarUrl,
        verified: user.verified,
        token: token,
      };

      EmailVerifyToken.create(
        { userId: user._id, token: crypto.randomBytes(32).toString("hex") },
        (error, result) => {
          if (error) {
            return res.status(500).send({ message: error.message });
          }
          // sendEmail({
          //   to: user.email,
          //   subject: "Weryfikacja adresu e-mail",
          //   text: `Aby zweryfikować adres email, kliknij w link poniżej: \n\n ${
          //     process.env.BASE_URL + "verify-email/" + result.token
          //   }`,
          // });
        }
      );
      res.send({ message: "success", user: userData });
    }
  );
});

router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (error, user) => {
    if (error) return res.send({ auth: false, message: error.message });
    if (!user)
      return res.send({ auth: false, message: "Invalid email or password." });

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.send({ auth: false, message: "Invalid email or password." });
    }

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "24h" }); // expires in 24 hours

    const userData = {
      userId: user._id,
      username: user.username,
      email: user.email,
      avatarUrl: user.avatarUrl,
      verified: user.verified,
      token: token,
    };

    res.send({ auth: true, user: userData });
  });
});

module.exports = router;
