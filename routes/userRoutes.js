const express = require('express')
const { checkSchema } = require('express-validator')

const userCltr = require('../app/controllers/userCltr')

const authentication = require('../app/middlewares/authentication')
const { userRegValidationSchema, userLoginValidationSchema } = require('../app/helpers/userValidation')

const router = express.Router()

//Register User
router.post('/register', checkSchema(userRegValidationSchema), userCltr.register)

//Login User
router.post('/login', checkSchema(userLoginValidationSchema), userCltr.login)

//get account
router.get('/account', authentication, userCltr.account)

module.exports = router