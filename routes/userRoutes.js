const express = require('express')
const { checkSchema } = require('express-validator')

const userCltr = require('../app/controllers/userCltr')

const {
  userRegValidationSchema,
  userLoginValidationSchema } = require('../app/helpers/userValidation')

const router = express.Router()

//Register User
router.post('/register', checkSchema(userRegValidationSchema), userCltr.register)

//Login User
router.post('/login', checkSchema(userLoginValidationSchema), userCltr.login)

module.exports = router