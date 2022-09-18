require("dotenv").config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const path = require('path')

const cors = require('cors')
app.use(cors())

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(express.static(path.join(__dirname, '../client/build')))

const port = 5000

app.use('/api', require('./routes/sets'))

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.get("/test", (req, res) => {
  res.send('Hello, World!')
})

app.listen(port, () => {
  console.log('server running')
})