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
  custom: {
    options: async (value, { req, res }) => {
      //check if email alredy present in database
      const foundEmail = await User.findOne({ email: value })

      if (foundEmail) {//if email found
        throw new Error("Email already present.")
      }
    }
  }
}


const loginEmailSchema = {
  isEmail: {
    errorMessage: "Email is Invalid"
  },
  custom: {
    options: async (value, { req, res }) => {
      //check if email alredy present in database
      const foundEmail = await User.findOne({ email: value })

      if (!foundEmail) {//if email not found
        throw new Error("Account not found. Try with valid Email")
      }
    }
  }
}

const passwordSchema = {
  isStrongPassword: {
    options: { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 },
    errorMessage: "Password must include at least one uppercase, one lowercase, one number, and one symbol."
  }
}

const userRegValidationSchema = {
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema
}

const userLoginValidationSchema = {
  email: loginEmailSchema,
  password: passwordSchema
}

module.exports = { userRegValidationSchema, userLoginValidationSchema }