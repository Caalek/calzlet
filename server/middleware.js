const jwt = require("jsonwebtoken")

function verifyToken(req, res, next) {
    let token = req.headers['authorization']
    if (!token) {
      return res.status(401).send({message: "Token ivalid or expired."})
    }
    token = token.replace('Bearer ', '')

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        console.error(error)
        return res.status(401).send({message: "Token invalid or expired."})
      }
      req._id = decoded.user.userId
      next()
    })
  }

module.exports = {
  verifyToken: verifyToken
}
  