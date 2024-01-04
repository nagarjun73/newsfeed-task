const { validationResult } = require('express-validator')
const _ = require('lodash')

const User = require('../model/userModel')

const userCltr = {}

userCltr.register = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const body = _.pick(req.body, ["name", "email", "password"])
  try {
    //check if user alredy present in database
    const foundUser = await User.findOne({ email: body.email })
    console.log(foundUser);
    res.json(body);
  } catch (e) {
    res.json(e)
  }
}

module.exports = userCltr