const express = require('express')
const { checkSchema } = require('express-validator')

const userCltr = require('../app/controllers/userCltr')

const { userRegValidationSchema } = require('../app/helpers/userValidation')

const router = express.Router()

//Register User
router.get('/register', checkSchema(userRegValidationSchema), userCltr.register)

module.exports = router