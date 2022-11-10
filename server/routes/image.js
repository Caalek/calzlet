require("dotenv").config();

const express = require("express");
const fs = require('fs');
const multer = require("multer")
const upload = multer({ dest: 'images/' })
const router = express.Router()
const middleware = require("../middleware")

router.get("/image/:imageId", (req, res) => {
    const imageId = req.params.imageId
    if (!fs.existsSync("../images/" + req.params.imageId)) {
        return res.status(404)
    }
    const readStream = fs.createReadStream(`images/${imageId}`)
    readStream.pipe(res)
})

router.post("/image", upload.single("image"), middleware.verifyToken, (req, res) => {
    res.send({
      imageUrl: req.file.path
    })
})

router.delete("/image/:imageId", middleware.verifyToken, (req, res) => {
    console.log("images/" + req.params.imageId)
    if (!fs.existsSync("images/" + req.params.imageId)) {
        return res.status(404).send({"message": "Image not found."})
    }
    fs.unlinkSync("images/" + req.params.imageId)
    res.send({message: "success"})
})

module.exports = router