require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const multer = require("multer")
const upload = multer({ dest: 'images/' })

const FlashcardSet = require("./models/flashcardSet");
const middleware = require("./middleware");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static(path.join(__dirname, "../client/build")));
app.use('/images', express.static('images'))

const port = 5000;

app.use("/api", require("./routes/sets"));
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/users"));

app.post("/api/images", upload.single("image"), middleware.verifyToken, (req, res) => {
  res.send({
    imageUrl: req.file.path
  })
})

app.get("/images/:imageId", (req, res) => {
  const imageId = req.params.imageId
  const readStream = fs.createReadStream(`images/${imageId}`)
  readStream.pipe(res)
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
