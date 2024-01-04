const User = require('../model/userModel')

const nameSchema = {
  notEmpty: {
    errorMessage: "Name should not be Empty",
    bail: true
  },
  isLength: {
    options: { max: 50 },
    errorMessage: "The name must be limited to a maximum of 50 characters."
  }
}

const emailSchema = {
  isEmail: {
    errorMessage: "Email is Invalid"
  },
}

const passwordSchema = {
  isStrongPassword: {
    options: { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 },
    errorMessage: "Password must include at least one uppercase, one lowercase, one number, and one symbol."
  }
}

const loginEmailSchema = {}

const loginPasswordSchema = {}

const userRegValidationSchema = {
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema
}

const userLoginValidationSchema = {
  email: loginEmailSchema,
  password: loginPasswordSchema
}

module.exports = { userRegValidationSchema, userLoginValidationSchema }