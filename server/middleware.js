const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
    let token = req.headers['authorization']
    if (!token) {
      return res.status(401).send({message: "Token ivalid or expired."})
    }
    token = token.replace('Bearer ', '')

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).send({message: "Token invalid or expired."})
      }
      req._id = decoded.id
      next()
    })
  }

module.exports = {
  verifyToken: verifyToken
}
  