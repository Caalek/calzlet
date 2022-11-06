const jwt = require("jsonwebtoken")

function verifyToken(req, res, next) {
    let token = req.headers['authorization']
    console.log(token)
    if (!token) {
      return res.sendStatus(401).send({message: "Token ivalid or expired."})
    }
    token = token.replace('Bearer ', '')

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        console.log(error)
        return res.sendStatus(401).send({message: "Token invalid or expired."})
      }
      console.log(decoded.user.userId)
      req._id = decoded.user.userId
      next()
    })
  }

module.exports = {
  verifyToken: verifyToken
}
  