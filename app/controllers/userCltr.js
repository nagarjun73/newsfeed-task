const { validationResult } = require('express-validator')
const _ = require('lodash')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../model/userModel')
const secret = process.env.JWT_SECRET || "Secret@123"

const userCltr = {}

userCltr.register = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  //sanitizing input data using loadash
  const body = _.pick(req.body, ["name", "email", "password"])
  try {
    const user = new User()
    user.name = body.name
    user.email = body.email

    //generate salf
    const salt = await bcryptjs.genSalt()

    //using salt generate hashPassword
    const hashPassword = await bcryptjs.hash(body.password, salt)

    //addidng hash password to User object
    user.password = hashPassword

    const savedUser = await user.save()
    res.json({ msg: `Registered Successfully. ${savedUser.name}` });
  } catch (e) {
    res.status(400).json(e)
  }
}

userCltr.login = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  //sanitizing input data using loadash
  const body = _.pick(req.body, ["email", "password"])
  try {
    //find user for password checking
    const foundUser = await User.findOne({ email: body.email })
    if (foundUser) {
      //comparing both password
      const passwordVerified = await bcryptjs.compare(body.password, foundUser.password)
      if (!passwordVerified) {
        res.status(404).json({ errors: [{ msg: "Invalid password." }] })
      } else {
        //if password correct generating token
        const token = jwt.sign({ id: foundUser._id }, secret, { expiresIn: '7d' })
        //sending to frontend for Authentication
        res.json({ token: token })
      }
    }
  } catch (e) {
    res.status(400).json(e)
  }
}

userCltr.account = async (req, res) => {
  try {
    const id = req.user.id
    //find user by ID
    const findUser = await User.findOne({ _id: id })
    res.json({ name: findUser.name, email: findUser.email })
  } catch (e) {
    res.status(400).json(e)
  }
}

module.exports = userCltr