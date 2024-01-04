const { validationResult } = require('express-validator')
const _ = require('lodash')
const bcryptjs = require('bcryptjs')
const User = require('../model/userModel')

const userCltr = {}

userCltr.register = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  //sanitizing input data using loadash
  const body = _.pick(req.body, ["name", "email", "password"])
  try {
    //check if email alredy present in database
    const foundEmail = await User.findOne({ email: body.email })

    if (foundEmail) {//if email found
      res.status(400).json({ errors: [{ msg: "Email already present." }] })
    } else {
      // if email doesnot found register account
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
    }
  } catch (e) {
    res.status(400).json(e)
  }
}

module.exports = userCltr