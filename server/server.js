require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const multer = require("multer")
const upload = multer({ dest: 'images/' })

const cors = require("cors");
const FlashcardSet = require("./models/flashcardSet")
app.use(cors());

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

app.get("/test", (req, res) => {
  res.send("Hello, World!");
});

app.post("/api/images", upload.single("image"), (req, res) => {
  console.log(req.file.path)
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
  const result = await FlashcardSet.findOne({_id: req.params.setId})
  console.log(result)
  if (req.body.password === result.viewPassword) {
    res.send({"message": "success"})
  } else {
    res.send({"message": "password invalid"})
  }
})

app.listen(port, () => {
  console.log("server running");
});
