require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const crypto = require("crypto")
const cors = require("cors")
const multer = require("multer")
const sendEmail = require("./utils/sendEmail")
const upload = multer({ dest: 'images/' })
const fs = require("fs")
const FlashcardSet = require("./models/flashcardSet");
const User = require("./models/user")
const middleware = require("./middleware");
const EmailVerifyToken = require("./models/emailVerifyToken");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static(path.join(__dirname, "../client/build")));
app.use('/images', express.static('images'))
app.use(cors())

const port = 5000;

app.use("/api", require("./routes/sets"));
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/users"));
app.use("/api", require("./routes/image"));
app.use("/api", require("./routes/shares"))

app.get("/images/:imageId", (req, res) => {
  const imageId = req.params.imageId
  const readStream = fs.createReadStream(`images/${imageId}`)
  readStream.on('open', () => {
    readStream.pipe(res);
  })
  readStream.on('error', (error) => {
    res.sendStatus(404)
  })
})

app.post("/api/check-view-password/:setId", async (req, res) => {
  const result = await FlashcardSet.findById(req.params.setId)
  if (req.body.password === result.viewPassword) {
    res.send({"message": "success"})
  } else {
    res.send({"message": "password invalid"})
  }
})

app.post("/api/check-edit-password/:setId", async (req, res) => {
  const result = await FlashcardSet.findOne({_id: req.params.setId})
  if (req.body.password === result.editPassword) {
    res.send({"message": "success"})
  } else {
    res.send({"message": "password invalid"})
  }
})

app.get("/api/verify-email/:emailVerifyToken", async (req, res) => {
 
  EmailVerifyToken.findOne({token: req.params.emailVerifyToken}, (error, token) => {
    if (!token) {
      res.status(400).send({message: "Token invalid or expired"})
    }
    else {
      User.findOne({_id: token.userId}, (error, user) => {
        if (error) {
          return res.status(500).send({message: error.message})
        }
        if (!user) {
          return res.status(401).send({message: "User not found"})
        }
        else if (user.verified) {
          return res.send(200).send({message: "User already verified"})
        }
        user.verified = true
        user.save((error) => {
          if (error) {
            return res.status(500).send({message: error.message})
          } else {
            EmailVerifyToken.findByIdAndDelete(token._id, (error) => {
              if (error) {
                return res.status(500).send({message: error.message})
              }
            })
            return res.sendStatus(200)

          }
        })
      })
    }
  })
})

app.get("/api/send-email-verify", middleware.verifyToken, async (req, res) => {
  User.findOne({_id: req._id}, (error, user) => {
    if (error) {
      return res.status(500).send({ message: error.message })
    }
    if (!user) {

      return res.status(400).send({message: "User not found"})
    }
    if (user.verified) {
      return res.sendStatus(200)
    }
    else   {
      EmailVerifyToken.create(
        {userId: user._id, token: crypto.randomBytes(32).toString("hex")}, (error, result) => {
          if (error) {
            return res.status(500).send({ message: error.message })
          }
          sendEmail({
            to: user.email,
            subject: "Weryfikacja adresu e-mail",
            text: `Aby zweryfikować adres email, kliknij w link poniżej: \n\n ${
              process.env.BASE_URL + "verify-email/" + result.token
            }`,
          });
        }
      )
      return res.sendStatus(200)
    }
  })        
})


app.get('*', (req, res, next) => {
  if (process.env.ENV === "prod") {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  } else {
    next()
  }
})

app.listen(port, () => {
  console.log("server running");
});
