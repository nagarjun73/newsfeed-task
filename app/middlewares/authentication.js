const User = require('../model/userModel')
const jwt = require('jsonwebtoken')


const authentication = async (req, res, next) => {
  const token = req.header('Authorization')
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user
    next()
  } catch (e) {
    res.status(400).json(e)
  }
}

module.exports = authentication
